<template>
  <q-page class="flex flex-center column">
    <div class="q-mb-lg">
      <span class="text-h3">Boids Algorithm</span>
    </div>
    <div>
      <div class="border" :style="{ width: `${width+25}px`, height: `${height+25}px` }">
        <canvas class="q-ma-sm" ref="canvas" :width="width" :height="height"></canvas>
      </div>
    </div>
    <div class="q-gutter-md q-mt-md">
      <q-btn outline @click="startAnimation">アニメーション開始</q-btn>
      <q-btn outline @click="stopAnimation">アニメーション停止</q-btn>
    </div>
    <div class="q-gutter-md q-mt-md row bg-dark rounded-borders q-pt-sm q-pb-xl q-pl-md q-pr-md">
      <div class="row items-center">
        <span class="q-mr-md">個体数</span>
        <q-slider
          v-model="numberOfBirds"
          label-always
          label-color="grey-8"
          label-text-color="white"
          switch-marker-labels-side
          switch-label-side
          markers
          :min="10"
          :max="100"
          :step="1"
        />
      </div>
      <div v-for="(slider, index) in sliders" :key="index" class="row items-center">
        <span class="q-mr-md">{{ slider.label }}</span>
        <q-slider
          v-model="slider.value"
          label-always
          label-color="grey-8"
          label-text-color="white"
          switch-marker-labels-side
          switch-label-side
          markers
          :min="slider.min"
          :max="slider.max"
          :step="slider.step"
        />
      </div>
    </div>

    <div class="q-mt-lg q-pa-xl q-gutter-y-md">
      <p class="text-h3 text-center">
        Boids Algorithmとは
      </p>
      <div class="text-body1 text-center">
        このBoidsアルゴリズムは，鳥の群れの挙動をシミュレートします．各鳥（Boid）は以下の3つのルールに従って行動します．
      </div>
      <div class="row justify-center q-gutter-lg q-mt-md q-mb-xl">
        <div class="bg-grey-2 q-pa-md rounded-borders text-black"
            :class="[
          $q.screen.xs ? 'col-9' :
          $q.screen.sm ? 'col-5' :
          'col-3'
        ]">
             <p class="text-subtitle1 text-center">
               <strong>分離 (Separation)</strong>
             </p>
             <p class="text-body1 text-center">
               近くの他の鳥との半径が一定以下にならないように，衝突を避けるように方向を変えます．
             </p>
           </div>
           <div class="bg-grey-2 q-pa-md rounded-borders text-black"
                :class="[
          $q.screen.xs ? 'col-9' :
          $q.screen.sm ? 'col-5' :
          'col-3'
        ]">
             <p class="text-subtitle1 text-center">
               <strong>整列 (Alignment)</strong>
             </p>
             <p class="text-body1 text-center">
               近くの他の鳥の平均的な速度と方向へ向かうように方向を変えます．
             </p>
           </div>
           <div class="bg-grey-2 q-pa-md rounded-borders text-black"
                :class="[
          $q.screen.xs ? 'col-9' :
          $q.screen.sm ? 'col-5' :
          'col-3'
        ]">
          <p class="text-subtitle1 text-center">
            <strong>結合 (Cohesion)</strong>
          </p>
          <p class="text-body1 text-center">
            近くの他の鳥の平均位置へ向かうように方向を変えます．
          </p>
        </div>
      </div>
      <div class="text-body1 text-center">
        これらのルールを各鳥に適用することで，群れ全体としてまとまりのある，自然な動きが生まれます．各ルールの影響度や，近傍とみなす半径は，スライダーで調整可能です．
      </div>
      <div class="text-body1 text-center">
        この実装では，画面の端に達した鳥は反対側から出現するようにしています．
      </div>
    </div>
  </q-page>
</template>


<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const canvas = ref(null)
const width = 800
const height = 600
const birds = ref([])
let animationId = null

// 個体数の初期値とref
const numberOfBirds = ref(20)

// スライダーの設定を配列で管理
const sliders = ref([
  {
    label: '分離半径',
    value: 50,
    min: 10,
    max: 100,
    step: 1,
    key: 'separationDistance'
  },
  {
    label: '整列半径',
    value: 100,
    min: 10,
    max: 200,
    step: 1,
    key: 'alignmentDistance'
  },
  {
    label: '結合半径',
    value: 150,
    min: 10,
    max: 300,
    step: 1,
    key: 'cohesionDistance'
  },
  {
    label: '分離重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'separationWeight'
  },
  {
    label: '整列重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'alignmentWeight'
  },
  {
    label: '結合重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'cohesionWeight'
  },
  {
    label: '最大速度',
    value: 1.0,
    min: 0.1,
    max: 5,
    step: 0.1,
    key: 'maxSpeed'
  }
])

// スライダーの値を保持するオブジェクト
const sliderValues = ref({
  separationWeight: 1.5,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
  separationDistance: 20,
  alignmentDistance: 50,
  cohesionDistance: 100,
  maxSpeed: 0.5
})

// スライダーの値を更新するウォッチャー
watch(sliders, (newVal) => {
  newVal.forEach((slider) => {
    sliderValues.value[slider.key] = slider.value
  })
}, { deep: true })

// 鳥の初期化
const initializeBirds = () => {
  birds.value = [] // 初期化時に既存の鳥をクリア
  for (let i = 0; i < numberOfBirds.value; i++) {
    birds.value.push({
      x: Math.random() * (width - 10) + 5,
      y: Math.random() * (height - 10) + 5,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      ax: 0,
      ay: 0
    })
  }
}

// 半径と角度を計算
const calculateDistanceAndAngle = (bird, other) => {
  let diffX = bird.x - other.x
  if (Math.abs(diffX) > width / 2) {
    diffX = width - Math.abs(diffX)
    if (bird.x < other.x) {
      diffX = -diffX
    }
  }

  let diffY = bird.y - other.y
  if (Math.abs(diffY) > height / 2) {
    diffY = height - Math.abs(diffY)
    if (bird.y < other.y) {
      diffY = -diffY
    }
  }

  const distance = Math.sqrt(diffX ** 2 + diffY ** 2)
  const birdAngle = Math.atan2(bird.vy, bird.vx)
  const otherAngle = Math.atan2(diffY, diffX)
  const angleDifference = Math.abs(birdAngle - otherAngle) * (180 / Math.PI)

  return { diffX, diffY, distance, angleDifference }
}

// 最大加速度と最大速度変更量
const MAX_ACCELERATION = 0.05;  // 加速度の最大値
const MAX_VELOCITY_CHANGE = 0.005;  // 速度ベクトルの最大変更量

// 速度と位置の更新
const updateVelocity = (bird) => {
  // 速度更新（加速度を加える）
  const newVx = bird.vx + bird.ax;
  const newVy = bird.vy + bird.ay;

  // 速度ベクトルの変化量が大きすぎないように制限
  const speedChange = Math.sqrt((newVx - bird.vx) ** 2 + (newVy - bird.vy) ** 2);
  if (speedChange > MAX_VELOCITY_CHANGE) {
    const angle = Math.atan2(newVy - bird.vy, newVx - bird.vx);
    bird.vx = bird.vx + Math.cos(angle) * MAX_VELOCITY_CHANGE;
    bird.vy = bird.vy + Math.sin(angle) * MAX_VELOCITY_CHANGE;
  } else {
    bird.vx = newVx;
    bird.vy = newVy;
  }

  // 速度の正規化（最大速度を超えないようにする）
  const speed = Math.sqrt(bird.vx ** 2 + bird.vy ** 2);
  if (speed > sliderValues.value.maxSpeed) {
    bird.vx = bird.vx / speed * sliderValues.value.maxSpeed;
    bird.vy = bird.vy / speed * sliderValues.value.maxSpeed;
  }

  // 位置の更新
  bird.x += bird.vx;
  bird.y += bird.vy;

  // 加速度のリセット
  bird.ax = 0;
  bird.ay = 0;
}

// 鳥同士の分離力計算時に加速度に制限をかける
const applyForce = (bird, ax, ay) => {
  // 加速度が急激に変化しないように制限
  const accelerationMagnitude = Math.sqrt(ax ** 2 + ay ** 2);
  if (accelerationMagnitude > MAX_ACCELERATION) {
    ax = (ax / accelerationMagnitude) * MAX_ACCELERATION;
    ay = (ay / accelerationMagnitude) * MAX_ACCELERATION;
  }
  bird.ax += ax;
  bird.ay += ay;
}

// 鳥同士の分離力を計算
const applySeparationForce = (bird, other, separationX, separationY, separationCount) => {
  const { diffX, diffY, distance, angleDifference } = calculateDistanceAndAngle(bird, other)

  if (distance < sliderValues.value.separationDistance && angleDifference < 90 / 2) {
    separationX += diffX / distance
    separationY += diffY / distance
    separationCount++
  }

  // 加速度の制限を適用するためにapplyForceを呼び出し
  if (separationCount > 0) {
    separationX /= separationCount
    separationY /= separationCount
    applyForce(bird, separationX * sliderValues.value.separationWeight, separationY * sliderValues.value.separationWeight)
  }

  return { separationX, separationY, separationCount }
}

// 鳥同士の整列力を計算
const applyAlignmentForce = (bird, other, alignmentX, alignmentY, alignmentCount) => {
  const { distance, angleDifference } = calculateDistanceAndAngle(bird, other)

  if (distance < sliderValues.value.alignmentDistance && angleDifference < 90 / 2) {
    alignmentX += other.vx
    alignmentY += other.vy
    alignmentCount++
  }

  // 加速度の制限を適用するためにapplyForceを呼び出し
  if (alignmentCount > 0) {
    alignmentX /= alignmentCount
    alignmentY /= alignmentCount
    applyForce(bird, (alignmentX - bird.vx) * sliderValues.value.alignmentWeight / 8, (alignmentY - bird.vy) * sliderValues.value.alignmentWeight / 8)
  }

  return { alignmentX, alignmentY, alignmentCount }
}

// 鳥同士の結合力を計算
const applyCohesionForce = (bird, other, cohesionX, cohesionY, cohesionCount) => {
  const { distance, angleDifference } = calculateDistanceAndAngle(bird, other)

  if (distance < sliderValues.value.cohesionDistance && angleDifference < 90 / 2) {
    cohesionX += other.x
    cohesionY += other.y
    cohesionCount++
  }

  // 加速度の制限を適用するためにapplyForceを呼び出し
  if (cohesionCount > 0) {
    cohesionX /= cohesionCount
    cohesionY /= cohesionCount
    let diffX = cohesionX - bird.x
    if (Math.abs(diffX) > width / 2) {
      diffX = width - Math.abs(diffX)
      if (bird.x < cohesionX) {
        diffX = -diffX
      }
    }

    let diffY = cohesionY - bird.y
    if (Math.abs(diffY) > height / 2) {
      diffY = height - Math.abs(diffY)
      if (bird.y < cohesionY) {
        diffY = -diffY
      }
    }

    applyForce(bird, diffX * sliderValues.value.cohesionWeight / 100, diffY * sliderValues.value.cohesionWeight / 100)
  }

  return { cohesionX, cohesionY, cohesionCount }
}

// メインの更新処理で角度の変更を滑らかにするために線形補完を加えます。
const updateBirds = () => {
  birds.value.forEach(bird => {
    let separationX = 0, separationY = 0, separationCount = 0;
    let alignmentX = 0, alignmentY = 0, alignmentCount = 0;
    let cohesionX = 0, cohesionY = 0, cohesionCount = 0;

    birds.value.forEach(other => {
      if (other !== bird) {
        // 分離力
        const separationResult = applySeparationForce(bird, other, separationX, separationY, separationCount);
        separationX = separationResult.separationX;
        separationY = separationResult.separationY;
        separationCount = separationResult.separationCount;

        // 整列力
        const alignmentResult = applyAlignmentForce(bird, other, alignmentX, alignmentY, alignmentCount);
        alignmentX = alignmentResult.alignmentX;
        alignmentY = alignmentResult.alignmentY;
        alignmentCount = alignmentResult.alignmentCount;

        // 結合力
        const cohesionResult = applyCohesionForce(bird, other, cohesionX, cohesionY, cohesionCount);
        cohesionX = cohesionResult.cohesionX;
        cohesionY = cohesionResult.cohesionY;
        cohesionCount = cohesionResult.cohesionCount;
      }
    });

    // 分離力適用
    if (separationCount > 0) {
      separationX /= separationCount;
      separationY /= separationCount;
      bird.ax += separationX * sliderValues.value.separationWeight;
      bird.ay += separationY * sliderValues.value.separationWeight;
    }

    // 整列力適用
    if (alignmentCount > 0) {
      alignmentX /= alignmentCount;
      alignmentY /= alignmentCount;
      bird.ax += (alignmentX - bird.vx) * sliderValues.value.alignmentWeight / 8;
      bird.ay += (alignmentY - bird.vy) * sliderValues.value.alignmentWeight / 8;
    }

    // 結合力適用
    if (cohesionCount > 0) {
      cohesionX /= cohesionCount;
      cohesionY /= cohesionCount;
      let diffX = cohesionX - bird.x;
      if (Math.abs(diffX) > width / 2) {
        diffX = width - Math.abs(diffX);
        if (bird.x < cohesionX) {
          diffX = -diffX;
        }
      }

      let diffY = cohesionY - bird.y;
      if (Math.abs(diffY) > height / 2) {
        diffY = height - Math.abs(diffY);
        if (bird.y < cohesionY) {
          diffY = -diffY;
        }
      }

      bird.ax += diffX * sliderValues.value.cohesionWeight / 100;
      bird.ay += diffY * sliderValues.value.cohesionWeight / 100;
    }

    // 視野内に他の鳥がいないときにでも前進するように加速度を与える
    if (separationCount === 0 && alignmentCount === 0 && cohesionCount === 0) {
      // 一定方向に少し加速度を与える（例えば、右上方向に少し加速）
      const forwardSpeed = 0.02;
      bird.ax += forwardSpeed * Math.cos(Math.PI / 4);
      bird.ay += forwardSpeed * Math.sin(Math.PI / 4);
    }

    // ノイズを加える（ランダムな加速度のノイズ）
    const noiseStrength = 0.005; // ノイズの強さ
    const noiseX = (Math.random() - 0.5) * noiseStrength; // -0.5〜0.5の範囲でランダムな値
    const noiseY = (Math.random() - 0.5) * noiseStrength;

    bird.ax += noiseX; // ランダムなX方向のノイズ
    bird.ay += noiseY; // ランダムなY方向のノイズ

    // 速度と位置の更新
    updateVelocity(bird);

    // エッジ処理
    if (bird.x < 5) {
      bird.x = width - 5;
    } else if (bird.x > width - 5) {
      bird.x = 5;
    }
    if (bird.y < 5) {
      bird.y = height - 5;
    } else if (bird.y > height - 5) {
      bird.y = 5;
    }
  });
}


// 鳥の描画
const drawBird = (bird) => {
  const ctx = canvas.value.getContext('2d'); // コンテキストを取得
  const size = 10; // 鳥の大きさ（調整可能）

  // 進行方向の角度を計算
  const angle = Math.atan2(bird.vy, bird.vx);

  // 鳥の位置に基づいて三角形の頂点を設定
  const x1 = bird.x + Math.cos(angle) * size;
  const y1 = bird.y + Math.sin(angle) * size;
  const x2 = bird.x + Math.cos(angle + Math.PI * 2.5 / 3) * size;
  const y2 = bird.y + Math.sin(angle + Math.PI * 2.5 / 3) * size;
  const x3 = bird.x + Math.cos(angle - Math.PI * 2.5 / 3) * size;
  const y3 = bird.y + Math.sin(angle - Math.PI * 2.5 / 3) * size;

  // 鳥の色を設定
  ctx.fillStyle = 'orange'; // 鳥の色

  // 三角形を描画
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
};

// 群れの描画
const drawBirds = () => {
  const ctx = canvas.value.getContext('2d');

  // キャンバスを毎回クリア
  ctx.clearRect(0, 0, width, height);

  // 鳥を描画
  birds.value.forEach(bird => {
    drawBird(bird); // 鳥ごとに描画
  });
};


// アニメーション
const animate = () => {
  updateBirds()
  drawBirds()
  animationId = requestAnimationFrame(animate)
}

// アニメーションの開始と停止
const startAnimation = () => {
  if (!animationId) {
    animate()
  }
}

const stopAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// 個体数が変更されたときに鳥を再初期化するウォッチャー
watch(numberOfBirds, () => {
  initializeBirds()
})

// ライフサイクルメソッド
onMounted(() => {
  initializeBirds()
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})
</script>