<template>
  <div style="margin-left: 150px" class="q-pl-md">
    <div
      class="row q-gutter-x-md q-pa-md q-mr-md bg-grey-10"
      style="border-radius: 8px"
    >
      <q-select
        filled
        v-model="queryDepartment"
        label="department"
        :options="queryOptionDepartment"
        style="width: 250px"
        behavior="menu"
        class="col hidden-overflow"
        dark
        outlined
        dense
      ></q-select>
      <q-select
        filled
        v-model="queryBehavior"
        label="Behavior"
        :options="queryOptionBehavior"
        style="width: 250px"
        behavior="menu"
        class="col hidden-overflow"
        dark
        outlined
        dense
      ></q-select>
      <q-select
        filled
        v-model="queryLibrary"
        label="Library"
        :options="queryOptionLibrary"
        style="width: 250px"
        behavior="menu"
        class="col hidden-overflow"
        dark
        outlined
        dense
      ></q-select>
      <q-btn rounded icon="search" flat @click="searchReference"></q-btn>
    </div>

    <div>
      <ul class="uk-nav-default q-mr-xl q-pt-md" uk-nav>
        <template v-for="snipet of references" v-bind:key="snipet">
          <li class="uk-parent">
            <a class="text-white"> {{ snipet.title }} <span uk-nav-parent-icon></span></a>
            <ul class="uk-nav-sub">
              <div v-html="snipet.code"></div>
              <!-- <div v-html="markdownContent"></div> -->
            </ul>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<!-- 

<style></style> -->

<script>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
// import { getFileList } from '@/libs/getFileList'
import { marked } from "marked";
import { HighlightJS } from "highlight.js/lib/core";
import "highlight.js/styles/default.css";

// 使用するハイライト言語を選択する
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

import "highlight.js/styles/vs.css";

HighlightJS.registerLanguage("javascript", javascript);
HighlightJS.registerLanguage("python", python);

const db = getFirestore();
const queryOptionRef = doc(db, "codeRef", "queryOption");

export default {
  data() {
    return {
      markdownContent: null,
      references: [],
      queryOptionDepartment: [],
      queryOptionBehavior: [],
      queryOptionLibrary: [],
      queryDepartment: "",
      queryBehavior: "",
      queryLibrary: "",
    };
  },
  async mounted() {
    try {
      await this.fetchMarkdown();
      await this.setOptions();
    } catch (err) {
      console.error(err);
    }
  },

  methods: {
    async fetchMarkdown() {
      const response = await fetch("/blog/memo.md");
      const data = await response.text();
      this.markdownContent = marked(data, {
        highlight: function (code, lang) {
          if (lang && HighlightJS.getLanguage(lang)) {
            return HighlightJS.highlight(lang, code).value;
          }
          return HighlightJS.highlightAuto(code).value;
        },
      });
    },
    async setOptions() {
      const queryOptionSnapshot = await getDoc(queryOptionRef);
      const queryOption = queryOptionSnapshot.data();
      this.queryOptionDepartment = queryOption.department;
      this.queryOptionBehavior = queryOption.behavior;
      this.queryOptionLibrary = queryOption.library;
    },
    async searchReference() {
      this.references = [];
      const ref = collection(
        db,
        "codeRef",
        "reference",
        this.queryDepartment,
        this.queryBehavior,
        this.queryLibrary
      );
      const snapshot = await getDocs(ref);
      snapshot.forEach((qdoc) => {
        this.references.push(qdoc.data());
      });
    },
  },
};
</script>
