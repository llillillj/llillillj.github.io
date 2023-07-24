<template>
  <div style="margin-left: 150px" class="q-pl-md">
    <span class="q-pa-md">Admin Page: You can add reference here.</span>
    <div class="column form">
      <div class="col">
        <q-select
          class="col q-ma-sm q-mr-xl"
          color="purple-12"
          use-input
          dense
          outlined
          v-model="queryDepartment"
          :options="queryOptionDepartment"
          label="Department"
          dark
        ></q-select>
        <q-select
          class="col q-ma-sm q-mr-xl"
          color="purple-12"
          use-input
          dense
          outlined
          v-model="queryBehavior"
          :options="queryOptionBehavior"
          label="Behavior"
          dark
        ></q-select>
        <q-select
          class="col q-ma-sm q-mr-xl"
          color="purple-12"
          dense
          use-input
          outlined
          v-model="queryLibrary"
          :options="queryOptionLibrary"
          label="Library"
          dark
        ></q-select>
      </div>
      <!-- <template v-if="queryDepartment && queryBehavior && queryLibrary"> -->
      <q-input
        v-model="refTitle"
        class="q-ma-sm"
        color="purple-12"
        dark
        dense
        outlined
        label="Title"
      ></q-input>
      <q-input
        v-model="refCode"
        class="q-ma-sm"
        color="purple-12"
        dark
        outlined
        type="textarea"
        label="Code"
      />
      <q-input
        v-model="description"
        class="q-ma-sm"
        color="purple-12"
        dark
        outlined
        type="textarea"
        label="Description"
        @keyup.shift.enter="sendRef"
      >
        <q-btn
          @click.stop="sendRef"
          icon="save"
          style="height: 30px; position: absolute; right: 0px; bottom: 5px"
        ></q-btn>
      </q-input>
      <q-btn @click="test">test</q-btn>
      <!-- </template> -->
    </div>
  </div>

  <template>
    <q-dialog v-model="notif" class="float-center" position="top">
      <q-card class="bg-black card-frame">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">{{ notifTitle }}</div>
            <div class="text-grey">{{ notifMessage }}</div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
</template>

<script>
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore";

const db = getFirestore();
const queryOptionRef = doc(db, "codeRef", "queryOption");
export default {
  data() {
    return {
      queryOptionDepartment: "",
      queryOptionBehavior: "",
      queryOptionLibrary: "",
      queryDepartment: "",
      queryBehavior: "",
      queryLibrary: "",
      refTitle: "",
      refCode: "",
      description: "",
      notif: false,
      notifTitle: "",
      notifMessage: "",
    };
  },
  async mounted() {
    this.setOptions();
  },
  methods: {
    test() {
      console.log(this.refCode)
    },
    nofitAdded() {
      this.notifTitle = "Add new Reference";
      this.notifMessage = "Your new Reference has been registerd successfully.";
      this.notif = true;
    },
    notifCanceled(message) {
      this.notifTitle = "Failed add new Reference";
      this.notifMessage = message;
      this.notif = true;
    },
    async setOptions() {
      const queryOptionSnapshot = await getDoc(queryOptionRef);
      const queryOption = queryOptionSnapshot.data();
      this.queryOptionDepartment = queryOption.department;
      this.queryOptionBehavior = queryOption.behavior;
      this.queryOptionLibrary = queryOption.library;
    },
    checkFullfilled() {
      const flag =
        this.queryDepartment !== "" &&
        this.queryBehavior !== "" &&
        this.queryLibrary !== "" &&
        this.refCode !== "" &&
        this.description !== "";
      return flag;
    },
    sendRef() {
      if (this.checkFullfilled()) {
        const colRef = collection(
          db,
          "codeRef",
          "reference",
          this.queryDepartment,
          this.queryBehavior,
          this.queryLibrary
        );
        addDoc(colRef, {
          title: this.refTitle,
          code: this.refCode,
          description: this.description,
        })
          .then(() => {
            this.nofitAdded();
            this.initQuery();
          })
          .catch(() => {
            this.notifCanceled("Unexpected error occured");
          });
      } else {
        this.notifCanceled("You have to fill all form");
      }
    },
    initQuery() {
      this.queryDepartment = "";
      this.queryBehavior = "";
      this.queryLibrary = "";
      this.refTitle = "";
      this.refCode = "";
      this.description = "";
    },
  },
};
</script>

<style>
.form {
  max-width: 500px;
  min-width: 300px;
}
.formPrefix {
  width: 50px;
}
.card-frame {
  width: 350px;
  border: solid white;
  border-radius: 8px;
}
</style>
