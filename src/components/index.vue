<template>
  <div class="container">
     <router-view/>
     <div class="tabbar flex">
      <router-link to="/home" class="item flex_1 flex-center" :class="$route.path == '/home' ? 'active' : ''">
        <img src="../assets/images/tabber1.png" alt="" v-if="$route.path !== '/home'">
        <img src="../assets/images/tabber_ic1.png" alt="" v-else>
        <p>首页</p>
      </router-link>
      <router-link to="/classify" class="item flex_1 flex-center"  :class="$route.path == '/classify' ? 'active' : ''">
        <img src="../assets/images/tabber5.png" alt="" v-if="$route.path !== '/classify'">
        <img src="../assets/images/tabber_ic5.png" alt="" v-else>
        <p>分类</p>
      </router-link>
      <router-link to="/cart" class="item flex_1 flex-center" :class="$route.path == '/cart' ? 'active' : ''">
        <img src="../assets/images/tabber2.png" alt="" v-if="$route.path !== '/cart'">
        <img src="../assets/images/tabber_ic2.png" alt="" v-else>
        <p>购物袋</p>
       </router-link>
      <div class="item flex_1 flex-center">
         <!-- <img src="../assets/images/tabber3.png" alt="" v-if="$route.path !== '/cart'">
         <img src="../assets/images/tabber_ic3.png" alt="" v-else> -->
         <img src="../assets/images/tabber3.png" alt="">
         <p>客服</p>
       </div>
      <router-link to="/user" class="item flex_1 flex-center" :class="$route.path == '/user' ? 'active' : ''">
        <img src="../assets/images/tabber4.png" alt="" v-if="$route.path !== '/user'">
        <img src="../assets/images/tabber_ic4.png" alt="" v-else>
        <p>我</p>
       </router-link>
     </div>
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 110px;
}
.tabbar {
  position: fixed;
  bottom: 0;
  width: 100%; 
  background: #1b1b1b;
  color: #929292;
  height: 100px;
  left: 0;
  font-size: 20px;
  .active {
    color: $baseColor;
  }
  .item {
    flex-direction: column;
    img {
      width: 32px;
      margin-bottom: 6px;
    }
  }
}
</style>

