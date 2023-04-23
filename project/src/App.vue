<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #93a3b3;
  background: #000;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #3f638a;
}

a {
  color: #436b97;
}

nav a.router-link-exact-active {
  color: #4ca0d8;
}
</style>
