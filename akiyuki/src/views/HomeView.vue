<template>
  <q-page padding class="home flex flex-center">
    <div class="q-gutter-md flex flex-center">
      <div>
        <img width="300" height="300" alt="Vue logo" src="@/assets/not_implemented/lizard01.png"
          style="border-radius: 8px;">
      </div>
      <div class="text-content text-center border q-pa-md" style="overflow-y: initial;">
        <p class="text-h5"><u>自己紹介</u></p>
        <p class="text-subtitle1">兵庫県立大学 社会情報科学部 社会情報科学科 B3 香山明之</p>
        <p>大学内の部活であるデータ分析研究部に所属．現在は研究演習で川嶋研に配属され，水中ロボットに適用する強化学習の勉強をしています．</p>
        <p>webアプリ開発の勉強や機械学習の勉強を主にしつつ，学祭やOCなどの大学のイベントの手伝いを部活経由でしています．</p>
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
  height: max(300px, calc(400px - 10vw));
}
</style>
