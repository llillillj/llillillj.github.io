<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />

        <q-toolbar-title>
          Akiyuki Ko-yama
        </q-toolbar-title>

        <div>University of Hyogo<br>Social Information Science</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-8 text-grey-3">
      <q-list>
        <q-item-label header class="text-grey-3">Links</q-item-label>
        <q-item clickable class="text-grey-3" tag="a" target="_blank" to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
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
        <q-item clickable tag="a" target="_blank" href="https://twitter.com/llillillillj">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>X (Twitter)</q-item-label>
            <!-- <q-item-label caption>@quasarframework</q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-dark text-white" style="font-family: 'Murecho', sans-serif;">
      <HomeView />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import HomeView from './views/HomeView.vue'

export default {
  name: 'LayoutDefault',

  components: {
    HomeView
  },

  setup() {
    return {
      leftDrawerOpen: ref(false)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Murecho&display=swap');
</style>
