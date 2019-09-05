<template>
  <div class="group" style="padding-top: 40px;">
    <headers :title="'商品详情'"></headers>
    <van-swipe :autoplay="8000" indicator-color="#fff" class="swipe" ref="swipe">      
      <van-swipe-item v-for="(item,index) in data.colourList" :key="index"><img :src="$imgUrl + item.photopath" alt=""></van-swipe-item>
    </van-swipe>

    <div class="block flex-center">
      <div class="left flex_1">
        <span class="price"><i>￥</i>300</span>
        <span class="old">初始价<i>￥900</i></span>
      </div>
      <div class="right flex_1">
        <p class="title">抢购剩余时间</p>
        <p class="time">58:50:50</p>
      </div>
    </div>

    <div class="info">
      <div class="head flex-between">
        <p class="title">{{data.productname}}</p>
        <div class="right">
          <img src="../../assets/images/group_ic.png" alt="">
          <p>加入购物车</p>
        </div>
      </div>

      <div class="select">
        <div class="wrap s_color overflow flex-center-y">
          <div class="overflow flex-center-y">
            <div class="item" v-for="(item, index) in data.colourList" :key="index" :class="submit.colourid==item.id ? 'active' : ''" @click="getSize(item, index)">
              <img :src="$imgUrl + item.photopath" alt="">
            </div>
          </div>
        </div>

        <div class="wrap s_color overflow flex-center-y">
          <div class="overflow flex-center-y">
            <div class="item flex-center" v-for="(item, index) in data.specifiList" :key="index" 
              :class="{'active': submit.specificaID == item.id, 'gray': sizeList.indexOf(item.id) == -1 }" @click="setSize(item)">{{item.name}}</div>
          </div>
        </div>

        <div class="wrap number flex-between">
          <p>数量</p>
          <van-stepper v-model="submit.number" :max="salesVolume"></van-stepper>
        </div>
      </div> 
    </div>

    <div class="more flex-center-y">
      <div class="text flex_1">35人正在拼团，可直接参与</div>
      <div class="button">立即参与</div>
    </div>

    <div class="list flex-between">
      <div class="item" v-for="(item, index) in 6" :key="index">
        <div class="con">
          <img src="../../assets/images/index.jpg" alt="">
          <p class="name ellipsis">夜莺的歌声</p>
          <p class="people">还差1人成团</p>
        </div>
        <div class="btn">去拼团</div>
      </div>
    </div>

    <div class="iduce" v-html="data.productinfo">
      <img src="../../assets/images/index.jpg" alt="">
    </div>

    <div class="hand flex-center">
      <div>成分和保养</div>
      <div>查找我的尺码</div>
      <div>寄送</div>
      <div>退货和换货</div>
      <p>页面显示的被划去价格可能是商品的吊牌价<br/>零售价或曾经展示过的销售价等</p>
    </div>

    <div class="sumbit flex-between">
      <div class="left flex_1 flex-between">
        <router-link to="/" class="item">
          <img src="../../assets/images/tabber1.png" alt="">
          <p>产品</p>
        </router-link>
        <router-link to="/cart" class="item">
          <img src="../../assets/images/tabber2.png" alt="">
          <p>购物袋</p>
        </router-link>
        <div class="item">
          <img src="../../assets/images/tabber3.png" alt="">
          <p>客服</p>
        </div>
      </div>
      <div class="right flex">
        <div class="button one flex-center">
          <p class="price"><i>￥</i>1,200</p>
          <p class="text">单独购买</p>
        </div>
        <div class="button more flex-center">
          <p class="price"><i>￥</i>1,200</p>
          <p class="text">拼团购买</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Stepper } from 'vant';
import MixinGoods from '../../mixins/MixinGoods'

export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-stepper': Stepper
  },
  mixins: [MixinGoods],
  data() {
    return {
      color: 0,
      number: 0,
      groupData: {}
    }
  },
  created() {
    this.getGroup()
  },
  methods: {
    getGroup() {
      let data = {
        id: this.$route.query.sid
      }
      this.$get('Activity/GetActivityDetail', data).then((res) => {
        this.groupData = res.data
        this.getData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  padding-bottom: 100px;
}
.swipe {
  img {
    display: block;
    width: 100%;
  }
}
.block {
  background: #F1F1F1;
  padding: 30px;
  .left {
    border-right: 1px solid #E2E2E2;
    .price {
      color: $baseColor;
      font-size: 72px;
      i {
        font-size: 36px;
      }
    }
    .old {
      color: #777;
      i {
        text-decoration: line-through
      }
    }
  }
  .right {
    text-align: center;
    .title {
      font-size: 30px;
      margin-bottom: 6px;
    }
    .time {
      font-size: 45px;
    }
  }
}
.info {
  padding: 0 30px;
  .head {
    padding: 30px 0;
    border-bottom: 1px solid #F1F1F1;
    .title {
      font-size: 36px;
    }
    .right {
      color: #919191;
      text-align: center;
      img {
        width: 44px;
      }
    }
  }
  .select {
    overflow: hidden;
    text-align: center;
    padding: 30px 0;
    .wrap {
      border: 1px solid #f1f1f1;
      height: 80px;
      padding: 0 10px;
      margin: 20px 0;
    }
    .s_color {
      overflow-x: auto;
      .overflow {
        width: max-content;
        height: 80px;
      }
      .item {
        width: 60px;
        height: 60px;
        margin: 0 10px;
        font-size: 32px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .active {
        border: 2px solid $baseColor;
      }
      .gray {
        color: #ababab;
      }
    }
    .number {
      padding: 0 4px 0 20px;
      font-size: 20px;
    }
  }
}
.more {
  height: 80px;
  background: #F1F1F1;
  .text {
    padding: 0 30px;
  }
  .button {
    width: 265px;
    text-align: center;
    background: $baseColor;
    color: #fff;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
  }
}
.list {
  padding: 30px;
  flex-wrap: wrap;
  .item {
    width: 32.3%;
    font-size: 20px;
    text-align: center;
    background: #f1f1f1;
    margin-bottom: 20px;
    .con {
      padding: 24px 0;
      .name {
        margin: 10px 0;
      }
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .name {
      color: #777;
    }
    .btn {
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      background: $baseColor;
      color: #fff;
    }
  }
}
.iduce {
  img {
    width: 100%;
  }
}
.hand {
  padding: 30px;
  flex-direction: column;
  text-align: center;
  div {
    font-size: 28px;
    line-height: 60px;
    border-bottom: 1px solid #000;
    margin: 14px 0;
  }
  p {
    color: #777;
    line-height: 48px;
    margin: 60px 0 30px;
    font-size: 20px
  }
}
.sumbit {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  .left {
    font-size: 20px;
    color: #919191;
    text-align: center;
    padding: 0 40px;
    img {
      width: 32px;
    }
  }
  .right {
    .button {
      width: 210px;
      height: 100px;
      flex-direction: column;
      color: #fff;
      .text {
        font-size: 30px;
        margin-top: 4px;
      }
    }
    .one {
      background: #777777;
    }
    .more {
      background: $baseColor;
    }
  }
}
</style>

<style lang="scss">
.iduce {
  img {
    width: 100%;
    display: block;
  }
}
</style>
