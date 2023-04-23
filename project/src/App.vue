<template>
  <q-layout view="lHh Lpr lFf" class="bg-black text-white" style="font-weight: 1;">
    <q-page-container>
      <!-- <q-header class="bg-black flex flex-center q-pa-lg text-h">KoyamaAkiyuki</q-header> -->
      <q-header class="h flex flex-center q-pa-lg text-h" style="background-color: rgba(0, 0, 0, 0.8)">KoyamaAkiyuki</q-header>
      <div class="bg-transparent column q-ml-xl q-mt-sm q-gutter-y-xs" style="position: absolute; width: 300px;">
        <router-link to="/" class="col">Home</router-link>
        <router-link to="/about" class="col">About</router-link>
      </div>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'LayoutDefault',

  components: {
  },

  setu() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style>
#app {
  text-decoration: none;
  font-family: Prompt, -apple-system, BlinkMacSystemFont, Segoe UI, Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  letter-spacing: .03em;
}

.h{
  background-color: rgba(0, 0, 0, 0.5);
}

nav {
  padding: 30px;
}

a {
  color: #fcfcfc;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #d8f7ff;
}

.text-h {
  line-height: 1.2;
  font-size: 17px;
  letter-spacing: .05em;
}
</style>
