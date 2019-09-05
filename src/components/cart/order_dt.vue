<template>
  <div class="order_dt">
    <headers :title="'订单详情'"></headers>
    <div class="info">
      <div class="item flex">
        <div class="title">寄出信息：</div>
        <div class="text">{{'暂无'}}</div>
      </div>
      <div class="item flex">
        <div class="title">服务订单号：</div>
        <div class="text">{{'暂无'}}</div>
      </div>
      <div class="item flex">
        <div class="title">购买时间：</div>
        <div class="text">{{data.orderaddtime | date}}</div>
      </div>
    </div>

    <div class="info">
      <div class="item flex-between">
        <div class="title">配送信息</div>
        <img src="../../assets/images/kd.png" alt="">
      </div>
      <div class="item flex">
        <div class="title">快递单号：</div>
        <div class="text">{{'暂无'}}</div>
      </div>
      <div class="item flex">
        <div class="title">快递公司：</div>
        <div class="text">{{'暂无'}}</div>
      </div>
      <div class="item flex">
        <div class="title">电话：</div>
        <div class="text">{{data.phone}}</div>
      </div>
      <div class="item flex">
        <div class="title">收件人：</div>
        <div class="text">{{data.consigneename}}</div>
      </div>
      <div class="item flex">
        <div class="title">收货地址：</div>
        <div class="text">{{data.province}}，{{data.city}}，{{data.town}}，{{data.address}}</div>
      </div>
    </div>

    <div class="step" v-if="false">
      <div class="item flex" v-for="(item, index) in 5" :key="index" :class="index < 3 ? 'active' : ''">
        <div class="time">
          <p class="big">07.08</p>
          <p class="small">15:45</p>
        </div>

        <div class="line">
          <div class="l" :class="index < 2 ? 'line_active' : ''"></div>
          <div class="circle flex-center"><img src="../../assets/images/checked.png" alt="" v-if="index < 3"></div>
        </div>

        <div class="right flex_1">
          <p class="title">已签收</p>
          <p class="text">[自提柜]已签收，签收人凭取货码签收。感谢使用数字半岛花园丰巢[自提柜]，期待再次为您服务。</p>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="item flex" v-for="(item, index) in data.orderdetailslist" :key="index">
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

    <div class="fix flex-between">
      <p class="num">数量 {{data.orderdetailslist.length}}</p>
      <p class="price"><span v-if="data.preferentialamount">(已优惠{{data.preferentialamount}}元)</span><i>￥</i>{{data.totalamount}}</p>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  components: {
    'van-icon': Icon
  },
  data() {
    return {
      data: {
        orderdetailslist: []
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$get('Purchase/EcommerceOrderDetails', {orderid: this.$route.query.id}).then((res) => {
        this.data = res.data
      })
    }
  },
  filters: {
    date(val) {
      if (!val) return false
      let v = val.split('T')
      return v[0] + ' ' + v[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.order_dt {
  padding-top: 90px;
  padding-bottom: 100px;
}

.info {
  padding: 30px;
  font-size: 30px;
  border-bottom: 1px solid #f1f1f1;
  .item {
    line-height: 54px;
    img {
      width: 78px;
    }
    .title {
      color: #1B1B1B;
      width: 180px;
      text-align: right;
    }
    .text {
      color: #777;
      flex: 1;
      padding-left: 10px;
    }
  }
  .flex-between {
    .title {
      text-align: center;
    }
  }
}

.list {
  padding: 0 30px;
  .item {
    padding: 50px 0;
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

.step {
  padding: 30px;
  border-bottom: 1px solid #f1f1f1;
  .item {
    .time {
      padding: 30px 0;
      text-align: right;
      line-height: 1;
      .small {
        color: #777;
        margin-top: 6px;
        font-size: 18px;
      }
    }
    .line {
      margin: 0 40px;
      position: relative;
      .l {
        width: 2px;
        background: #C6C6C6;
        height: 100%;
        margin-top: 30px;
      }
      .line_active {
        background: $baseColor;
      }
      .circle {
        position: absolute;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #777;
        top: 28px;
        left: 50%;
        transform: translateX(-50%);
        img {
          width: 36px;
          height: 36px;
        }
      }
    }
    .right {
      padding: 30px 0;
      color: #777;
      overflow: hidden;
      .title {
        font-size: 30px;
        margin-bottom: 18px;
        line-height: 1;
      }
      .text {
        line-height: 40px;
      }
    }
    &:last-child {
      .line {
        .l {
          background: #fff;
        }
      }
    }
    &.active {
      .line {
        .circle {
          background: $baseColor;
        }
      }
      .right {
        .title {
          color: #1b1b1b;
        }
      }
    }
  }
}

.fix {
  width: 100%;
  position: fixed;
  height: 80px;
  bottom: 0;
  left: 0;
  background: #F1F1F1;
  box-sizing: border-box;
  padding: 0 30px;
  font-size: 30px;
  font-weight: bold;
  .num {
    color: #000;
  }
  .price {
    color: $baseColor;
    font-size: 36px;
    span {
      font-size: 18px;
      color: #777;
    }
    i {
      font-size: 18px;
    }
  }
}
</style>
