<template>
  <q-page padding class="home flex flex-center">
    <div class="q-gutter-md flex flex-center">
      <div>
        <img width="300" height="300" alt="Vue logo" src="@/assets/not_implemented/lizard01.png"
          style="border-radius: 8px;">
      </div>
      <div class="text-content text-left q-pa-md" style="overflow-y: initial;">
        <li class="text-subtitle1">兵庫県立大学 社会情報科学部 社会情報科学科 B4</li>
        <li class="text-subtitle1">川嶋研究室 所属</li>
        <li class="text-subtitle1">データ分析研究部 所属</li>
      </div>
    </div>
  </q-page>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  }
}
</script>

<style>
.text-content {
  width: max(300px, 60vw);
}
</style>
