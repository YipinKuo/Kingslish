<template>
<div class="container-xxl pt15">
  <div class="bd-content ps-lg-4">
    <h2>請選擇下列 APPs</h2>
    <div class="bd-example bd-example-row">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-sm-4 col-md-3" v-for="(r) in $menus.filter(x => x.path !== '/')" :key="r.name">
            <router-link class="btn btn-info btn-menu" :to="r.path">{{r.name}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){ 
    return {
    }
  }
}
</script>