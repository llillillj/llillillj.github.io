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
    <div class="q-gutter-md q-mt-md row">
      <!-- 個体数調整スライダーを追加 -->
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
const numberOfBirds = ref(50)

// スライダーの設定を配列で管理
const sliders = ref([
  {
    label: '分離重み',
    value: 1.5,
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
    label: '分離距離',
    value: 20,
    min: 10,
    max: 100,
    step: 1,
    key: 'separationDistance'
  },
  {
    label: '整列距離',
    value: 50,
    min: 10,
    max: 200,
    step: 1,
    key: 'alignmentDistance'
  },
  {
    label: '結合距離',
    value: 100,
    min: 10,
    max: 300,
    step: 1,
    key: 'cohesionDistance'
  },
  {
    label: '最大速度',
    value: 0.5,
    min: 0.1,
    max: 2,
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

// 鳥の更新
const updateBirds = () => {
  birds.value.forEach(bird => {
    // 分離
    let separationX = 0
    let separationY = 0
    let separationCount = 0
    birds.value.forEach(other => {
      if (other !== bird) {
        // 画面の端を越えた場合の最短距離を計算
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
        if (distance < sliderValues.value.separationDistance) {
          separationX += diffX / distance
          separationY += diffY / distance
          separationCount++
        }
      }
    })
    if (separationCount > 0) {
      separationX /= separationCount
      separationY /= separationCount
      bird.ax += separationX * sliderValues.value.separationWeight
      bird.ay += separationY * sliderValues.value.separationWeight
    }

    // 整列
    let alignmentX = 0
    let alignmentY = 0
    let alignmentCount = 0
    birds.value.forEach(other => {
      if (other !== bird) {
        // 画面の端を越えた場合の最短距離を計算
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
        if (distance < sliderValues.value.alignmentDistance) {
          alignmentX += other.vx
          alignmentY += other.vy
          alignmentCount++
        }
      }
    })
    if (alignmentCount > 0) {
      alignmentX /= alignmentCount
      alignmentY /= alignmentCount
      bird.ax += (alignmentX - bird.vx) * sliderValues.value.alignmentWeight / 8
      bird.ay += (alignmentY - bird.vy) * sliderValues.value.alignmentWeight / 8
    }

    // 結合
    let cohesionX = 0
    let cohesionY = 0
    let cohesionCount = 0
    birds.value.forEach(other => {
      if (other !== bird) {
        // 画面の端を越えた場合の最短距離を計算
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
        if (distance < sliderValues.value.cohesionDistance) {
          cohesionX += other.x
          cohesionY += other.y
          cohesionCount++
        }
      }
    })
    if (cohesionCount > 0) {
      cohesionX /= cohesionCount
      cohesionY /= cohesionCount

      // 画面の端を越えた場合の最短距離を計算
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

      bird.ax += diffX * sliderValues.value.cohesionWeight / 100
      bird.ay += diffY * sliderValues.value.cohesionWeight / 100
    }

    // 速度の更新
    bird.vx += bird.ax
    bird.vy += bird.ay

    // 速度の正規化
    const speed = Math.sqrt(bird.vx ** 2 + bird.vy ** 2)
    if (speed > sliderValues.value.maxSpeed) {
      bird.vx = bird.vx / speed * sliderValues.value.maxSpeed
      bird.vy = bird.vy / speed * sliderValues.value.maxSpeed
    }

    // 位置の更新
    bird.x += bird.vx
    bird.y += bird.vy

    // 加速度のリセット
    bird.ax = 0
    bird.ay = 0

    // エッジ処理
    if (bird.x < 5) {
      bird.x = width - 5
    } else if (bird.x > width - 5) {
      bird.x = 5
    }
    if (bird.y < 5) {
      bird.y = height - 5
    } else if (bird.y > height - 5) {
      bird.y = 5
    }
  })
}

// 鳥の描画
const drawBirds = () => {
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, width, height)

  birds.value.forEach(bird => {
    ctx.beginPath()
    ctx.arc(bird.x, bird.y, 5, 0, Math.PI * 2)
    ctx.fillStyle = 'orange'
    ctx.fill()
  })
}

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
})

onUnmounted(() => {
  stopAnimation()
})
</script>
