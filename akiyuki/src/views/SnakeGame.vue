<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">Snake Game</p>
    <template v-if="play && mode === 'normal'">
      <div
        class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm bg-dark q-gutter-y-md"
      >
        <GameDisplayNormal @on-gameover="onGameover" :nenemy="nenemy" />
        <q-btn color="white" class="text-black" @click="play = false"
        >Quit game</q-btn
        >
      </div>
    </template>
    <template v-else-if="play && mode === 'duel'">
      <GameDisplayDuel @on-gameover="onGameover" />
    </template>
    <template v-else>
      <div class="row q-gutter-x-md">
        <q-btn color="white" class="text-black" @click="play = true"
          >Start</q-btn
        >
        <q-select
          v-model="mode"
          :options="['normal', 'duel']"
          label="Select game mode"
          dark
          filled
        ></q-select>
        <template v-if="mode==='normal'">
          <q-input
            v-model.number="nenemy"
            v-on:update:model-value="clipNEnemy"
            label="Number of enemy"
            type="number"
            dark
            filled
          />
        </template>
      </div>
      <p class="q-mt-md">
        This game is called snake game. You can control the blue snake with your
        direction keys.
      </p>
      <p>
        The snake will graw on getting light green items, and get gameover on
        touch to red snake or wall.
      </p>
    </template>
  </q-page>

  <q-dialog v-model="gameover">
    <q-card :style="`background-color: ${gameovercolor};`" :class="`text-${loser === null ? 'black' : 'white' }`">
      <q-card-section>
        <template v-if="loser === null">
          <div class="text-h6">GAME OVER</div>
        </template>
        <template v-else>
          <div class="text-h6">Player {{ loser === 0 ? 0 : 1 }} win!!</div>
        </template>
      </q-card-section>

      <template v-if="loser === null">
        <q-card-section class="q-pt-none">
          You collided with a wall, so please close the game and restart it.
        </q-card-section>
        <q-card-section class="q-pt-none">
          Your score is {{ score }}.
        </q-card-section>
      </template>

      <q-card-actions align="right">
        <q-btn color="black" label="Exit" @click="play = false" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import GameDisplayNormal from "../components/snake/GameDisplayNormal.vue";
import GameDisplayDuel from "../components/snake/GameDisplayDuel.vue";

export default {
  name: "SnakeGame",
  components: {
    GameDisplayNormal,
    GameDisplayDuel,
  },
  data() {
    return {
      play: false,
      mode: "normal",
      gameover: false,
      gameovercolor: "white",
      prompt: false,

      nenemy: 1,

      score: 0,
      loser: null,
      username: "",
    };
  },
  mounted() {},
  methods: {
    onGameover(score, loser) {
      this.score = score;
      this.loser = loser
      console.log(this.loser)
      if (this.loser === 0) {
        this.gameovercolor = "#a22"
      } else if (this.loser === 1) {
        this.gameovercolor = "#22a"
      } else {
        this.gameovercolor = "white"
      }
      this.gameover = true;
    },
    clipNEnemy() {
      const MAX_N_ENEMY = 3;
      const MIN_N_ENEMY = 1;
      if (this.nenemy > MAX_N_ENEMY) {
        this.nenemy = MAX_N_ENEMY;
      } else if (this.nenemy < MIN_N_ENEMY) {
        this.nenemy = MIN_N_ENEMY;
      }
    },
  },
};
</script>

<style>
.content {
  background-color: white;
  width: 340px;
  border-radius: 8px;
}

.controller-space {
  width: 160px;
  height: 160px;
}

.controller-button {
  height: 25px;
  border: solid white 1px;
  border-radius: 100%;
}
</style>
