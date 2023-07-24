<template>
  <div style="margin-left: 150px" class="q-pl-md">
    <template v-if="works.length === 0">
      <div class="text-subtitle">There is no works yet...</div>
    </template>
    <template v-else>
      <template v-for="(work, idx) in works" v-bind:key="idx">
        <div class="q-ma-md q-gutter-y-xs">
          <div class="work-title">Title: {{ work.title }}</div>
          <div>Link: <a :href="work.link" target="blank">{{ work.link }}</a></div>
          <div>Description:<br>{{ work.description }}</div>
        </div>
        <hr v-if="idx !== works.length - 1" />
      </template>
    </template>
  </div>
</template>

<script>
import { getFirestore, getDocs, collection } from "firebase/firestore"

const firestore = getFirestore()

export default {
  data() {
    return {
      works: [],
    };
  },
  created() {
    const colRef = collection(firestore, "works")
    getDocs(colRef)
      .then(snapshot => {
        snapshot.forEach(qdoc => {
          let pushItem = {}
          pushItem.title = qdoc.data().title
          pushItem.link = qdoc.data().link
          pushItem.description = qdoc.data().description.replaceAll('"', '')
          this.works.push(pushItem);
        })
      })
  },
};
</script>

<style>
.work-title {
  color: #d8f7ff;
}
</style>
