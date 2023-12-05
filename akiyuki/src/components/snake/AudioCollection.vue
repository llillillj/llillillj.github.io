<template>
    <div>
        Audio Collection
    </div>
    <q-btn @click="onExit" color="white" class="text-black" label="exit"></q-btn>
</template>

<script>
export default {
  name: "SnakeGame",
  components: {},
  emits: ["exit-audio"],
  data() {
    return {

    }
  },
  methods: {
    onExit() {
        this.$emit("exit-audio")
    }
  }
}
</script>

<style>

</style>