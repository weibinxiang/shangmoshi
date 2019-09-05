<template>
  <div>
    <div class="bg">
      <van-icon name="arrow-left" class="back_icon" @click="$router.push({path: '/user'})"></van-icon>
      <img src="../../assets/images/user_bg.png" alt="">
    </div>
    <div class="user_info">
      <div class="tx"><img src="../../assets/images/user_bg.png" alt=""></div>
      <!-- <div class="share">我要推广</div>
      <div class="text">团员<i>小新</i>的分销定单</div> -->
    </div>
    <van-tabs v-model="active" background="#F1F1F1" @change="TagChange" title-inactive-color="#777" title-active-color="#9B6350" color="#9B6350" :line-height="2" :line-width="78" sticky>
      <van-tab v-for="(v, k) in tabList" :key="k" :title="v.title">
        <van-list  v-model="v.loading" :finished="v.finished" finished-text="没有更多订单了" @load="getData">
          <div class="list">
            <div class="item" v-for="(val, key) in v.list" :key="key">
              <div class="head flex-between">
                <p>订单号: <i>{{val.orderno}}</i></p>
                <p v-if="val.orderstatus === 0">待支付</p>
                <p v-if="val.orderstatus === 2">待发货</p>
                <p v-if="val.orderstatus === 3">待收货</p>
                <p v-if="val.orderstatus === 1">已完成</p>
              </div>
              <div class="info flex" v-for="(item, index) in val.orderdetailslist" :key="index">
                <div class="img">
                  <img :src="$imgUrl + item.photopath" alt="">
                </div>
                <div class="right flex_1 flex">
                  <div class="hd flex">
                    <p class="state flex_1">{{item.productname}}</p>
                    <p class="details" v-if="index == 0" @click="$router.push({path: '/order_dt', query: {id: val.id}})">查看详情</p>
                  </div>
                  <div class="con">
                    <p>颜色: {{item.colourname}}</p>
                    <p>数量: {{item.number}}</p>
                    <p>地址：{{val.province}}，{{val.city}}，{{val.town}}，{{val.address}}</p>
                    <p class="flex-between">
                      <i>购买时间：{{val.orderaddtime | date}}</i>
                      <i class="price">￥<span>{{item.totalprice}}</span></i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

 <!-- <option value="0">待审核</option>
    <option value="1">已完成</option>
    <option value="2">待发货</option>
    <option value="3">待收货</option>
    <option value="4">已退货</option>
    <option value="5">已取消</option> -->
    <!-- <option value="0">未支付</option>
    <option value="1">已支付</option>
    <option value="2">退款</option> -->
<script>
import { Tab, Tabs, List } from 'vant';
export default {
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-list': List
  },
  data() {
    return {
      active: 0,
      tabList: [
        {
          title: '全部订单',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          type: -1
        },
        {
          title: '待支付',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          type: 0
        },
        {
          title: '待发货',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          type: 2
        },
        {
          title: '待收货',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          type: 3
        },
        {
          title: '已完成',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          type: 1
        }
      ]
    }
  },
  created() {
    this.active = this.$route.params.type
  },
  methods: {
    getData() {
      let index = this.active
      if (this.$store.state.userInfo == '') {
        this.tabList[index].loading = false
        this.tabList[index].finished = true
        return false
      }
      if (this.tabList[index].finished) return false
      this.tabList[index].loading = true
      let data = {
        orderstatus: this.tabList[index].type,
        PageNumber: this.tabList[index].page,
        paymentstatus: 0,
        Limit: 10
      }
      this.$get('Purchase/EcommerceOrderList', data).then((res) => {
        this.tabList[index].list = this.tabList[index].page == 1 ? res.data.Data : this.tabList[index].list.concat(res.data.Data)
        this.tabList[index].loading = false
        if (res.data.Data.length < 10)  this.tabList[index].finished = true
        this.tabList[index].page = ++this.tabList[index].page
      })
    },
    TagChange() {
      let index = this.active
      this.tabList[index].page = 1
      this.tabList[index].finished = false
      this.getData()
    }
  },
  filters: {
    date(val) {
      console.log(val)
      return val.split('T')[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  img {
    width: 100%;
    height: 300px;
  }
  .back_icon {
    position: fixed;
    left: 30px;
    top: 30px;
    font-size: 40px;
    color: $baseColor;
    z-index: 100
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
  .share {
    color: $baseColor;
    border-bottom: 1px solid $baseColor;
    line-height: 44px;
    display: inline-block;
    margin-top: 30px;
  }
  .text {
    font-size: 30px;
    margin-top: 40px;
    color: #777;
    i {
      color: $baseColor;
    }
  }
}
.list {
  .item {
    padding: 20px 30px;
    border-bottom: 1px solid #f1f1f1;
    .head {
      padding: 20px 0;
      border-bottom: 1px solid #f1f1f1;
      i {
        color: #777;
      }
    }
    .info {
      padding: 30px 0;
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
          justify-content: space-between;
          .state {
            font-size: 30px;
            line-height: 1;
            padding-right: 20px;
          }
          .details {
            color: $baseColor;
            border-bottom: 1px solid $baseColor;
            line-height: 44px;
          }
        }
        .con {
          color: #777;
          font-size: 20px;
          p {
            margin: 6px 0;
            .price {
              color: $baseColor;
              span {
                font-size: 36px;
                font-weight: bold
              }
            }
          }
        }
      }
    }
  }
}
</style>
