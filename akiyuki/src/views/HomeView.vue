<template>
  <q-page padding class="home flex flex-center">
    <div class="q-gutter-md flex flex-center">
      <div class="text-content text-left q-pa-md q-gutter-y-xl" style="overflow-y: initial;">
        <p class="text-h4">Akiyuki Koyama</p>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">所属</p>
          <li class="text-subtitle1"><a href="https://u-hyogo.info/" target="_blank" rel="noopener noreferrer">兵庫県立大学大学院 情報科学研究科 データ計算科学専攻</a></li>
          <li class="text-subtitle1"><a href="https://interaction-lab.org/ja/" target="_blank" rel="noopener noreferrer">川嶋研究室</a> 所属</li>
          <li class="text-subtitle1"><a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer">合同会社DA研</a></li>
        </div>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">活動概要</p>
          <li class="text-subtitle1">専門：データ分析，機械学習，Webアプリ開発</li>
          <li class="text-subtitle1">スキル：Python，Vue.js，Git，Autodesk fusion，3Dプリンター，C#，Firestore</li>
          <li class="text-subtitle1">活動：機械学習コンペへの参加など</li>
        </div>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">過去の取り組み</p>
          <table class="text-subtitle1">
            <thead>
              <tr>
                <th>年</th>
                <th>ジャンル</th>
                <th>形態</th>
                <th>取り組み内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2021~2023</td>
                <td>開発</td>
                <td>バイト</td>
                <td><a href="https://www.nysol.jp/" target="_blank" rel="noopener noreferrer">株式会社nysol</a> で請求書発行サイトの開発</td>
              </tr>
              <tr>
                <td>2022</td>
                <td>分析</td>
                <td>コンペ</td>
                <td><a href="https://www.kaggle.com/akiyukikouyama/code" target="_blank" rel="noopener noreferrer">Kaggle notebook expert</a>への昇格</td>
              </tr>
              <tr>
                <td>2023</td>
                <td>分析</td>
                <td>バイト</td>
                <td>架電音声の文字起こしデータを用いた顧客属性分析</td>
              </tr>
              <tr>
                <td>2023</td>
                <!-- <td>分析コンペ</td> -->
                <td>分析</td>
                <td>コンペ</td>
                <td><a href="https://signate.jp/competitions/1051" target="_blank" rel="noopener noreferrer">Signate student cup 2023</a>で上位入賞</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>分析</td>
                <td>インターン</td>
                <td><a href="https://matsuo-institute.com/" target="_blank" rel="noopener noreferrer">株式会社松尾研究所</a>で小売店需要予測のインターン</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>開発</td>
                <td>受託</td>
                <td><a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer">合同会社DA研</a>でリカレント教育用動画配信サイトのフロントエンド開発</td>
              </tr>
              <tr>
                <td>2024</td>
                <td>開発</td>
                <td>受託</td>
                <td><a href="https://www.dakken.co.jp/" target="_blank" rel="noopener noreferrer">合同会社DA研</a>でゲートキーパー手帳用アプリの開発</td>
              </tr>
              <tr>
                <td>2025</td>
                <td>開発</td>
                <td>バイト</td>
                <td>AutoCADの図形保存・解析・描画の自動化API開発</td>
              </tr>
            </tbody>
          </table>
        </div>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">研究内容</p>
          <p class="text-subtitle1">研究室で取り組まれているプロジェクトの一つで<span style="color: orange;">魚群のインタラクション</span>について携わっています．卒業研究では，このテーマでの利用を想定した<span style="color: orange;">魚型ロボットの開発</span>を行いました．</p>
          <p class="text-subtitle1">学部卒業後は，同大学の情報科学研究科に進学し，魚型ロボットの改良，遊泳制御の<span style="color: orange;">モデル予測制御・強化学習</span>などによる最適化を用いて行っています．</p>
        </div>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">制作物</p>
          <li class="text-subtitle1">部活動の定例会資料自動作成ツール</li>
          <li class="text-subtitle1"><a href="https://llillillj.github.io/snake" target="_blank" rel="noopener noreferrer">Snake Game</a></li>
          <li class="text-subtitle1"><a href="https://llillillj.github.io/boid-algorithm/" target="_blank" rel="noopener noreferrer">Boid Algorithm</a></li>
        </div>
        <q-separator color="grey-10" />
        <div>
          <p class="text-h5">リンク</p>
          <li class="text-subtitle1"><a href="https://www.kaggle.com/akiyukikouyama" target="_blank" rel="noopener noreferrer">Kaggle</a></li>
          <li class="text-subtitle1"><a href="https://zenn.dev/k_akiyuki" target="_blank" rel="noopener noreferrer">Zenn</a></li>
          <li class="text-subtitle1"><a href="https://github.com/llillillj" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </div>
      </div>
    </div>
    <q-footer class="semi-transparent-bg bg-black">
        <div class="text-caption text-center">© 2025 Akiyuki Koyama / ad25u022@guh.u-hyogo.ac.jp</div>
    </q-footer>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'KoyamaPortfolio',
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

a {
  color: skyblue
}
a:hover {
  color: orange;
  text-decoration: underline;
}

/* テーブルに枠線の追加 */
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>