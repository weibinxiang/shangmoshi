<template>
  <div>
    <div class="bg"><img src="../../assets/images/user_bg.png" alt=""></div>
    <div class="user_info">
      <div class="tx"><img src="../../assets/images/user_bg.png" alt=""></div>
    </div>
    <div class="list flex">
      <div class="item" v-for="(item, index) in 10" :key="index">
        <img src="../../assets/images/index.jpg" alt="">
        <p class="name">MICHEAL</p>
        <p class="state">今天才来过呢</p>
        <p class="btn">查看订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="scss">
.bg {
  img {
    width: 100%;
    height: 300px;
  }
}

.user_info {
  position: relative;
  text-align: center;
  padding: 50px 0;
  .tx {
    width: 124px;
    height: 124px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    img {
      width: 124px;
      height: 124px;
      border-radius: 50%;
    }
  }
}

.list {
  flex-wrap: wrap;
  .item {
    width: 25%;
    text-align: center;
    margin: 30px 0;
    border-right: 1px solid #f1f1f1;
    box-sizing: border-box;
    &:nth-child(4n) {
      border-right: 0;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .name {
      color: #474747;
      font-size: 24px;
    }
    .state {
      color: #777777;
      margin: 6px 0 10px;
      font-size: 16px;
    }
    .btn {
      color: $baseColor;
      border-bottom: 1px solid $baseColor;
      display: inline-block;
      line-height: 44px;
    }
  }
}
</style>
