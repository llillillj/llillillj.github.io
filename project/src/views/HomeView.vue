<template>
    <div v-bind:class="{'mobile-style': isMobile, 'pc-style': !isMobile}" class="bg-black float-right">
      <q-img v-bind:class="{'mobile-style-img': isMobile, 'pc-style-img': !isMobile}" src="../assets/lizard1.png">
        <div class="absolute-full text-right text-subtitle">
          <span class="q-mr-sm">兵庫県立大学 社会情報科学部 社会情報科学科</span><br>
          <span class="q-mr-sm">データ分析研究会</span>
          <a class="q-mr-lg" target="_blank" href="https://twitter.com/dakken205">-> Twitter</a><br>
          <span class="q-mr-sm">データ分析研究会</span>
          <a class="q-mr-lg" target="_blank" href="https://www.instagram.com/uoh_dakken/">-> Instagram</a><br>
          <span class="q-mr-sm">個人</span>
          <a class="q-mr-lg" target="_blank" href="https://twitter.com/llillillillj">-> Twitter</a><br>
          <span class="q-mr-sm">個人</span>
          <a class="q-mr-lg" target="_blank" href="https://www.kaggle.com/akiyukikouyama">-> Kaggle</a><br>
          <span class="q-mr-sm">個人</span>
          <a class="q-mr-lg" target="_blank" href="https://github.com/llillillj?tab=repositories">-> GIthub</a><br>
        </div>
      </q-img>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  props: ['isMobile'],
  data() {
    return {
    }
  },
  created() {
    console.log(this.isMobile)
  }
}
</script>

<style>
.pc-style {
  bottom: 0px;
  overflow: hidden;
  width: 650px;
  margin-left: 200px;
}
.mobile-style {
  width: 100vw;
  display: flex;
  justify-content: center;
}

.mobile-style {

}
</style>
