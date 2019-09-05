<template>
  <div>
    <div class="search_wrap flex-between">
      <div class="search flex_1 flex-center">
        <img src="../../assets/images/search_ic.png" alt="">
        <input type="text" placeholder="搜索感兴趣产品" class="flex_1" @focus="$router.push({path: '/search'})">
      </div>
      <img :src="$imgUrl + logo" alt="" :onerror="logoUrl" class="logo_img">
    </div>
    <div class="wrap flex">
      <div class="left flex">
        <div class="item" @click="active = 0" :class="{'active': active == 0}">推荐</div>
        <div class="item" @click="active = 1" :class="{'active': active == 1}">外套</div>
        <div class="item" @click="active = 2" :class="{'active': active == 2}">裙子</div>
        <div class="item" @click="active = 3" :class="{'active': active == 3}">毛衫</div>
        <div class="item" @click="active = 4" :class="{'active': active == 4}">围巾</div>
      </div>
      <div class="right flex_1 flex">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <img src="../../assets/images/index2.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinLogo from '../../mixins/MixinLogo.js'
export default {
  mixins: [MixinLogo],
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.search_wrap {
  position: fixed;
  z-index: 10;
  height: 90px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  .logo_img {
    width: 200px;
  }
  .search {
    img {
      width: 56px;
    }
  }
}
.wrap {
  align-items: flex-start;
  .left {
    width: 160px;
    box-sizing: border-box;
    padding: 100px 20px 100px 20px;
    flex-direction: column;
    align-items: flex-start;
    background: #f7f7f7;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    .item {
      margin: 15px 0;
      font-size: 30px;
    }
    .active {
      font-size: 36px;
      border-bottom: 1px solid $baseColor;
      color: $baseColor;
    }
  }
  .right {
    flex-wrap: wrap;
    padding: 90px 10px 0 170px;
    justify-content: space-between;
    .item {
      width: 49%;
      margin-top: 1%;
      text-align: center;
      img {
        width: 100%;
      }
      p {
        margin: 10px 0;
        font-size: 30px;
        line-height: 1;
      }
      .name {
        color: #303030;
      }
      .price {
        color: $baseColor;
        font-weight: bold;
        font-size: 32px;
        i {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

