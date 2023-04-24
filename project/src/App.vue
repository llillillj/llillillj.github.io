<template>
  <q-layout view="lHh Lpr lFf" class="bg-black text-white" style="font-weight: 1;">
    <q-page-container>
      <!-- <q-header class="bg-black flex flex-center q-pa-lg text-h">KoyamaAkiyuki</q-header> -->
      <q-header class="h flex flex-center q-pa-lg text-h"
        style="background-color: rgba(0, 0, 0, 0.8)">Akiyuki Koyama</q-header>
      <div id="fade" class="bg-transparent column q-ml-xl q-mt-sm q-gutter-y-xs"
        style="position: fixed; width: 300px; opacity: 1;">
        <router-link to="/" class="col">About Me</router-link>
        <router-link to="/works" class="col">Works</router-link>
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
      leftDrawerOpen: ref(false),
      isTransparent: ref(true),
      lastScrollPosition: ref(0),
      scrollThreshold: ref(50) // スクロール位置の閾値
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const currentScrollPosition = window.pageYOffset
      if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > this.scrollThreshold) {
        this.isTransparent = true
      } else {
        this.isTransparent = false
      }
      this.lastScrollPosition = currentScrollPosition
    }
  }
}
window.addEventListener('scroll', function () {
  var element = document.getElementById('fade');
  var position = element.getBoundingClientRect();

  // 要素がビューポート内にある場合
  if (position.top < window.innerHeight && position.bottom >= 0) {
    var opacity = 1 - (position.top / window.innerHeight);
    element.style.opacity = opacity;
  }
});
</script>

<style>
#app {
  text-decoration: none;
  font-family: Prompt, -apple-system, BlinkMacSystemFont, Segoe UI, Hiragino Sans, Hiragino Kaku Gothic ProN, Meiryo, sans-serif;
  letter-spacing: .03em;
}

.h {
  background-color: rgba(0, 0, 0, 0.5);
}

nav {
  padding: 30px;
}

a {
  color: #fcfcfc;
  text-decoration: none;
  z-index: 1;
  transition: background-color 0.3s ease-in-out;
}

a.router-link-exact-active {
  color: #d8f7ff;
}

.text-h {
  line-height: 1.2;
  font-size: 17px;
  letter-spacing: .05em;
}

.a.transparent {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
