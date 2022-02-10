<template>
  <el-row v-if="$route.path !== '/'">
    <el-col :span="24"><router-link to="/">返回主選單</router-link></el-col>
  </el-row>
  <el-row><el-col :span="24"><router-view /></el-col></el-row>
  <el-row v-if="$route.path === '/'">
    <el-col :xs="1" :sm="3" :md="4" :lg="6" :xl="8" v-for="(r) in routes.filter(x => x.path !== '/')" :key="r.name">
      <router-link class="mmenu" :to="r.path">{{r.name}}</router-link>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { routes } from "@/router/routes.ts";
export default defineComponent({
  name: "App",
  data(){ 
    return {
      routes
    }
  }
});
</script>

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
.mmenu {
    border: 1px solid #909399;
    border-radius: 5px;
    width: calc(100% - 10px);
    height: 42px;
    display: block;
    padding-top: 18px;
    background: aliceblue;
}
</style>
