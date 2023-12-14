<template>
  <div class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
    <template v-for="(row, y) in mapData" v-bind:key="row">
      <div class="row">
        <template v-for="(v, x) in row" v-bind:key="v">
          <div class="column">
            <div class="cell_" :class="getClass(x, y, v)"></div>
          </div>
        </template>
      </div>
    </template>
  </div>
  <template v-if="mobile">
    <div
      class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm text-white bg-dark row"
    >
      <div class="column">
        <div class="row">
          <div class="button-space bg-dark"></div>
          <q-btn
            label="↑"
            @click="player0Drection = '↑'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-dark"></div>
        </div>
        <div class="row">
          <q-btn
            label="←"
            @click="player0Drection = '←'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-dark"></div>
          <q-btn
            label="→"
            @click="player0Drection = '→'"
            class="button-space bg-white text-dark"
          ></q-btn>
        </div>
        <div class="row">
          <div class="button-space bg-dark"></div>
          <q-btn
            label="↓"
            @click="player0Drection = '↓'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-dark"></div>
        </div>
      </div>
    </div>
  </template>
</template>
<script>
export default {
  name: "SnakeGame",
  components: {},
  emits: ["on-gameover"],
  data() {
    return {
      mapData: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],

      cell_Class: ["path_", "block_"],
      player0HeadState: [2, 4],
      player0States: [[2, 4]],

      player1HeadState: [10, 6],
      player1States: [[10, 6]],

      player0MoveInterval: null,
      player1MoveInterval: null,

      food_State: [4, 2],
      player0Drection: null,
      player1Drection: null,
      zeroIndices: null,
      gameover: false,
      player0Interval: 250,
      player1Interval: 250,
      baseInterval: 250,
      fastInterval: 100,

      mobile: false,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      // スマホ・タブレット（iOS・Android）の場合の処理を記述
      this.mobile = true;
    }
    // setInterval(this.startSpeechToTxt, this.recognitionInterval+100);
    // this.startSpeechToTxt()
  },
  methods: {
    getClass(x, y, v) {
      if (this.isplayer0Head(x, y)) return "player0-head";
      else if (this.isplayer0(x, y)) return "player0";
      else if (this.isplayer1Head(x, y)) return "player1-head";
      else if (this.isplayer1(x, y)) return "player1";
      else if (this.isfood_(x, y)) return "food_";
      else return this.cell_Class[v];
    },

    isGameStarted() {
      return this.player0Drection !== null || this.player1Drection !== null;
    },

    isplayer0Head(x, y) {
      return this.player0HeadState[0] == x && this.player0HeadState[1] == y;
    },

    isplayer1Head(x, y) {
      return this.player1HeadState[0] == x && this.player1HeadState[1] == y;
    },

    isfood_(x, y) {
      return this.food_State[0] == x && this.food_State[1] == y;
    },

    isplayer0(x, y) {
      for (const i in this.player0States) {
        const player0_state = this.player0States[i];
        if (player0_state[0] == x && player0_state[1] == y) {
          return true;
        }
      }
      return false;
    },

    isplayer1(x, y) {
      for (const i in this.player1States) {
        const player1_state = this.player1States[i];
        if (player1_state[0] == x && player1_state[1] == y) {
          return true;
        }
      }
      return false;
    },

    onKeydown(event) {
      switch (event.keyCode) {
        case 38: // player0の上矢印キー
          this.player0Drection = "↑";
          break;
        case 40: // player0の下矢印キー
          this.player0Drection = "↓";
          break;
        case 37: // player0の左矢印キー
          this.player0Drection = "←";
          break;
        case 39: // player0の右矢印キー
          this.player0Drection = "→";
          break;

        case 87: // player1の上矢印キー
          this.player1Drection = "↑";
          break;
        case 83: // player1の下矢印キー
          this.player1Drection = "↓";
          break;
        case 65: // player1の左矢印キー
          this.player1Drection = "←";
          break;
        case 68: // player1の右矢印キー
          this.player1Drection = "→";
          break;

        // 加速処理
        case 16: // player0
          this.changePlayer0Interval();
          break;
        case 69: // player1
          this.changePlayer1Interval();
          break;
      }
    },

    changePlayer0Interval() {
      if (
        this.player0Interval === this.fastInterval ||
        this.player0States.length === 1 ||
        this.gameover
      ) {
        return;
      }
      this.player0Interval = this.fastInterval;
      this.player0States = this.player0States.slice(
        0,
        this.player0States.length - 1
      );
      setTimeout(() => {
        this.player0Interval = this.baseInterval;
      }, 1000);
    },
    changePlayer1Interval() {
      if (
        this.player1Interval === this.fastInterval ||
        this.player1States.length === 1 ||
        this.gameover
      ) {
        return;
      }
      this.player1Interval = this.fastInterval;
      this.player1States = this.player1States.slice(
        0,
        this.player1States.length - 1
      );
      setTimeout(() => {
        this.player1Interval = this.baseInterval;
      }, 1000);
    },

    // player0の操作
    moveplayer0() {
      if (!this.isGameStarted()) return;
      var tmp_state = JSON.parse(JSON.stringify(this.player0HeadState));
      switch (this.player0Drection) {
        case "↑":
          tmp_state[1]--;
          break;
        case "↓":
          tmp_state[1]++;
          break;
        case "←":
          tmp_state[0]--;
          break;
        case "→":
          tmp_state[0]++;
          break;
      }
      this.handleStatePlayer0(tmp_state);
    },
    handleStatePlayer0(tmp_state) {
      const [x, y] = tmp_state;
      if (this.mapData[y][x] == 1 || this.isplayer1(x, y)) {
        this.clearAllInterval();
        this.gameover = true
        this.$emit("on-gameover", this.player0States.length, 0);
      } else if (this.food_State[0] == x && this.food_State[1] == y) {
        const pushItem = JSON.parse(
          JSON.stringify(this.player0States.slice(-1)[0])
        );
        this.player0States.push(pushItem);
        this.handleHeadStatePlayer0(tmp_state);
        this.handleStatesPlayer0();
        this.changefood_State();
      } else {
        this.handleHeadStatePlayer0(tmp_state);
        this.handleStatesPlayer0();
      }
    },
    handleHeadStatePlayer0(tmp_state) {
      this.player0HeadState = tmp_state;
    },
    handleStatesPlayer0() {
      this.player0States.pop();
      this.player0States.unshift(
        JSON.parse(JSON.stringify(this.player0HeadState))
      );
    },

    // player1の操作
    moveplayer1() {
      if (!this.isGameStarted()) return;
      var tmp_state = JSON.parse(JSON.stringify(this.player1HeadState));
      switch (this.player1Drection) {
        case "↑":
          tmp_state[1]--;
          break;
        case "↓":
          tmp_state[1]++;
          break;
        case "←":
          tmp_state[0]--;
          break;
        case "→":
          tmp_state[0]++;
          break;
      }
      this.handleStatePlayer1(tmp_state);
    },
    handleStatePlayer1(tmp_state) {
      const [x, y] = tmp_state;
      if (this.mapData[y][x] == 1 || this.isplayer0(x, y)) {
        this.clearAllInterval();
        this.gameover = true
        this.$emit("on-gameover", this.player1States.length, 1);
      } else if (this.food_State[0] == x && this.food_State[1] == y) {
        const pushItem = JSON.parse(
          JSON.stringify(this.player1States.slice(-1)[0])
        );
        this.player1States.push(pushItem);
        this.handleHeadStatePlayer1(tmp_state);
        this.handleStatesPlayer1();
        this.changefood_State();
      } else {
        this.handleHeadStatePlayer1(tmp_state);
        this.handleStatesPlayer1();
      }
    },
    handleHeadStatePlayer1(tmp_state) {
      this.player1HeadState = tmp_state;
    },
    handleStatesPlayer1() {
      this.player1States.pop();
      this.player1States.unshift(
        JSON.parse(JSON.stringify(this.player1HeadState))
      );
    },

    clearAllInterval() {
      clearInterval(this.player0MoveInterval);
      clearInterval(this.player1MoveInterval);
    },

    changefood_State() {
      const [y, x] = this.getRandomZeroIndex();
      this.food_State = [x, y];
    },
    to_gameover() {
      this.gameover = true;
    },
    getRandomZeroIndex() {
      if (this.zeroIndices === null) {
        this.zeroIndices = this.getZeroIndices();
      }
      return this.zeroIndices[
        Math.floor(Math.random() * this.zeroIndices.length)
      ];
    },
    getZeroIndices() {
      const array = JSON.parse(JSON.stringify(this.mapData));
      const zeroIndices = [];
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j] === 0) {
            zeroIndices.push([i, j]);
          }
        }
      }
      return zeroIndices;
    },
  },
  watch: {
    player0Drection(newVal, prevVal) {
      if (newVal !== null && prevVal === null && !this.gameover) {
        this.player0MoveInterval = setInterval(
          this.moveplayer0,
          this.player0Interval
        );
      }
    },
    player1Drection(newVal, prevVal) {
      if (newVal !== null && prevVal === null && !this.gameover) {
        this.player1MoveInterval = setInterval(
          this.moveplayer1,
          this.player1Interval
        );
      }
    },
    player0Interval(newVal) {
      if (!this.gameover) {
        clearInterval(this.player0MoveInterval);
        this.player0MoveInterval = setInterval(this.moveplayer0, newVal);
      }
    },
    player1Interval(newVal) {
      if (!this.gameover) {
        clearInterval(this.player1MoveInterval);
        this.player1MoveInterval = setInterval(this.moveplayer1, newVal);
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

.cell_ {
  width: 14px;
  height: 14px;
  margin: 1px;
  border-radius: 4px;
}

.block_ {
  background-color: black;
}

.path_ {
  background-color: rgb(206, 206, 206);
}

.food_ {
  background-color: #2a2;
}

.player0 {
  background-color: #55c;
}

.player0-head {
  background-color: #22a;
}

.player1 {
  background-color: #c55;
}

.player1-head {
  background-color: #a22;
}

.button-space {
  width: 45px;
  height: 45px;
  border-radius: 100%;
}

.display-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
