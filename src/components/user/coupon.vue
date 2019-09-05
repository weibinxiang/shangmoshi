<template>
  <div>
    <headers :title="'优惠劵'"></headers>
    <div class="containers">
      <van-tabs v-model="active" @change="TagChange" title-inactive-color="#777" title-active-color="#9B6350" color="#9B6350" :line-height="2" :line-width="180" sticky :offset-top="40">
        <van-tab v-for="(val, key) in tabList" :key="key" :title="val.title">
          <van-list v-model="val.loading" :finished="val.finished" @load="getData">
            <div class="list">
              <div class="item flex" v-for="(item, index) in val.list" :key="index">
                <div class="left">
                  <img src="../../assets/images/coupon.png" alt="" class="img" v-if="item.Money < 100 ">
                  <img src="../../assets/images/coupon2.png" alt="" class="img" v-else-if="item.Money >= 100 && item.Money <= 200">
                  <img src="../../assets/images/coupon3.png" alt="" class="img" v-else-if="item.Money > 200">
                  <div v-else></div>
                </div>
                <div class="right flex-between" :class="{'active':item.Money < 100, 'active2':item.Money >= 100 && item.Money <= 200, 'active3': item.Money > 200 }">
                  <div class="discounts">
                    <p>￥<i>{{item.Money}}</i></p>
                    <p>满 {{item.FullMoney}} 减 {{item.Money}}</p>
                  </div>
                  <div class="btn" v-if="active == 0" @click="$router.push({path: '/'})">去使用</div>
                  <div class="btn" @click="getCoupon(item.ID)" v-else>领取</div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

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
          title: '选择优惠券',
          loading: false,
          page: 1,
          finished: false,
          list: []
        },
        {
          title: '可领取优惠券',
          loading: false,
          page: 1,
          finished: false,
          list: []
        },
      ]
    }
  },
  methods: {
    getData() {
      let index = this.active
      if (this.tabList[index].finished) return false
      this.tabList[index].loading = true
      let api = ''
      index == 0 ? api = 'Address/GetCouponList' : api = 'Address/GetCouponableList'
      let data = {
        Sort: 'ID',
        Order: 'asc',
        PageNumber: this.tabList[index].page,
        Limit: 10
      }
      this.$post(api, data).then((res) => {
        this.tabList[index].list = this.tabList[index].page == 1 ? res.data.Data : this.tabList[index].list.concat(res.data.Data)
        this.tabList[index].loading = false
        if (res.data.Data.length < 10)  this.tabList[index].finished = true
        this.tabList[index].page = ++this.tabList[index].page
      })
    },
    // 领取
    getCoupon(id) {
      this.$get('Address/SaveCouponHouse', {couponID: id}).then((res) => {
        this.$toast('领取成功')
        this.getData()
      })
    },
    TagChange() {
      let index = this.active
      this.tabList[index].page = 1
      this.tabList[index].finished = false
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 30px;
  .item {
    margin: 30px auto;
    height: 150px;
    width: 690px;
    box-sizing: border-box;
    position: relative;
    .img {
      width: 200px;
      height: 150px;
    }
    .left {
      div {
        width: 200px;
        height: 150px;
        background: #e2e2e2;
      }
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      padding: 18px 50px;
      height: 150px;
      width: 550px;
      box-sizing: border-box;
      color: #fff;
      background-image: radial-gradient(circle at 0,transparent 0, transparent 30px,#C6C6C6 0, #C6C6C6 100%);
      background-position: 0 0;
      p {
        i {
          font-size: 71px;
        }
      }
    }
    .active {
      background-image: radial-gradient(circle at 0,transparent 0, transparent 30px,#d5ac84 0, #d5ac84 100%);
    }
    .active2 {
      background-image: radial-gradient(circle at 0,transparent 0, transparent 30px,#EA8AA3 0, #EA8AA3 100%);
    }
    .active3 {
      background-image: radial-gradient(circle at 0,transparent 0, transparent 30px,#6A6648 0, #6A6648 100%);
    }
  }
}
</style>

