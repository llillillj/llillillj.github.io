<template>
  <q-page class="flex flex-center column">
    <div class="q-mb-lg" :class="[
      $q.screen.xs ? 'text-h4 q-mt-md' :
      $q.screen.sm ? 'text-h3' :
      'text-h2'
    ]">
      <span>Boids Algorithm</span>
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

    <div class="q-gutter-md q-mt-md row bg-dark rounded-borders q-pt-none q-pb-md q-pl-md q-pr-md q-ma-md">
      <div v-for="(setting, key) in displaySettings" :key="key" class="row items-center">
        <q-toggle v-model="displaySettings[key].value" label-color="grey-8" label-text-color="white" />
        <span class="q-mr-md">{{ displaySettings[key].label }}</span>
      </div>
    </div>

    <div class="q-gutter-md q-mt-md row bg-dark rounded-borders q-pt-xs q-pb-xl q-pl-md q-pr-md q-ma-md q-gutter-y-lg">
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
      <p class="text-h3 text-center"
        :class="[
          $q.screen.xs ? 'text-h4' :
          $q.screen.sm ? 'text-h3' :
          'text-h2'
        ]">
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
                  'col-3']">
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
                  'col-3']">
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
let width = window.innerWidth < 600 ? window.innerWidth - 80 : 400
let height = window.innerHeight < 600 ? window.innerHeight * 0.5 : 600
const birds = ref([])
let animationId = null

const displaySettings = ref({
  body: { label: '鳥の体', value: true },
  fieldOfView: { label: '視野角', value: true },
  separationRadius: { label: '分離半径', value: true },
  alignmentRadius: { label: '整列半径', value: true },
  cohesionRadius: { label: '結合半径', value: true }
})

// 個体数の初期値とref
const numberOfBirds = ref(20)

// スライダーの設定を配列で管理
const sliders = ref([
  {
    label: '分離半径',
    value: 20,  // 変更: 50 -> 20
    min: 10,
    max: 100,
    step: 1,
    key: 'separationDistance'
  },
  {
    label: '整列半径',
    value: 50,  // 変更: 100 -> 50
    min: 10,
    max: 200,
    step: 1,
    key: 'alignmentDistance'
  },
  {
    label: '結合半径',
    value: 100,  // 変更: 150 -> 100
    min: 10,
    max: 300,
    step: 1,
    key: 'cohesionDistance'
  },
  {
    label: '分離重み',
    value: 1.5,  // 変更: 1.0 -> 1.5
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
  },
  {
    label: '視野角',
    value: 90,
    min: 0,
    max: 360,
    step: 1,
    key: 'fieldOfView'
  }
])

// スライダーの値を保持するオブジェクト
const sliderValues = ref({
  separationDistance: 20,
  alignmentDistance: 50,
  cohesionDistance: 100,
  separationWeight: 1.5,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
  maxSpeed: 1.0,
  fieldOfView: 90
})


// スライダーの値を更新するウォッチャー
watch(sliders, (newVal) => {
  newVal.forEach((slider) => {
    sliderValues.value[slider.key] = slider.value
  })
}, { deep: true })

// ベクトルの長さを制限する関数
const limitVector = (vx, vy, max) => {
  const magnitude = Math.sqrt(vx * vx + vy * vy)
  if (magnitude > max) {
    const ratio = max / magnitude
    return { x: vx * ratio, y: vy * ratio }
  }
  return { x: vx, y: vy }
}

// 鳥の初期化を修正
const initializeBirds = () => {
  birds.value = []
  for (let i = 0; i < numberOfBirds.value; i++) {
    birds.value.push({
      x: Math.random() * (width - 10) + 5,
      y: Math.random() * (height - 10) + 5,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      angle: Math.random() * 2 * Math.PI // 鳥の向きを追加
    })
  }
}

// 視野角内かどうかをチェックする関数
const isInFieldOfView = (bird, other) => {
  const dx = other.x - bird.x
  const dy = other.y - bird.y
  const angleToOther = Math.atan2(dy, dx)
  const angleDiff = Math.abs(angleToOther - bird.angle)
  return angleDiff <= (sliderValues.value.fieldOfView / 2) * (Math.PI / 180) ||
         angleDiff >= 2 * Math.PI - (sliderValues.value.fieldOfView / 2) * (Math.PI / 180)
}

// 分離力を計算（視野角を考慮）
const calculateSeparation = (bird, neighbors) => {
  let fx = 0, fy = 0, count = 0
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const dx = bird.x - other.x
      const dy = bird.y - other.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance > 0 && distance < sliderValues.value.separationDistance) {
        const force = (sliderValues.value.separationDistance - distance) / distance
        fx += dx * force
        fy += dy * force
        count++
      }
    }
  })
  if (count > 0) {
    fx /= count
    fy /= count
  }
  return { x: fx * sliderValues.value.separationWeight, y: fy * sliderValues.value.separationWeight }
}

// 整列力を計算（視野角を考慮）
const calculateAlignment = (bird, neighbors) => {
  let vx = 0, vy = 0, count = 0
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const distance = Math.sqrt((bird.x - other.x) ** 2 + (bird.y - other.y) ** 2)
      if (distance < sliderValues.value.alignmentDistance) {
        vx += other.vx
        vy += other.vy
        count++
      }
    }
  })
  if (count > 0) {
    vx = (vx / count - bird.vx) * sliderValues.value.alignmentWeight
    vy = (vy / count - bird.vy) * sliderValues.value.alignmentWeight
  }
  return { x: vx, y: vy }
}

// 結合力を計算（視野角を考慮）
const calculateCohesion = (bird, neighbors) => {
  let cx = 0, cy = 0, count = 0
  neighbors.forEach(other => {
    if (isInFieldOfView(bird, other)) {
      const distance = Math.sqrt((bird.x - other.x) ** 2 + (bird.y - other.y) ** 2)
      if (distance < sliderValues.value.cohesionDistance) {
        cx += other.x
        cy += other.y
        count++
      }
    }
  })
  if (count > 0) {
    cx = cx / count - bird.x
    cy = cy / count - bird.y
    const distance = Math.sqrt(cx * cx + cy * cy)
    cx = (cx / distance) * sliderValues.value.cohesionWeight
    cy = (cy / distance) * sliderValues.value.cohesionWeight
  }
  return { x: cx, y: cy }
}

// メインの更新処理
const updateBirds = () => {
  birds.value.forEach(bird => {
    const neighbors = birds.value.filter(other => other !== bird)

    const separation = calculateSeparation(bird, neighbors)
    const alignment = calculateAlignment(bird, neighbors)
    const cohesion = calculateCohesion(bird, neighbors)

    bird.vx += separation.x + alignment.x + cohesion.x
    bird.vy += separation.y + alignment.y + cohesion.y

    const limitedVelocity = limitVector(bird.vx, bird.vy, sliderValues.value.maxSpeed)
    bird.vx = limitedVelocity.x
    bird.vy = limitedVelocity.y

    bird.x += bird.vx
    bird.y += bird.vy

    // 鳥の角度を更新
    bird.angle = Math.atan2(bird.vy, bird.vx)

    bird.x = (bird.x + width) % width
    bird.y = (bird.y + height) % height
  })
}


// 鳥の描画
const drawBird = (bird) => {
  const ctx = canvas.value.getContext('2d')
  const size = 10

  // 鳥の体を描画
  if (displaySettings.value.body.value) {
    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.moveTo(bird.x + Math.cos(bird.angle) * size, bird.y + Math.sin(bird.angle) * size)
    ctx.lineTo(bird.x + Math.cos(bird.angle + Math.PI * 2.5 / 3) * size, bird.y + Math.sin(bird.angle + Math.PI * 2.5 / 3) * size)
    ctx.lineTo(bird.x + Math.cos(bird.angle - Math.PI * 2.5 / 3) * size, bird.y + Math.sin(bird.angle - Math.PI * 2.5 / 3) * size)
    ctx.closePath()
    ctx.fill()
  }

  // 視野角を描画
  if (displaySettings.value.fieldOfView.value) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.beginPath()
    ctx.moveTo(bird.x, bird.y)
    ctx.arc(bird.x, bird.y, size * 3, bird.angle - (sliderValues.value.fieldOfView / 2) * (Math.PI / 180), bird.angle + (sliderValues.value.fieldOfView / 2) * (Math.PI / 180))
    ctx.closePath()
    ctx.stroke()
  }

  // 分離半径を描画
  if (displaySettings.value.separationRadius.value) {
    ctx.strokeStyle = 'rgba(255, 100, 100, 0.2)'
    ctx.beginPath()
    ctx.arc(bird.x, bird.y, sliderValues.value.separationDistance, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // 整列半径を描画
  if (displaySettings.value.alignmentRadius.value) {
    ctx.strokeStyle = 'rgba(100, 255, 100, 0.2)'
    ctx.beginPath()
    ctx.arc(bird.x, bird.y, sliderValues.value.alignmentDistance, 0, 2 * Math.PI)
    ctx.stroke()
  }

  // 結合半径を描画
  if (displaySettings.value.cohesionRadius.value) {
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.2)'
    ctx.beginPath()
    ctx.arc(bird.x, bird.y, sliderValues.value.cohesionDistance, 0, 2 * Math.PI)
    ctx.stroke()
  }
}


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

const handleResize = () => {
    width = window.innerWidth < 600 ? window.innerWidth - 40 : 800;
    height = window.innerHeight < 600 ? window.innerHeight * 0.5 : 600;
  };

// 個体数が変更されたときに鳥を再初期化するウォッチャー
watch(numberOfBirds, () => {
  initializeBirds()
})

// ライフサイクルメソッド
onMounted(() => {
  initializeBirds()
  startAnimation()

  window.addEventListener("resize", handleResize);
})

onUnmounted(() => {
  stopAnimation()
  window.removeEventListener("resize", handleResize);
})
</script>