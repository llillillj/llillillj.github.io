<template>
  <q-page class="flex flex-center column q-pa-md">
    <p class="text-h3">スネークゲーム</p>
    <template v-if="play && mode === 'normal'">
      <div
        class="content flex flex-center q-pl-xs q-pr-xs q-py-sm bg-dark q-gutter-y-md"
      >
        <GameDisplayNormal @on-gameover="onGameover" :nenemy="nenemy" />
        <q-btn color="white" class="text-black" @click="play = false"
          >ゲーム終了</q-btn
        >
      </div>
    </template>
    <template v-else-if="play && mode === 'duel'">
      <div class="content q-gutter-y-md flex flex-center bg-dark">
        <GameDisplayDuel @on-gameover="onGameover" />
        <q-btn color="white" class="text-black" @click="play = false"
          >ゲーム終了</q-btn
        >
      </div>
    </template>
    <template v-else>
      <div class="row q-gutter-x-md">
        <q-btn color="white" class="text-black" @click="play = true"
          >開始</q-btn
        >
        <q-select
          v-model="mode"
          :options="['normal', 'duel']"
          label="ゲームモード"
          dark
          filled
        ></q-select>
        <template v-if="mode === 'normal'">
          <q-input
            v-model.number="nenemy"
            v-on:update:model-value="clipNEnemy"
            label="敵の数"
            type="number"
            dark
            filled
          />
        </template>
      </div>
      <!-- game explanation -->
      <template v-if="mode === 'normal'">
        <p class="q-mt-md" style="text-align: center">
          ランダムに動く赤い敵に触れられないように緑色の餌を沢山食べるモード<br />敵の数は[
          Number of enemies]で1~3まで調整可能
        </p>
      </template>
      <template v-else>
        <p class="q-mt-md" style="text-align: center">
          青い蛇を動かすUser0と赤い蛇を動かすUser1がそれぞれの蛇を操作して<br />相手にぶつかったら負けだよ
        </p>
      </template>
      <!-- button explanation -->
      <div id="btn_expl">
        <p class="flex flex-center"><u>操作方法</u></p>
        <div class="row">
          <div id="btn_expl_t" class="btn_expl_sp q-gutter-y-sm">
            <p class="flex flex-center">対応表</p>
            <div class="row justify-around">
              <div class="btn_expl_">上</div>
            </div>
            <div class="row justify-around">
              <div class="btn_expl_">左</div>
              <div class="btn_expl_">下</div>
              <div class="btn_expl_">右</div>
            </div>
          </div>
          <q-separator
            dark
            vertical
            class="q-mx-md"
            style="height: 110px"
          ></q-separator>
          <div id="btn_expl_0" class="btn_expl_sp q-gutter-y-sm">
            <p class="flex flex-center" style="color: #55c">User0</p>
            <div class="row justify-around">
              <div class="btn_expl_">↑</div>
            </div>
            <div class="row justify-around">
              <div class="btn_expl_">←</div>
              <div class="btn_expl_">↓</div>
              <div class="btn_expl_">→</div>
            </div>
          </div>
          <q-separator
            dark
            vertical
            class="q-mx-md"
            style="height: 110px"
            v-if="mode === 'duel'"
          ></q-separator>
          <template v-if="mode === 'duel'">
            <div id="btn_expl_1" class="btn_expl_sp q-gutter-y-sm">
              <p class="flex flex-center" style="color: #c55">User1</p>
              <div class="row justify-around">
                <div class="btn_expl_">W</div>
              </div>
              <div class="row justify-around">
                <div class="btn_expl_">A</div>
                <div class="btn_expl_">S</div>
                <div class="btn_expl_">D</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </q-page>

  <q-dialog v-model="gameover">
    <q-card
      :style="`background-color: ${gameovercolor};`"
      :class="`text-${loser === null ? 'black' : 'white'}`"
    >
      <q-card-section>
        <template v-if="loser === null">
          <div class="text-h6">ゲームオーバー</div>
        </template>
        <template v-else>
          <div class="text-h6">User {{ loser === 0 ? 1 : 0 }} が勝ちました !!</div>
        </template>
      </q-card-section>

      <template v-if="loser === null">
        <q-card-section class="q-pt-none">
          壁か相手に衝突しました！ゲームを終了して再スタートしましょう！
        </q-card-section>
        <q-card-section class="q-pt-none">
          あなたのスコア： {{ score }}.
        </q-card-section>
      </template>

      <q-card-actions align="right">
        <q-btn color="black" label="戻る" @click="play = false" v-close-popup />
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
      this.loser = loser;
      console.log(this.loser);
      if (this.loser === 0) {
        this.gameovercolor = "#a22";
      } else if (this.loser === 1) {
        this.gameovercolor = "#22a";
      } else {
        this.gameovercolor = "white";
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

.btn_expl_sp {
  width: 150px;
  height: 100px;
}

.btn_expl_ {
  border: solid;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  text-align: center;
}
</style>
