<template>
    <q-page class="flex flex-center">
      <div>
        <BirdComponent ref="BirdComponentRef" />
      </div>
      <button @click="startChildAnimation">アニメーション開始</button>
      <button @click="stopChildAnimation">アニメーション停止</button>
    </q-page>
  </template>

<script>
// import { ref, onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';
import BirdComponent from '@/components/boids/BirdComponent.vue';

  export default {
    components: { BirdComponent },
    methods: {
      startChildAnimation() {
      },
      stopChildAnimation() {
      }
    }
  }
  </script>
