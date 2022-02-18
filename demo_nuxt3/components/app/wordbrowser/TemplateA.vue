<template>
<div class="container-xxl">
  <div class="bd-content ps-lg-4">
  <header class="py-3 mb-3 border-bottom">
    <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
      <div class="dropdown">
        <a @click="ddm_onclick()" class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle" id="dropdownNavLink" data-bs-toggle="dropdown" aria-expanded="false"> 單字瀏覽 </a>
        <ul class="dropdown-menu text-small shadow" v-bind:class="{ show: ddm_sub_show }" aria-labelledby="dropdownNavLink">
          <li><a class="dropdown-item" v-bind:class="{ active: ddm_index === 0 }" @click="ddm_sub_onclick(0)">全部</a></li>
          <li><a class="dropdown-item" v-bind:class="{ active: ddm_index === 1 }" @click="ddm_sub_onclick(1)">字首</a></li>
          <li><a class="dropdown-item" v-bind:class="{ active: ddm_index === 2 }" @click="ddm_sub_onclick(2)">字根</a></li>
          <li><a class="dropdown-item" v-bind:class="{ active: ddm_index === 3 }" @click="ddm_sub_onclick(3)">字尾</a></li>
        </ul>
      </div>

      <div class="d-flex align-items-center">
        <form class="w-100 me-3">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
        </form>
      </div>
    </div>
  </header>
  
  <div class="container-fluid pb-3">
    <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
      <div class="bg-light border rounded-3">
        <br><br><br><br><br><br><br><br><br><br>
      </div>
      <div class="bg-light border rounded-3">
        <br><br><br><br><br><br><br><br><br><br>
      </div>
    </div>
  </div>
  
  </div>
</div>
</template>

<script>
var ddm_sub_show = false;
var ddm_index = 0;
export default {
  data(){ 
    return {
      ddm_sub_show,
      ddm_index
    }
  },
  methods: {
    ddm_onclick: function() {
      this.ddm_sub_show = !this.ddm_sub_show;
    },    
    ddm_sub_onclick: function(i) {
      this.ddm_index = i;
      this.ddm_sub_show = false;
    }
  },
  async asyncData(context) {
    const mb = await context.$axios.$get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    console.log(mb);
    return { mb };
  }
}
</script>>