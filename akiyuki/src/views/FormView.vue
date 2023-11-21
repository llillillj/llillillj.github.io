<template>
  <q-page class="flex flex-center column q-pa-md">
    <div class="column q-gutter-md" style="width: 325px">
      <div class="flex flex-center text-h4">Contact Me</div>
      <q-input
        class="col-9"
        dark
        dense
        outlined
        v-model="email"
        label="Your email-address"
      />
      <q-input
        class="col-9"
        type="textarea"
        dark
        dense
        outlined
        v-model="inquiry"
        label="Inquiry"
      />
      <div>
        <div class="float-right q-gutter-x-md">
            <span class="text-alert">*You'll get bcc mail.</span>
            <q-btn class="" style="width: 60px;"  icon="send" dark flat></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
    name: "FormView",
    components: {},
    data() {
        return {
            email: "",
            inquiry: "",
        }
    }
}
</script>

<style></style>
