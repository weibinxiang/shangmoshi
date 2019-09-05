<template>
  <div>
    <headers :title="'秒杀'"></headers>
    <div class="containers">
      <van-tabs v-model="active" title-inactive-color="#777" title-active-color="#9B6350" color="#9B6350" :line-height="2" :line-width="120" sticky :offset-top="40">
        <van-tab v-for="(val, key) in tabList" :key="key" :title="val.title">
          <van-list v-model="val.loading" :finished="val.finished" @load="getData">
            <div>
              <!-- <div class="countDown">
                <p class="text">抢购剩余时间</p>
                <p class="time">58:40:03</p>
              </div> -->
              <div class="list">
                <div class="item" v-for="(item, index) in val.list" :key="index">
                  <img :src="$imgUrl + item.PhotoPath" alt="">
                  <p class="title">{{item.ProductName}}</p>
                  <div class="info flex">
                    <div class="left">
                      <div class="line"></div>
                      <p class="txt">单买价<i>¥{{item.Price}}</i></p>
                      <p class="txt">拼团为您节省<i>{{item | couponPrice}}</i>元</p>
                      <div class="price flex">
                        <p class="new">¥<i>{{item | price}}</i></p>
                        <p class="old">¥<i>{{item.Price}}</i></p>
                      </div>
                    </div>
                    <div class="button flex-center" @click="$router.push({path: '/group', query: {id: item.ProductID, sid: item.ID}})">马上抢</div>
                  </div>
                </div>
                <div class="noData" v-if="!val.list.length">
                  <p>暂时没有活动了噢！</p>
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
import util from '../utils/utils.js'
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
          title: '正在疯抢',
          loading: false,
          page: 1,
          finished: false,
          list: [],
          startDateTime: '',
          EndDateTime: ''
        },
        {
          title: '明天预告',
          loading: false,
          page: 1,
          finished: false,
          list: []
        },
        {
          title: '后天预告',
          loading: false,
          page: 1,
          finished: false,
          list: []
        }
      ]
    }
  },
  created() {
    this.countTime()
  },
  methods: {
    // 计算价格
    countTime() {
      let time = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()

      this.tabList[0].startDateTime = util.format(time)
      this.tabList[0].EndDateTime = util.format(time+24*60*60*1000-1)
      
      this.tabList[1].startDateTime = util.format(time+24*60*60*1000)
      this.tabList[1].EndDateTime = util.format(time+24*60*60*1000*2-1)
      
      this.tabList[2].startDateTime = util.format(time+24*60*60*1000*2)
      this.tabList[2].EndDateTime = util.format(time+24*60*60*1000*3-1)
    },
    // 获取数据
    getData() {
      let index = this.active
      if (this.tabList[index].finished) return false
      this.tabList[index].loading = true
      let data = {
        StartDateTime: this.tabList[index].startDateTime,
        EndDateTime: this.tabList[index].EndDateTime,
        Sort: 'ID',
        Order: 'asc',
        PageNumber: this.tabList[index].page,
        Limit: 10
      }
      this.$post('Activity/GetActivityPageList', data).then((res) => {
        this.tabList[index].list = this.tabList[index].page == 1 ? res.data.Data : this.tabList[index].list.concat(res.data.Data)
        // util.countdown(this.tabList[index].list)
        this.tabList[index].loading = false
        if (res.data.Data.length < 10)  this.tabList[index].finished = true
        this.tabList[index].page = ++this.tabList[index].page
      })
    },
    price(val) {
      if (val.Type == 0) {
        return val.Price-val.ActivityPrice
      } else if (val.Type == 1) {
        return val.Price*(val.ActivityPrice/100)
      }
    }
  },
  filters: {
    couponPrice(val) {
      if (val.Type == 0) {
        return val.Price-(val.Price-val.ActivityPrice)
      } else if (val.Type == 1) {
        return val.Price-(val.Price*(val.ActivityPrice/100))
      }
    },
    price(val) {
      if (val.Type == 0) {
        return val.Price-val.ActivityPrice
      } else if (val.Type == 1) {
        return val.Price*(val.ActivityPrice/100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.countDown {
  padding: 30px;
  background: #F1F1F1;
  font-size: 30px;
  text-align: center;
  .time {
    font-size: 45px;
    margin-top: 20px;
    color: $baseColor;
  }
}
.list {
  padding: 10px 30px;
  .item {
    padding: 30px 0;
    img {
      width: 100%;
    }
    .title {
      padding: 20px 0;
      font-size: 30px;
    }
    .info {
      justify-content: space-between;
      align-items: flex-end;
      color: #777;
      font-size: 20px;
      .line {
        width: 46px;
        height: 4px;
        background: #1b1b1b;
        margin-bottom: 20px;
      }
      .txt {
        line-height: 38px;
        i {
          color: #1b1b1b;
        }
      }
      .price {
        align-items: flex-end;
        margin-top: 20px;
        .new {
          color: $baseColor;
          i {
            font-size: 34px;
            font-weight: bold;
          }
        }
        .old {
          text-decoration: line-through;
          margin-left: 20px;
        }
      }
      .button {
        width: 180px;
        height: 80px;
        font-size: 30px;
        background: $baseColor;
        color: #fff;
      }
    }
  }
  .noData {
    text-align: center;
    margin: 100px 0;
    color: #777;
  }
}
</style>

