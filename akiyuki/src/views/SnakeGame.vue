<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">Snake Game</p>
    <template v-if="play">
      <div
        class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm bg-dark q-gutter-y-md"
      >
        <GameDisplay @on-gameover="onGameover" />
        <q-btn color="white" class="text-black" @click="play = false"
          >Quit game</q-btn
        >
      </div>
    </template>
    <template v-else>
      <q-btn color="white" class="text-black" @click="play = true">Start</q-btn>
      <p class="q-mt-md">
        This game is called snake game. You can control the snkae with your
        direction keys.
      </p>
      <p>The snake will graw on getting light green items.</p>
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

      <q-card-actions align="right">
        <q-btn flat label="EXIT" class="text-white bg-black" @click="play = false" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import GameDisplay from "../components/snake/GameDisplay.vue";

export default {
  name: "SnakeGame",
  components: {
    GameDisplay,
  },
  emits: ["is-gameover"],
  data() {
    return {
      play: false,
      gameover: false,
    };
  },
  mounted() {},
  methods: {
    onGameover() {
      this.gameover = true
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
