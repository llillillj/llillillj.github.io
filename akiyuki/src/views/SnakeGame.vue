<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">Snake Game</p>
    <template v-if="play">
      <div class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm bg-dark q-gutter-y-md">
        <GameDisplay />
        <q-btn color="white" class="text-black" @click="play = false">Quit game</q-btn>
      </div>
    </template>
    <template v-else>
      <q-btn color="white" class="text-black" @click="play = true">Start</q-btn>
      <p class="q-mt-md">This game is called snake game. You can control the snkae with your direction keys.</p>
      <p>The snake will graw on getting light green items.</p>
    </template>
  </q-page>
</template>

<script>
import GameDisplay from "../components/snake/GameDisplay.vue";

export default {
  name: "SnakeGame",
  components: {
    GameDisplay,
  },
  data() {
    return {
      play: false,
    };
  },
  mounted() {},
  methods: {
  },
};
</script>

<style>
.content {
  background-color: white;
  width: 340px;
  border-radius: 8px;
}

.cell {
  width: 14px;
  height: 14px;
  margin: 1px;
  border-radius: 4px;
}

.block {
  background-color: black;
}

.path {
  background-color: grey;
}

.player {
  background-color: #77f;
}
</style>
