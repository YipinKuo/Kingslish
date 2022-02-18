<template @click="bg_onclick()">
<div class="container-xxl">
  <div class="bd-content ps-lg-4">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Kingslish Apps</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NuxtLink class="nav-link" v-bind:class='{ "active": $route.path === "/" }' to="/"> 主選單 </NuxtLink>
            </li>
            <li v-for="(g, i) in navddm_sub_show" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle"  @click="navddm_onclick(i)" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{{g.type}}</a>
              <ul class="dropdown-menu" v-bind:class="{ show: g.show }" aria-labelledby="navbarDropdown">
                <li v-for="(r) in $menus.filter(x => x.path !== '/' && x.type === g.type)" :key="r.name"><NuxtLink @click="nuxtlink_onclick()" class="dropdown-item" :to="r.path">{{r.name}}</NuxtLink></li>
              </ul>
            </li>
          </ul>
          <!-- form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form -->
        </div>
      </div>
    </nav>
  </div>
</div>
<slot />
</template>
<script lang="ts">
var navddm_sub_show: any[] =  [
  { show: false, type: '練習' },
  { show: false, type: '工具' }
];

export default {
  data(){ 
     return { 
        navddm_sub_show
     }
  },
  methods: {
    bg_onclick: function() {
      for(var k = 0; k < this.navddm_sub_show.length; k++)
        this.navddm_sub_show[k].show = false;
    },
    navddm_onclick: function(i: number) { 
      for(var k = 0; k < this.navddm_sub_show.length; k++)
        this.navddm_sub_show[k].show = (i === k) ? !this.navddm_sub_show[k].show : false;
    },
    nuxtlink_onclick: function() {
      for(var k = 0; k < this.navddm_sub_show.length; k++)
        this.navddm_sub_show[k].show = false;
    }
  }
};
</script>