<template>
  <div class="content flex flex-center q-pl-xs q-pr-xs q-pt-sm q-pb-sm">
    <template v-for="(row, y) in mapData" v-bind:key="row">
      <div class="row">
        <template v-for="(v, x) in row" v-bind:key="v">
          <div class="column">
            <div
              class="cell"
              :class="isPlayer(x, y) ? 'player' : cellClass[v]"
            ></div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SnakeGame",
  components: {},
  data() {
    return {
      mapData: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
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

      cellClass: ["path", "block", "food"],
      playerHeadState: [2, 4],
      playerStates: [[2, 4]],
      direction: "→",
    };
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
    setInterval(this.movePlayer, 250);
  },
  methods: {
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
      var tmp_state = JSON.parse(JSON.stringify(this.playerHeadState));
      switch (this.direction) {
        case "↑":
          tmp_state[0]--;
          break;
        case "↓":
          tmp_state[0]++;
          break;
        case "←":
          tmp_state[1]--;
          break;
        case "→":
          tmp_state[1]++;
          break;
      }
      this.handleState(tmp_state);
    },
    handleState(tmp_state) {
      const [y, x] = tmp_state;
      if (this.mapData[y][x] == 1) {
        return;
      } else if (this.mapData[y][x] == 2) {
        const pushItem = JSON.parse(
          JSON.stringify(this.playerStates.slice(-1)[0])
          );
          this.playerStates.unshift(pushItem);
          this.handleHeadState(tmp_state);
          this.handleStates();
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
    isPlayer(x, y) {
      for (const i in this.playerStates) {
        const player_state = this.playerStates[i];
        if (player_state[0] == y && player_state[1] == x) {
          return true;
        }
      }
      return false;
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
  background-color: rgb(232, 232, 232);
}

.food {
  background-color: #2a2;
}

.player {
  background-color: #22a;
}
</style>
