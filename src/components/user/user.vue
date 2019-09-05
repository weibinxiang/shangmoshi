<template>
  <div class="user">
    <!-- <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx43005891378d9727&redirect_uri=http://api.maxsull.com&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect">452542554</a> -->
    <div class="bg"><img src="../../assets/images/user_bg.png" alt=""></div>
    <div class="user_info">
      <div class="tx" @click="$router.push({path: '/member'})"><img src="../../assets/images/user_bg.png" alt=""></div>
      <p class="name" @click="judge()">{{$store.state.userInfo == '' ? '未登录' : $store.state.userInfo.Name }}</p>
      <div class="member flex-center" v-if="$store.state.userInfo != ''">
        <img src="../../assets/images/menber_ic.png" alt="">
        <p>{{$store.state.userInfo.AccountLevel == '无等级' ? '普通会员' : $store.state.userInfo.AccountLevel}}</p>
      </div>
    </div>

    <div class="property flex">
      <div class="item flex_1 flex-between">
        <img src="../../assets/images/wallet_ic.png" alt="">
        <p class="text">我的钱包</p>
      </div>
      <div class="item flex_1 flex-between">
        <p class="num">123</p>
        <p class="text">积分</p>
      </div>
      <div class="item flex_1 flex-between">
        <p class="num"><i>￥</i>1,078</p>
        <p class="text">余额</p>
      </div>
    </div>

    <div class="order">
      <h2>我的订单</h2>
      <div class="list flex-between">
        <router-link to="/order/1" class="item">
          <img src="../../assets/images/oreder1.png" alt="">
          <div class="title">待付款</div>
        </router-link>
        <router-link to="/order/2" class="item">
          <img src="../../assets/images/oreder2.png" alt="">
          <div class="title">待发货</div>
        </router-link>
        <router-link to="/order/3" class="item">
          <img src="../../assets/images/oreder3.png" alt="">
          <div class="title">待收货</div>
        </router-link>
        <!-- <router-link to="/order" class="item flex_1">
          <img src="../../assets/images/oreder4.png" alt="">
          <div class="title">已完成</div>
        </router-link> -->
        <router-link to="/order/4" class="item">
          <img src="../../assets/images/oreder5.png" alt="">
          <div class="title">退款/售后</div>
        </router-link>
      </div>
    </div>

    <div class="column flex">
      <router-link to="/activity" class="item">
        <img src="../../assets/images/column6.png" alt="">
        <p class="title">秒杀</p>
      </router-link>
      <router-link to="/groupBooking" class="item">
        <img src="../../assets/images/column5.png" alt="">
        <p class="title">我的拼团</p>
      </router-link>
      <div class="item">
        <img src="../../assets/images/column3.png" alt="">
        <p class="title">我要推广</p>
      </div>
      <router-link to="/coupon" class="item">
        <img src="../../assets/images/column2.png" alt="">
        <p class="title">我的优惠券</p>
      </router-link>
      <router-link to="/address" class="item">
        <img src="../../assets/images/column4.png" alt="">
        <p class="title">收货地址</p>
      </router-link>
       <div class="item" @click="clear">
        <img src="../../assets/images/column1.png" alt="">
        <p class="title">清除缓存</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    judge() {
      if (this.$store.state.userInfo == '') {
        // this.$router.push({path: '/login'})
        this.$store.state.loginShow = true
      }
    },
    clear() {
      this.$store.commit('userUpdate', '')
      this.$toast('清除成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding-bottom: 30px
}
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
  .name {
    font-size: 32px;
    font-weight: 500;
    margin-top: 36px;
  }
  .member {
    display: inline-block;
    width: 160px;
    font-size: 20px;
    color: #777;
    background: #F1F1F1;
    border-radius: 0px 12px 12px 0px;
    position: relative;
    margin-top: 10px;
    height: 30px;
    img {
      width: 30px;
      height: 30px;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(-50%)
    }
  }
}

.property {
  border-top: 1px solid #F1F1F1;
  border-bottom: 1px solid #F1F1F1;
  padding: 30px 0;
  .item {
    text-align: center;
    border-right: 1px solid #f1f1f1;
    flex-direction: column;
    font-size: 24px;
    color: #777;
    img {
      width: 55px;
      height: 43px;
      margin-bottom: 20px;
    }
    .num {
      font-size: 48px;
      color: $baseColor;
      i {
        font-size: 24px;
      }
    }
  }
}

.order {
  padding: 0 30px;
  margin-top: 10px;
  h2 {
    font-size: 30px;
    color: #1B1B1B;
    font-weight: 500;
    padding: 30px 0;
  }
  .list {
    padding: 30px 0;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
    color: #777;
    .item {
      text-align: center;
      width: 25%;
      img {
        width: 48px;
        margin-bottom: 6px;
      }
    }
  }
}

.column {
  flex-wrap: wrap;
  color: #777;
  padding: 0 30px;
  .item {
    width: 25%;
    text-align: center;
    margin-top: 30px;
    img {
      width: 48px;
    }
  }
}
</style>

