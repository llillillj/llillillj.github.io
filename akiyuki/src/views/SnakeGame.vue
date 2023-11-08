<template>
    <q-page class="flex flex-center column q-pa-md">
        <p class="text-h3">Snake Game</p>
        <div class="content"></div>
    </q-page>
</template>

<script>
export default {
    name: "SnakeGame",
    components: {},
    data() {
        return {
            mapData: [],
        }
    }
}
</script>

<style>
.content {
    width: 300px;
    height: 300px;
    background-color: white;
}
</style>