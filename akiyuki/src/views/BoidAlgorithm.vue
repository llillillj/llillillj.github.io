<template>
  <q-page class="flex flex-center column">
    <div class="q-mb-lg" :class="[
      $q.screen.xs ? 'text-h4 q-mt-md' :
      $q.screen.sm ? 'text-h3' :
      'text-h2'
    ]">
      <span>Boid Algorithm</span>
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
    <div class="bg-dark q-mt-md rounded-borders">
      <div class="q-gutter-md q-ma-md">
        <div class="col">
          <q-toggle v-model="useMouseBird"
            label-color="grey-8"
            label-text-color="white"
            label="追従鳥の利用："
            :left-label="true" />
        </div>
        <div class="row items-center">
          <span class="q-mr-md">x: {{ mouseBird.x.toFixed(2) }}</span>
          <span class="q-mr-md">y: {{ mouseBird.y.toFixed(2) }}</span>
          <span class="q-mr-md">vx: {{ mouseBird.vx.toFixed(2) }}</span>
          <span class="q-mr-md">vy: {{ mouseBird.vy.toFixed(2) }}</span>
        </div>
      </div>
    </div>
    <div class="column bg-dark rounded-borders q-pt-none q-pb-md q-pl-md q-pr-md q-mx-lg q-gutter-md q-mt-md">
      <div class="col">表示設定</div>
      <div class="row col">
        <div v-for="(setting, key) in displaySettings" :key="key" class="row items-center">
          <q-toggle v-model="displaySettings[key].value" label-color="grey-8" label-text-color="white" />
          <span class="q-mr-md">{{ displaySettings[key].label }}</span>
        </div>
      </div>
    </div>

    <div class="column bg-dark rounded-borders q-pt-md q-pb-lg q-pl-lg q-pr-lg q-mt-md q-mx-lg">
      <div class="col">パラメータ設定</div>
      <div class="row col items-center q-gutter-xl">
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
    </div>

    <div class="q-mt-lg q-pa-xl q-gutter-y-md">
      <p class="text-h3 text-center"
        :class="[
          $q.screen.xs ? 'text-h4' :
          $q.screen.sm ? 'text-h3' :
          'text-h2'
        ]">
        Boid Algorithmとは
      </p>
      <div class="text-body1 text-center">
        このBoidアルゴリズムは，鳥の群れの挙動をシミュレートします．各鳥（Boid）は以下の3つのルールに従って行動します．
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


// Boidコンポーネント
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import {
  boidParams,
  limitVector,
  calculateSeparation,
  calculateAlignment,
  calculateCohesion,
  initializeBirds,
  updateMouseBird,
} from '@/module/boid';

const canvas = ref(null);
let width = Math.min(800, window.innerWidth * 0.9);
let height = Math.min(600, window.innerHeight * 0.6);
const birds = ref([]);
let animationId = null;
const useMouseBird = ref(false);

const mousePosition = ref({ x: width / 2, y: height / 2 });

// ユーザのマウスに追従する鳥
const mouseBird = ref({
  x: width / 2,
  y: height / 2,
  vx: 0,
  vy: 0,
  angle: 0,
});

const handleMouseMove = (event) => {
  const rect = canvas.value.getBoundingClientRect();
  mousePosition.value.x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
  mousePosition.value.y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
};

const handleTouchMove = (event) => {
  event.preventDefault(); // スクロール防止
  if (event.touches.length > 0) {
    const rect = canvas.value.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;

    // キャンバス内に制限
    mousePosition.value.x = Math.max(0, Math.min(touchX, rect.width));
    mousePosition.value.y = Math.max(0, Math.min(touchY, rect.height));
  }
};

const displaySettings = ref({
  body: { label: '鳥の体', value: true },
  fieldOfView: { label: '視野角', value: true },
  separationRadius: { label: '分離半径', value: true },
  alignmentRadius: { label: '整列半径', value: true },
  cohesionRadius: { label: '結合半径', value: true },
});

// 個体数の初期値とref
const numberOfBirds = ref(20);

// スライダーの設定を配列で管理
const sliders = ref([
  {
    label: '分離半径',
    value: 20,
    min: 10,
    max: 100,
    step: 1,
    key: 'separationDistance',
  },
  {
    label: '整列半径',
    value: 50,
    min: 10,
    max: 200,
    step: 1,
    key: 'alignmentDistance',
  },
  {
    label: '結合半径',
    value: 100,
    min: 10,
    max: 300,
    step: 1,
    key: 'cohesionDistance',
  },
  {
    label: '分離重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'separationWeight',
  },
  {
    label: '整列重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'alignmentWeight',
  },
  {
    label: '結合重み',
    value: 1.0,
    min: 0,
    max: 5,
    step: 0.1,
    key: 'cohesionWeight',
  },
  {
    label: '最大速度',
    value: 2.0,
    min: 1.5,
    max: 5,
    step: 0.1,
    key: 'maxSpeed',
  },
  {
    label: '視野角',
    value: 90,
    min: 0,
    max: 360,
    step: 1,
    key: 'fieldOfView',
  },
]);

// スライダーの値を更新するウォッチャー
watch(
  sliders,
  (newVal) => {
    newVal.forEach((slider) => {
      boidParams.value[slider.key] = slider.value;
    });
  },
  { deep: true }
);

// メインの更新処理
const updateBirds = () => {
  birds.value.forEach((bird) => {
    // const neighbors = birds.value.filter(other => other !== bird)
    const neighbors = [...birds.value, mouseBird.value].filter(
      (other) => other !== bird
    );

    const separation = calculateSeparation(bird, neighbors);
    const alignment = calculateAlignment(bird, neighbors);
    const cohesion = calculateCohesion(bird, neighbors);

    bird.vx += separation.x + alignment.x + cohesion.x;
    bird.vy += separation.y + alignment.y + cohesion.y;

    const limitedVelocity = limitVector(
      bird.vx,
      bird.vy,
      boidParams.value.maxSpeed
    );
    bird.vx = limitedVelocity.x;
    bird.vy = limitedVelocity.y;

    bird.x += bird.vx / 2;
    bird.y += bird.vy / 2;

    // 鳥の角度を更新
    bird.angle = Math.atan2(bird.vy, bird.vx);

    bird.x = (bird.x + width) % width;
    bird.y = (bird.y + height) % height;
  });
  if (useMouseBird.value) {
    updateMouseBird(mouseBird.value, mousePosition.value); // モジュール化された関数を使用
  }
};

const drawMouseBird = () => {
  const ctx = canvas.value.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(mouseBird.value.x, mouseBird.value.y, 10, 0, 2 * Math.PI);
  ctx.fill();
};

// 鳥の描画
const drawBird = (bird) => {
  const ctx = canvas.value.getContext('2d');
  const size = 10;

  // 鳥の体を描画
  if (displaySettings.value.body.value) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(
      bird.x + Math.cos(bird.angle) * size,
      bird.y + Math.sin(bird.angle) * size
    );
    ctx.lineTo(
      bird.x + Math.cos(bird.angle + (Math.PI * 2.5) / 3) * size,
      bird.y + Math.sin(bird.angle + (Math.PI * 2.5) / 3) * size
    );
    ctx.lineTo(
      bird.x + Math.cos(bird.angle - (Math.PI * 2.5) / 3) * size,
      bird.y + Math.sin(bird.angle - (Math.PI * 2.5) / 3) * size
    );
    ctx.closePath();
    ctx.fill();
  }

  // 視野角を描画
  if (displaySettings.value.fieldOfView.value) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(bird.x, bird.y);
    ctx.arc(
      bird.x,
      bird.y,
      size * 3,
      bird.angle - (boidParams.value.fieldOfView / 2) * (Math.PI / 180),
      bird.angle + (boidParams.value.fieldOfView / 2) * (Math.PI / 180)
    );
    ctx.closePath();
    ctx.stroke();
  }

  // 分離半径を描画
  if (displaySettings.value.separationRadius.value) {
    ctx.strokeStyle = 'rgba(255, 100, 100, 0.2)';
    ctx.beginPath();
    ctx.arc(
      bird.x,
      bird.y,
      boidParams.value.separationDistance,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
  // 整列半径を描画
  if (displaySettings.value.alignmentRadius.value) {
    ctx.strokeStyle = 'rgba(100, 255, 100, 0.2)';
    ctx.beginPath();
    ctx.arc(
      bird.x,
      bird.y,
      boidParams.value.alignmentDistance,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
  // 結合半径を描画
  if (displaySettings.value.cohesionRadius.value) {
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(
      bird.x,
      bird.y,
      boidParams.value.cohesionDistance,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
};

// 群れの描画
const drawBirds = () => {
  const ctx = canvas.value.getContext('2d');

  // キャンバスを毎回クリア
  ctx.clearRect(0, 0, width, height);

  // 鳥を描画
  birds.value.forEach((bird) => {
    drawBird(bird); // 鳥ごとに描画
  });
  if (useMouseBird.value) {
    drawMouseBird();
  }
};

// アニメーション
const animate = () => {
  updateBirds();
  drawBirds();
  animationId = requestAnimationFrame(animate);
};

// アニメーションの開始と停止
const startAnimation = () => {
  if (!animationId) {
    animate();
  }
};

const stopAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
};

const handleResize = () => {
  width = Math.min(800, window.innerWidth * 0.9);
  height = Math.min(600, window.innerHeight * 0.6);
};

// 個体数が変更されたときに鳥を再初期化するウォッチャー
watch(numberOfBirds, () => {
  birds.value = initializeBirds(numberOfBirds.value, width, height); // モジュール化された関数を使用
});

// ライフサイクルメソッド
onMounted(() => {
  birds.value = initializeBirds(numberOfBirds.value, width, height); // モジュール化された関数を使用
  startAnimation();
  canvas.value.addEventListener('mousemove', handleMouseMove);
  canvas.value.addEventListener('touchmove', handleTouchMove, {
    passive: false,
  });
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  stopAnimation();
  canvas.value.removeEventListener('mousemove', handleMouseMove);
  canvas.value.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('resize', handleResize);
});
</script>

