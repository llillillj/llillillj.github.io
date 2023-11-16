<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">Snake Game</p>
    <template v-if="play">
      <div class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm bg-dark q-gutter-y-md">
        <GameDisplay @on-gameover="onGameover" />
        <q-btn color="white" class="text-black" @click="play = false">Quit game</q-btn>
      </div>
    </template>
    <template v-else>
      <q-btn color="white" class="text-black" @click="play = true">Start</q-btn>
      <p class="q-mt-md">
        This game is called snake game. You can control the blue snake with your
        direction keys.
      </p>
      <p>
        The snake will graw on getting light green items, and get gameover on
        touch to red snake or wall.
      </p>
      <q-table flat bordered dark hide-bottom class="q-mt-md" :rows="scoreBoard" :columns="columns" />
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
        <q-btn color="black" label="Register" @click="prompt = true; username = '';" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Your name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="username" autofocus @keyup.enter="prompt = false" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="black" label="Cancel" v-close-popup />
        <q-btn color="black" label="Add score" @click="addScore" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import GameDisplay from "../components/snake/GameDisplay.vue";

import { getFirestore, collection, getDocs, query, addDoc, limit, orderBy, serverTimestamp } from "firebase/firestore";

import dayjs from 'dayjs'
import 'dayjs/locale/ja'

dayjs.locale('ja')

const db = getFirestore()
const colRef = collection(db, "/snakge_game")
const q = query(colRef, orderBy("score", "desc"), limit(5));

export default {
  name: "SnakeGame",
  components: {
    GameDisplay,
  },
  emits: ["on-gameover"],
  data() {
    return {
      play: false,
      gameover: false,
      prompt: false,

      score: 0,
      username: "",

      scoreBoard: [
        { rank: 1, username: "user1", score: 19 },
        { rank: 2, username: "user2", score: 18 },
        { rank: 3, username: "user3", score: 17 },
        { rank: 4, username: "user4", score: 16 },
        { rank: 5, username: "user5", score: 15 },
      ],
      columns: [
        {
          name: "rank",
          required: true,
          label: "Rank.",
          align: "center",
          field: (row) => row.rank,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "username",
          align: "left",
          label: "UserName",
          field: "username",
          sortable: false,
        },
        {
          name: "score",
          align: "center",
          label: "Score",
          field: "score",
          sortable: false,
        },
        {
          name: "date",
          align: "right",
          label: "Date",
          field: "date",
          format: (val) => `${dayjs(val).format('YYYY/MM/DD')}`,
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getScoreBoard();
  },
  methods: {
    onGameover(score) {
      this.score = score;
      this.gameover = true;
    },

    async getScoreBoard() {
      var cnt = 1
      this.scoreBoard = []
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const pushItem = {
          rank: cnt,
          username: doc.data().username,
          score: doc.data().score,
          date: doc.data().date.toDate()
        }
        this.scoreBoard.push(pushItem)
        cnt ++
      });
    },

    addScore() {
      addDoc(colRef, { username: this.username, score: this.score, date: serverTimestamp() })
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
