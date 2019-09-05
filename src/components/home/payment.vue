<template>
  <div>
    <headers :title="'支付'"></headers>
    <div class="containers">
      <div class="block">
        <div class="head flex-between">
          <p>标准上门邮寄</p>
          <p>￥ 0</p>
        </div>
        <div class="info flex-center-y" @click="$router.push({path: '/ads_select', query: $route.query})">
          <div class="left flex_1" v-if="address.addressid != 0">
            <div class="i_warp flex-between">
              <div class="name">{{address.name}}</div>
              <p class="tel">{{address.mobilephone}}</p>
            </div>
            <p class="text">{{address.province}}，{{address.city}}，{{address.town}}，{{address.detail}}</p>
          </div>
          <div class="left flex_1" v-else>
            <p class="noAddress">暂无默认地址</p>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="line"></div>

      <div class="wrap">
        <div class="head flex-between">
          <p>商品金额</p>
          <p class="price">￥ {{data.totalprice}}</p>
        </div>
        <div class="list">
          <div class="item flex" v-for="(item, index) in data.orderlist" :key="index">
            <div class="img">
              <img :src="$imgUrl + item.photopath" alt="">
            </div>
            <div class="right flex_1 flex">
              <div class="hd flex-between">{{item.productname}}</div>
              <div class="con flex">
                <div>
                  <p>编号：{{item.productno}}</p>
                  <p>颜色：{{item.colourname}}</p>
                  <p>尺码：{{item.specifiname}} </p>
                  <p>数量：{{item.number}}</p>
                </div>
                <div class="price">￥<span>{{item.price}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>

      <div class="block2">
        <div class="cell flex-between">
          <p class="title">优惠劵</p>
          <p class="text flex-center-y" @click="couponShow=true">
            <span>{{coupon == '' ? '选择优惠劵' : '已减'+coupon.money}}</span>
            <van-icon name="arrow" class="arrow" />
          </p>
        </div>
        <!-- <div class="cell flex-between">
          <p class="title">使用余额 2000元</p>
          <p class="text flex-center-y">
            <van-switch v-model="user_money" size="20px" active-color="#9B6350" inactive-color="#f1f1f1"/>
          </p>
        </div> -->
        <div class="summarize">
          <div class="item flex-between">
            <p class="title">商品金额（共 {{data.orderlist.length}} 件商品）</p>
            <p class="price">￥ {{data.totalprice}}</p>
          </div>
          <div class="item flex-between">
            <p class="title">运费</p>
            <p class="price">+￥ 0</p>
          </div>
          <div class="item flex-between">
            <p class="title">优惠券</p>
            <p class="price">-￥ {{coupon == '' ? 0 : coupon.money}}</p>
          </div>
          <!-- <div class="item flex-between">
            <p class="title">余额</p>
            <p class="price">-￥ 2000</p>
          </div> -->
          <div class="item total flex-between">
            <p class="title">总计</p>
            <p class="price">￥ {{total}}</p>
          </div>
        </div>
      </div>

      <div class="button flex-center" @click="submit">授权付款</div>

      <!--优惠劵-->
      <van-popup position="bottom" v-model="couponShow">
        <div class="coupon">
          <van-icon name="cross" class="icon" @click="couponShow = false"></van-icon>
          <div class="item flex-center-y" v-for="(item, index) in data.couponmodel" :key="index">
            <div class="left flex_1">
              <p class="title">{{item.name}}</p>
              <p class="text">满 <i>{{item.fullmoney}}</i> 减 <i>{{item.money}}</i></p>
            </div>
            <div class="btn flex-center" @click="useCoupon(item)">使用</div>
          </div>
          
          <div class="noCoupon" v-if="!data.couponmodel.length">
            <p>暂无可用优惠劵</p>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Icon, Switch, Popup, Toast } from 'vant';
export default {
  name: 'payment',
  components: {
    'van-icon': Icon,
    "van-switch": Switch,
    "van-popup": Popup
  },
  data() {
    return {
      user_money: '',
      data: {
        orderlist: [],
        couponmodel: [],
        totalprice: 0
      },
      address: {},
      coupon: '',
      couponShow: false
    }
  },
  created() {
    let data = {}
    if (this.$route.query.status == 1) {
      data = this.$route.query
      this.getData(data)
    } else if (this.$route.query.status == 2) {
      data = {
        cartlist: this.$route.query.id
      }
      this.getData(data)
    }
  },
  methods: {
    getData(data) {
      this.$post('Purchase/PaymentPageList', data).then((res) => {
        this.address = this.$route.query.address ? JSON.parse(this.$route.query.address) : res.data.address
        this.data = res.data
      })
    },
    // 使用优惠劵
    useCoupon(item) {
      this.coupon = item
      this.couponShow = false
    },
    // 确认
    submit() {
      if (!this.address.addressid) {this.$toast('请选择收货地址'); return false;}
      let data = {
        couponid: this.coupon == '' ? 0 : this.coupon.couponid,
        addressid: this.address.addressid
      }
      if (this.$route.query.status == 1) {
        data['status'] = 1
        data['productid'] = this.$route.query.productid
        data['sku'] = this.$route.query.sku
        data['number'] = this.$route.query.number
      } else if (this.$route.query.status == 2) {
        data['cartlist'] = this.$route.query.id
      }
      this.$post('Purchase/PaymentPageOrder', data).then((res) => {
        Toast('成功下单')
        this.$router.push({path: '/order/1'})
      })
    }
  },
  computed: {
    total() {
      let total = 0
      let coupon = this.coupon == '' ? 0 : this.coupon.money
      return this.data.totalprice - coupon
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  padding: 0 30px;
  .head {
    height: 80px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 30px;
  }
  .info {
    padding: 30px 0;
    border-bottom: 1px solid #f1f1f1;
    .left {
      padding-right: 30px;
    }
    .i_warp {
      font-size: 30px;
      margin-bottom: 20px;
    }
    .text {
      color: #777;
    }
  }
}
.line {
  height: 10px;
  background: #F4F4F4;
}
.wrap {
  .head {
    height: 90px;
    border-bottom: 1px solid #f1f1f1;
    font-size: 30px;
    padding: 0 30px;
    .price {
      color: $baseColor;
    }
  }
  .list {
    padding: 0 30px;
    .item {
      padding: 30px 0;
      border-bottom: 1px solid #f1f1f1;
      .img {
        img {
          width: 200px;
        }
      }
      .right {
        padding-left: 30px;
        flex-direction: column;
        justify-content: space-between;
        .hd {
          font-size: 30px;
          line-height: 1;
        }
        .con {
          color: #777;
          font-size: 20px;
          justify-content: space-between;
          align-items: flex-end;
          p {
            margin: 6px 0;
          }
          .price {
            color: $baseColor;
            span {
              font-size: 36px;
            }
          }
        }
      }
    }
  }
}
.block2 {
  .cell {
    height: 80px;
    border-bottom: 1px solid #f1f1f1;
    padding: 0 30px;
    .title {
      font-size: 28px;
    }
    .text {
      color: #777;
      .arrow {
        margin-left: 10px;
      }
    }
  }
  .summarize {
    padding: 20px 30px;
    .item {
      margin: 10px 0;
      .price {
        color: $baseColor;
      }
    }
    .total {
      font-size: 30px;
      margin-top: 30px;
    }
  }
}
.button {
  margin: 30px 30px 80px;
  background: $baseColor;
  height: 80px;
  color: #fff;
  font-size: 30px;
}
.coupon {
  padding: 40px 30px 20px 30px;
  height: 50vh;
  position: relative;
  .icon {
    font-size: 40px;
    position: absolute;
    top: 16px;
    right: 20px;
    color: #777;
  }
  .item {
    border-bottom: 1px solid #f1f1f1;
    padding: 30px 0;
    &:last-child {
      border-bottom: 0;
    }
    .title {
      font-size: 30px;
    }
    .text {
      color: #777;
    }
    i {
      color: $baseColor;
    }
    .btn {
      width: 110px;
      height: 44px;
      color: #fff;
      background: $baseColor;
      border-radius: 30px;
    }
  }
}
.noCoupon {
  text-align: center;
  margin: 80px 0;
}
</style>
