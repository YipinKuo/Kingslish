<template>
  <div id="nav">
    <div class="display-block"><router-link v-if="$route.path == '/'" to="/Quest">考題一</router-link></div>
    <div class="display-block"><router-link v-if="$route.path == '/'" to="/TestTTS">語音辨識測試</router-link></div>
  </div>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
 background: #b3d8ff !important;
}
.display-block { display: block; }
</style>
