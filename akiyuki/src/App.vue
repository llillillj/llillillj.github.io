<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" :icon="leftDrawerOpen ? 'close' : 'menu'" />

        <q-toolbar-title @click="goHome">
          llillillillj
        </q-toolbar-title>

        <!-- 兵庫県立大学 -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-dark text-grey-3">
      <q-list>
        <q-item-label header class="text-grey-3">Links</q-item-label>
        <q-item clickable class="text-grey-3" to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable class="text-grey-3" target="_self" to="/snake">
          <q-item-section avatar>
            <q-icon name="sports_esports" />
          </q-item-section>
          <q-item-section>
            <q-item-label>SnakeGame</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/llillillj">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://www.kaggle.com/akiyukikouyama">
          <q-item-section avatar>
            <q-icon name="data_usage" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kaggle</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/llillillillj">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>X (Twitter)</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://www.uoh-dakken.com/">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>
            <q-item-label>ClubActivity</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-dark text-white" style="font-family: 'Murecho', sans-serif;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LayoutDefault',

  components: {
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  },
  methods: {
    goHome() {
      this.$router.push("/")
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Murecho&display=swap');

.border {
  border: solid 2px #666;
  border-radius: 8px;
}
</style>
