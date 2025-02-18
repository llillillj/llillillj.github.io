<template>
  <div ref="element" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }">
    子コンポーネント
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineExpose } from 'vue'

const props = defineProps({
  initialPosition: {
    type: Object,
    required: true
  }
})

const element = ref(null)
const position = reactive(props.initialPosition)
const velocity = reactive({ x: 1, y: 1 })
const windowSize = reactive({ width: 300, height: 300 })
let animationId = null

const updatePosition = () => {
  const elementWidth = element.value.offsetWidth
  const elementHeight = element.value.offsetHeight

  // X軸の更新
  position.x += velocity.x
  if (position.x <= 0 || position.x + elementWidth >= windowSize.width) {
    velocity.x *= -1 // 反転
  }

  // Y軸の更新
  position.y += velocity.y
  if (position.y <= 0 || position.y + elementHeight >= windowSize.height) {
    velocity.y *= -1 // 反転
  }

  // 画面外に出ないようにする
  position.x = Math.min(windowSize.width - elementWidth, Math.max(0, position.x))
  position.y = Math.min(windowSize.height - elementHeight, Math.max(0, position.y))

  animationId = requestAnimationFrame(updatePosition)
}

const startAnimation = () => {
  updatePosition()
}

const stopAnimation = () => {
  cancelAnimationFrame(animationId)
}

defineExpose({ startAnimation, stopAnimation })
</script>
