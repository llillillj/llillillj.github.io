<template>
  <div
    style="margin-left: 150px; width: 50vw; min-width: 400px"
    class="q-pl-md"
  >
    <span class="q-pa-md">Admin Page: You can add work here.</span>
    <div class="column form">
      <q-input
        v-model="title"
        class="q-ma-sm"
        color="purple-12"
        dark
        dense
        outlined
        label="Title"
      ></q-input>
      <q-input
        v-model="link"
        dense
        class="q-ma-sm"
        color="purple-12"
        dark
        outlined
        label="Link"
      />
      <q-input
        v-model="description"
        class="q-ma-sm"
        color="purple-12"
        dark
        outlined
        type="textarea"
        label="Description"
        @keyup.shift.enter="sendWork"
      >
        <q-btn
          @click.stop="sendWork"
          icon="save"
          style="height: 30px; position: absolute; right: 0px; bottom: 5px"
        ></q-btn>
      </q-input>
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
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firestore = getFirestore();

export default {
  components: {},
  data() {
    return {
      title: "",
      link: "",
      description: "",
      notif: false,
      notifTitle: "",
      notifMessage: "",
    };
  },
  methods: {
    initForm() {
      this.title = "";
      this.link = "";
      this.description = "";
    },
    checkFullfilled() {
      const flag =
        this.title !== "" && this.link !== "" && this.description !== "";
      return flag;
    },
    nofitAdded() {
      this.notifTitle = "Add new work";
      this.notifMessage = "Your new work has been registerd successfully.";
      this.notif = true;
    },
    notifCanceled(message) {
      this.notifTitle = "Failed add new work";
      this.notifMessage = message;
      this.notif = true;
    },
    sendWork() {
      if (!this.checkFullfilled()) {
        this.notifCanceled("You have to fill all content");
      } else {
        addDoc(collection(firestore, "works"), {
          title: this.title,
          link: this.link,
          description: this.description,
        })
          .then(() => {
            this.nofitAdded();
            this.initForm();
          })
          .catch(() => {
            this.notifCanceled("Unexpected error occured");
          });
      }
    },
  },
};
</script>

<style>
.form {
  max-width: 500px;
  min-width: 300px;
}
.card-frame {
  width: 350px;
  border: solid 1px white;
  border-radius: 8px;
}
</style>
