<template>
  <div class="content-body">
  </div>
  <div class="row" style="width:calc(100vw - 200px); position: absolute; right: 0px; z-index: 1;">
    <img class="col" src="../assets//lizard2.png" alt="">
    <img class="col" src="../assets//lizard1.png" alt="">
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
  right: 0px;
  width: calc(100vw - 200px);
  max-height: 600px;
  height: 55vh;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.7);
}</style>
