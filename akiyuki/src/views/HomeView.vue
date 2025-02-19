<template>
  <q-page padding class="home flex flex-center">
    <div class="q-gutter-md flex flex-center">
      <div class="text-content text-left q-pa-md q-gutter-y-md" style="overflow-y: initial;">
        <p class="text-h4">Akiyuki Kouyama</p>
        <div>
          <p class="text-h5">所属</p>
          <li class="text-subtitle1"><a href="https://www.u-hyogo.ac.jp/sis/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">兵庫県立大学 社会情報科学部</a></li>
          <li class="text-subtitle1"><a href="https://interaction-lab.org/ja/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">川嶋研究室</a> 所属</li>
          <li class="text-subtitle1"><a href="https://www.uoh-dakken.com/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">データ分析研究部</a> 所属</li>
          <li class="text-subtitle1"><a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">合同会社DA研</a></li>
        </div>
        <div>
          <p class="text-h5">活動概要</p>
          <li class="text-subtitle1">専門：データ分析，機械学習，Webアプリ開発</li>
          <li class="text-subtitle1">スキル：Python，Vue.js，Git，Autodesk fusion，3Dプリンター</li>
          <li class="text-subtitle1">活動：機械学習コンペへの参加など</li>
        </div>
        <div>
          <p class="text-h5">過去の取り組み</p>
          <li class="text-subtitle1">2021~2023: <a href="https://www.nysol.jp/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">株式会社nysol</a>  開発バイト（請求書発行サイト）</li>
          <li class="text-subtitle1">2022: <a href="https://www.kaggle.com/akiyukikouyama/code" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Kaggle notebook expert</a>（データ分析レポート）</li>
          <li class="text-subtitle1">2023: 架電音声の文字起こしデータを用いた顧客属性分析バイト</li>
          <li class="text-subtitle1">2023: <a href="https://signate.jp/competitions/1051" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Signate student cup 2023</a> 上位入賞</li>
          <li class="text-subtitle1">2024: <a href="https://matsuo-institute.com/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">株式会社松尾研究所</a> インターン（小売店需要予測）</li>
          <li class="text-subtitle1">2024: <a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">合同会社DA研</a> リカレント教育用動画配信サイト（フロントエンド開発）</li>
          <li class="text-subtitle1">[WIP]: <a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">合同会社DA研</a> 地方自治体と共同でセルフケアアプリを開発中</li>
        </div>
        <div>
          <p class="text-h5">研究内容</p>
          <p class="text-subtitle1">研究室で取り組まれているプロジェクトの一つで<span style="color: orange;">魚群のインタラクション</span>について携わっています．卒業研究では，このテーマでの利用を想定した<span style="color: orange;">魚型ロボットの開発</span>を行いました．</p>
          <p class="text-subtitle1">学部卒業後は，同大学の情報科学研究科に進学し，魚型ロボットの遊泳制御を<span style="color: orange;">強化学習</span>等を用いて行っていく予定です．</p>
        </div>
        <div>
          <p class="text-h5">制作物</p>
          <li class="text-subtitle1">部活動の定例会資料自動作成ツール</li>
          <li class="text-subtitle1"><a href="https://llillillj.github.io/snake" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Snake Game</a></li>
          <li class="text-subtitle1"><a href="https://llillillj.github.io/boids-algorithm/" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Boids Algorithm</a></li>
        </div>
        <div>
          <p class="text-h5">リンク</p>
          <li class="text-subtitle1"><a href="https://www.kaggle.com/akiyukikouyama" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Kaggle</a></li>
          <li class="text-subtitle1"><a href="https://zenn.dev/k_akiyuki" target="_blank" rel="noopener noreferrer" style="color: skyblue;">Zenn</a></li>
          <li class="text-subtitle1"><a href="https://github.com/llillillj" target="_blank" rel="noopener noreferrer" style="color: skyblue;">GitHub</a></li>
        </div>
      </div>
    </div>
    <q-footer class="semi-transparent-bg bg-black">
        <div class="text-caption text-center">© 2023 Akiyuki Kouyama / fa21s035@guh.u-hyogo.ac.jp</div>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'KouyamaPortfolio',
  components: {
  }
}
</script>

<style>
.text-content {
  max-width: 700px;
}
.semi-transparent-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>