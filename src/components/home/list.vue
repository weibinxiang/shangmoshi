<template>
  <div>
    <headers :title="'列表'"></headers>
    <div class="containers">
      <van-swipe :autoplay="8000" indicator-color="#fff" class="swipe" >      
        <van-swipe-item v-for="(item,index) in swipeData" :key="index"><img :src="$imgUrl + item.photoPath" alt=""></van-swipe-item>
      </van-swipe>
      <div class="list_wrap">
        <!-- <div class="head">
          <div class="title">BASIC DENIM SHIRT</div>
          <div class="text">SLIM FIT BASIC DENIM SHIRT FEATURING A CLASSIC BUTTON-DOWN COLLAR AND LONG SLEEVES AND FRONT SHEST POCKET</div>
        </div> -->
        <div class="list flex-between">
          <!-- :class="++index%3 == 0 ? 'row' : ''" -->
          <div class="item" v-for="(item, index) in data" :key="index" @click="$router.push({path: '/details', query: {id: item.id}})">
            <img :src="$imgUrl + item.photoPath" alt="">
            <div class="info">
              <!-- <p class="color">+颜色</p> -->
              <p class="name ellipsis">{{item.productName}}</p>
              <p class="price"><i>￥</i>{{item.price}}</p>
            </div>
          </div>
        </div>

        <div class="noData" v-if="!data.length">
          <div class="button">
            <!-- <div class="flex-center confirm" @click="$router.push('/')">前往首页逛逛</div> -->
            <div class="flex-center cancel"  @click="$router.push('/')">返回首页</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  created() {
    this.getData()
    this.getSwipeData()
  },
  data() {
    return {
      swipeData: [],
      data: []
    }
  },
  methods: {
    getData() {
      this.$post('Product/ProductList', {columnid: this.$route.query.id}).then((res) => {
        this.data = res.data
      })
    },
    getSwipeData() {
      this.$post('Product/ProductColumnModel', {columnid: this.$route.query.id}).then((res) => {
        this.swipeData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe {
  img {
    width: 100%;
  }
}
.list_wrap {
  padding: 30px;
  .head {
    .title {
      font-size: 55px;
      color: $baseColor;
    }
    .text {
      font-size: 21px;
      color: #161616;
      margin-top: 21px;
    }
  }
  .list {
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 335px;
      margin: 20px 0;
      img {
        width: 100%;
      }
      .info {
        text-align: center;
        p {
          margin: 10px 0;
          font-size: 30px;
        }
        .color {
          color: #1B1B1B;
        }
        .name {
          color: #303030;
        }
        .price {
          color: $baseColor;
          font-weight: bold;
          font-size: 36px;
          i {
            font-size: 16px;
          }
        }
      }
    }
    .row {
      width: 100%;
    }
  }
}
.noData {
  text-align: center;
  padding: 0 30px;
  font-size: 30px;
  color: #777;
  .button {
    margin: 100px 0;
    div {
      height: 80px;
      margin: 30px 0;
    }
    .confirm {
      background: $baseColor;
      color: #fff;
    }
    .cancel {
      color: $baseColor;
      border: 1px solid $baseColor;
    }
  }
}
</style>
