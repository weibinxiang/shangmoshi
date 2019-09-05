<template>
  <!-- @click="$router.push({path: '/group'})" -->
  <div>
    <van-tabs v-model="active" title-inactive-color="#777" title-active-color="#9B6350" color="#9B6350" :line-height="2" :line-width="180">
      <van-tab v-for="(val, key) in tabList" :key="key" :title="val.title">
        <van-list v-model="val.loading" :finished="val.finished" @load="getData">
          <div class="list">
            <div slot="title">
              <div class="item" v-for="(item, index) in val.list" :key="index">
                <div class="main flex" @click="collapse == index ? collapse = -1 : collapse = index">
                  <img src="../../assets/images/index2.jpg" alt="" class="img">
                  <div class="info flex_1 flex">
                    <div class="title">双面呢大衣</div>
                    <div class="btm flex">
                      <div class="left">
                        <p class="line"></p>
                        <p class="text">单买价<i>¥1,999</i></p>
                        <p class="text">拼团为您节省<i>60</i>元</p>
                      </div>
                      <div class="price">￥<i>1,800</i></div>
                    </div>
                  </div>
                </div>
                <transition name="slide">
                  <div class="minor" v-show="collapse == index">
                    <div class="hd">
                      <p class="title">还差1人成团，剩余<i>12：09：54</i>结束</p>
                      <p class="text">拼团规则：好友参团 人满成团 不满退款</p>
                    </div>
                    <div class="peo">
                      <img src="../../assets/images/tp.png" alt="" v-for="(item, index) in 3" :key="index">
                    </div>
                    <div class="button">
                      <div class="confirm">我已参团，再邀请好友参团</div>
                      <div class="cancel">分享到朋友圈</div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
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
      active: 1,
      collapse: 0,
      tabList: [
        {
          title: '我创建的',
          loading: false,
          page: 1,
          finished: false,
          list: []
        },
        {
          title: '我参与的',
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
      let data = {
        IsParent: index == 0 ? true : false,
        Sort: 'ID',
        Order: 'asc',
        PageNumber: this.tabList[index].page,
        Limit: 10
      }
      this.$post('Activity/GetAttendActivityInfo', data).then((res) => {
        this.tabList[index].list = this.tabList[index].page == 1 ? res.data.Data : this.tabList[index].list.concat(res.data.Data)
        this.tabList[index].loading = false
        if (res.data.Data.length < 10)  this.tabList[index].finished = true
        this.tabList[index].page = ++this.tabList[index].page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin: 20px 0;
  .img {
    width: 200px;
    height: 300px;
  }
  .main {
    padding: 40px 30px;
    background: #F1F1F1;
    z-index: 100;
    .info {
      padding-left: 30px;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 30px;
      }
      .btm {
        justify-content: space-between;
        align-items: flex-end;
        .left {
          color: #777;
          font-size: 20px;
          .line {
            width: 46px;
            height: 4px;
            background: #1b1b1b;
          }
          .text {
            margin-top: 15px;
            line-height: 1;
            i {
              color: #1B1B1B;
            }
          }
        }
        .price {
          color: $baseColor;
          font-size: 18px;
          i {
            font-size: 30px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .minor {
    padding: 0 30px;
    background: #fff;
    overflow: hidden;
    .hd {
      margin: 70px 0;
      text-align: center;
      .title {
        font-size: 30px;
        i {
          font-weight: bold;
        }
      }
      .text {
        color: #777777;
        margin-top: 10px;
      }
    }
    .peo {
      text-align: center;
      img {
        width: 120px;
        height: 120px;
        margin: 0 23px;
      }
    }
    .button {
      margin: 70px 0;
      div {
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 32px;
        margin: 30px 0;
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
  }
}

.slide-enter-active {
  animation: slide-in .5s ease-in;
}
.slide-leave-active {
  animation: slide-in .5s reverse;
}
@keyframes slide-in {
  0% {
    height: 0;
  }
  100% {
    height: 640px;
  }
}

</style>

