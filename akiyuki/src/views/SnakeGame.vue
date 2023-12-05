<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">Snake Game</p>
    <template v-if="play">
      <div
        class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm bg-dark q-gutter-y-md"
      >
        <GameDisplayNormal @on-gameover="onGameover" :nenemy="nenemy" />
        <q-btn color="white" class="text-black" @click="play = false"
          >Quit game</q-btn
        >
      </div>
    </template>
    <template v-else>
      <div class="row q-gutter-x-md">
        <q-btn color="white" class="text-black" @click="play = true"
          >Start</q-btn
        >
        <q-input
          dark
          v-model.number="nenemy"
          v-on:update:model-value="clipNEnemy"
          label="Number of enemy"
          type="number"
          filled
          style="max-width: 200px"
        />
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
    <q-card>
      <q-card-section>
        <div class="text-h6">GAME OVER</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        You collided with a wall, so please close the game and restart it.
      </q-card-section>
      <q-card-section class="q-pt-none">
        Your score is {{ score }}.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="black" label="Exit" @click="play = false" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import GameDisplayNormal from "../components/snake/GameDisplayNormal.vue";

export default {
  name: "SnakeGame",
  components: {
    GameDisplayNormal,
  },
  data() {
    return {
      play: false,
      gameover: false,
      prompt: false,

      nenemy: 1,

      score: 0,
      username: "",
    };
  },
  mounted() {},
  methods: {
    onGameover(score) {
      this.score = score;
      this.gameover = true;
    },
    clipNEnemy() {
      const MAX_N_ENEMY = 3
      const MIN_N_ENEMY = 1
      if (this.nenemy > MAX_N_ENEMY) {
        this.nenemy = MAX_N_ENEMY
      } else if (this.nenemy < MIN_N_ENEMY) {
        this.nenemy = MIN_N_ENEMY
      }
    }
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
