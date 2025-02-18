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
      class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm text-white bg-black row"
    >
      <div class="column">
        <div class="row">
          <div class="button-space bg-black"></div>
          <q-btn
            label="↑"
            @click="direction = '↑'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-black"></div>
        </div>
        <div class="row">
          <q-btn
            label="←"
            @click="direction = '←'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-black"></div>
          <q-btn
            label="→"
            @click="direction = '→'"
            class="button-space bg-white text-dark"
          ></q-btn>
        </div>
        <div class="row">
          <div class="button-space bg-black"></div>
          <q-btn
            label="↓"
            @click="direction = '↓'"
            class="button-space bg-white text-dark"
          ></q-btn>
          <div class="button-space bg-black"></div>
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
  props: ["nenemy"],
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
      playerHeadState: [2, 4],
      playerStates: [[2, 4]],

      enemiesHeadState: [
        [10, 6],
        [6, 10],
        [17, 8],
      ],
      enemiesStates: [
        [
          [10, 6],
          [9, 6],
          [8, 6],
        ],
        [
          [6, 10],
          [6, 9],
          [5, 9],
        ],
        [
          [17, 8],
          [17, 9],
          [17, 10],
        ],
      ],

      playerMoveInterval: null,
      enemyMoveInterval: null,
      enemyExpandInterval: null,

      food_State: [4, 2],
      direction: null,
      zeroIndices: null,
      gameover: false,

      mobile: false,
    };
  },
  mounted() {
    this.enemiesHeadState = this.enemiesHeadState.slice(0, this.nenemy);
    this.enemiesStates = this.enemiesStates.slice(0, this.nenemy);
    window.addEventListener("keydown", this.onKeydown);
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      // スマホ・タブレット（iOS・Android）の場合の処理を記述
      this.mobile = true;
    }
  },
  methods: {
    getClass(x, y, v) {
      if (this.isPlayerHead(x, y)) return "player-head";
      else if (this.isPlayer(x, y)) return "player";
      else if (this.isEnemyHead(x, y)) return "enemy-head";
      else if (this.isEnemy(x, y)) return "enemy";
      else if (this.isfood_(x, y)) return "food_";
      else return this.cell_Class[v];
    },

    isGameStarted() {
      return this.direction !== null;
    },

    isPlayerHead(x, y) {
      return this.playerHeadState[0] == x && this.playerHeadState[1] == y;
    },

    isEnemyHead(x, y) {
      for (const i in this.enemiesHeadState) {
        if (
          this.enemiesHeadState[i][0] == x &&
          this.enemiesHeadState[i][1] == y
        )
          return true;
      }
      return false;
    },

    isfood_(x, y) {
      return this.food_State[0] == x && this.food_State[1] == y;
    },

    isPlayer(x, y) {
      for (const i in this.playerStates) {
        const player_state = this.playerStates[i];
        if (player_state[0] == x && player_state[1] == y) {
          return true;
        }
      }
      return false;
    },

    isEnemy(x, y) {
      for (const i in this.enemiesStates) {
        for (const j in this.enemiesStates[i]) {
          const enemy_state = this.enemiesStates[i][j];
          if (enemy_state[0] == x && enemy_state[1] == y) {
            return true;
          }
        }
      }
      return false;
    },

    onKeydown(event) {
      switch (event.keyCode) {
        case 38: // 上矢印キー
          this.direction = "↑";
          break;
        case 40: // 下矢印キー
          this.direction = "↓";
          break;
        case 37: // 左矢印キー
          this.direction = "←";
          break;
        case 39: // 右矢印キー
          this.direction = "→";
          break;
      }
    },
    movePlayer() {
      if (!this.isGameStarted()) return;
      var tmp_state = JSON.parse(JSON.stringify(this.playerHeadState));
      switch (this.direction) {
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
      this.handleState(tmp_state);
    },

    handleState(tmp_state) {
      const [x, y] = tmp_state;
      if (this.mapData[y][x] == 1 || this.isEnemy(x, y)) {
        this.clearAllInterval();
        this.$emit("on-gameover", this.playerStates.length, null);
      } else if (this.food_State[0] == x && this.food_State[1] == y) {
        const pushItem = JSON.parse(
          JSON.stringify(this.playerStates.slice(-1)[0])
        );
        this.playerStates.push(pushItem);
        this.handleHeadState(tmp_state);
        this.handleStates();
        this.changefood_State();
      } else {
        this.handleHeadState(tmp_state);
        this.handleStates();
      }
    },
    handleHeadState(tmp_state) {
      this.playerHeadState = tmp_state;
    },
    handleStates() {
      this.playerStates.pop();
      this.playerStates.unshift(
        JSON.parse(JSON.stringify(this.playerHeadState))
      );
    },

    moveEnemy() {
      if (!this.isGameStarted()) return;
      for (const i in this.enemiesHeadState) {
        var random_idx = Math.floor(Math.random() * 4);
        var tmp_state = JSON.parse(JSON.stringify(this.enemiesHeadState[i]));
        switch (random_idx) {
          case 0:
            tmp_state[0]--;
            break;
          case 1:
            tmp_state[0]++;
            break;
          case 2:
            tmp_state[1]--;
            break;
          case 3:
            tmp_state[1]++;
            break;
        }
        this.enemyHandleState(tmp_state, i);
      }
    },
    enemyHandleState(tmp_state, i) {
      const [x, y] = tmp_state;
      if (this.mapData[y][x] == 1) {
        return;
      } else if (this.isPlayer(x, y)) {
        this.clearAllInterval();
        this.$emit("on-gameover", this.playerStates.length, null);
      } else {
        this.enemyHandleHeadState(tmp_state, i);
        this.enemyHandleStates(i);
      }
    },
    enemyHandleHeadState(tmp_state, i) {
      this.enemiesHeadState[i] = tmp_state;
    },
    enemyHandleStates(i) {
      this.enemiesStates[i].pop();
      this.enemiesStates[i].unshift(
        JSON.parse(JSON.stringify(this.enemiesHeadState[i]))
      );
    },
    expandEnemy() {
      for (const i in this.enemiesHeadState) {
        const pushItem = JSON.parse(
          JSON.stringify(this.enemiesStates[i].slice(-1)[0])
        );
        this.enemiesStates[i].push(pushItem);
      }
    },

    clearAllInterval() {
      clearInterval(this.playerMoveInterval);
      clearInterval(this.enemyMoveInterval);
      clearInterval(this.enemyExpandInterval);
    },

    changefood_State() {
      const [y, x] = this.getRandomZeroIndex();
      this.food_State = [x, y]
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
    direction(newVal, prevVal) {
      if (newVal !== null && prevVal === null) {
        const gameInterval = 250;
        this.playerMoveInterval = setInterval(this.movePlayer, gameInterval);
        this.enemyMoveInterval = setInterval(this.moveEnemy, gameInterval);
        this.enemyExpandInterval = setInterval(this.expandEnemy, 10000);
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

.player {
  background-color: #55c;
}

.player-head {
  background-color: #22a;
}

.enemy {
  background-color: #c55;
}

.enemy-head {
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
