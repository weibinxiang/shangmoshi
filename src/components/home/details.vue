<template>
  <div>
    <headers :title="'商品详情'"></headers>
    <div class="containers">
      <div class="iduce" v-html="data.productinfo">
        <!-- <img src="../../assets/images/index.jpg" alt="" > -->
      </div>

      <div class="hand flex-center">
        <div @click="info">成分和保养</div>
        <div @click="rules('CM')">查找我的尺码</div>
        <div @click="rules('JS')">寄送</div>
        <div @click="rules('TH')">退货和换货</div>
        <p>页面显示的被划去价格可能是商品的吊牌价<br/>零售价或曾经展示过的销售价等</p>
      </div>

      <div class="info">
        <p>{{data.productname}}</p>
        <p class="price"><i>￥</i>{{data.price}}</p>
      </div>

      <van-swipe indicator-color="#777" class="swipe" ref="swipe">      
        <van-swipe-item v-for="(item, index) in data.colourList" :key="index"><img :src="$imgUrl + item.photopath" alt=""></van-swipe-item>
      </van-swipe>

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

        <p class="cm">尺码表</p>
      </div> 

      <div class="button flex-center">
        <div class="confirm" @click="addCart">加入购物车</div>
        <div class="cancel" @click="buy">立即购买</div>
      </div>
    </div>

    <van-popup v-model="ruleShow" position="bottom" class="popup">
      <div class="rule" v-html="rule"></div>
    </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Stepper, Toast, Popup } from 'vant';
import MixinGoods from '../../mixins/MixinGoods'
import MixinRule from '../../mixins/MixinRule'
export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
    'van-stepper': Stepper,
    'van-popup': Popup
  },
  mixins: [MixinGoods, MixinRule],
  data() {
    return {
    }
  },
  created() {
    this.getData()
  },
  methods: {
    buy() {
      // let data = Object.assign(this.submit, {
      //   productID: this.$route.query.id
      // })
      if (this.$store.state.userInfo == '') {
        this.$toast('请先登录')
        this.$store.state.loginShow = true
        return false
      }
      this.$router.push({path: '/payment', query: {status: 1, productid: this.$route.query.id, sku: this.submit.sku, number: this.submit.number}})
      // this.$post('Purchase/BuyImmediatelyOrder', data).then((res) => {
      //   this.$router.push({path: '/payment', query: {id: res.data.orderId}})
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.info {
  margin: 0 30px;
  padding: 60px 0;
  text-align: center;
  font-size: 36px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .price {
    margin-top: 20px;
    color: $baseColor;
    i {
      font-size: 18px;
    }
  }
}
.swipe {
  text-align: center;
  padding: 60px 0;
  img {
    width: 80%;
  }
}
.select {
  width: 450px;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
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
  .cm {
    display: inline-block;
    color: #777;
    border-bottom: 1px solid #333;
    font-size: 20px;
    line-height: 44px;
  }
}
.button {
  margin: 100px 0;
  div {
    width: 330px;
    height: 80px;
    line-height: 80px;
    margin: 0 20px;
    text-align: center;
    font-size: 32px;
  }
  .confirm {
    background: $baseColor;
    color: #fff;
  }
  .cancel {
    border: 1px solid $baseColor;
    color: $baseColor;
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


