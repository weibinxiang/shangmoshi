<template>
  <div id="app">
    <router-view></router-view>
    <van-loading color="white" v-show="$store.state.loading"/>
    <van-popup v-model="$store.state.loginShow" position="bottom" class="popup">
      <login></login>
    </van-popup>
  </div>
</template>

<script>
import { Loading, Popup } from 'vant';
import login from './components/login'
export default {
  name: 'App',
  components: {
    'van-loading': Loading,
    'van-popup': Popup,
    'login': login
  },
  data() {
    return {
     
    }
  },
  created() {
    // console.log(this.$store.state.loading)
  }
}
</script>

<style>
@import './assets/css/index.css';
/* @import './assets/css/main.scss'; */
</style>

<style lang="scss" scoped>
.popup {
  height: 100vh;
}

</style>

