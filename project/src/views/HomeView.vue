<template>
    <div class="bg-black" style="height: calc(100vw - 300px);">
      <q-img src="../assets/lizard1.png" class="float-right" style="width: calc(100vw - 300px);">
        <div class="absolute-full text-subtitle1 text-right">
          <span class="q-mr-sm" style="z-index: 2;">University of Hyogo: Social Information Science</span><br>
          <a class="q-mr-lg" target="_blank" style="z-index: 2;" href="https://twitter.com/llillillillj">-> Twitter</a><br>
          <a class="q-mr-lg" target="_blank" href="https://www.kaggle.com/akiyukikouyama">-> Kaggle</a><br>
          <a class="q-mr-lg" target="_blank" href="https://github.com/llillillj?tab=repositories">-> GIthub</a><br>
        </div>
      </q-img>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style>
.content-body {
  position: absolute;
  top: 0px;
  right: 0px;
  width: calc(100vw - 200px);
  min-height: calc(50vw - 100px);
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
