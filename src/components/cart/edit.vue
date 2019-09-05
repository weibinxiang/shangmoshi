<template>
  <div class="edit">
    <headers :title="'编辑商品'"></headers>
    <div class="containers">
      <div class="head">
        <div class="title">{{data.productname}}</div>
        <div class="price">￥<i>{{data.price}}</i></div>
      </div>
      <div class="con">
        <van-swipe indicator-color="#777" class="swipe" ref="swipe">      
          <van-swipe-item v-for="(item, index) in data.colourList" :key="index"><img :src="$imgUrl + item.photopath" alt=""></van-swipe-item>
        </van-swipe>

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
      <div class="button flex">
        <div class="confirm" @click="edit">保存编辑</div>
        <div class="cancel" @click="$router.back()">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import {Swipe, SwipeItem, Stepper, Toast} from 'vant'
import MixinGoods from '../../mixins/MixinGoods'
export default {
  components: {
    'van-stepper': Stepper,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  mixins: [MixinGoods],
  data() {
    return {
      color: 0,
      number: 0
    }
  },
  created() {
    this.getData(true)
    this.getInfo()
  },
  methods: {
    // 获取购物车商品信息
    getInfo() {
      this.$get('Purchase/PurchaseToCartModel', {cartid: this.$route.query.cartid}).then((res) => {
        this.submit = {
          colourid: res.data.colourid,
          specificaID: res.data.specificaid,
          number: res.data.number
        }
      })
    },
    
    // 编辑
    edit() {
      let data = Object.assign(this.submit, {
        productID: this.$route.query.id,
        cartID: this.$route.query.cartid
      })
      this.$post('Purchase/PurchaseToCartEdit', data, false).then((res) => {
        Toast('编辑成功！')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
  text-align: center;
  .head {
    padding: 30px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 40px;
      margin-bottom: 30px;
    }
    .price {
      color: #d38473;
      i {
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
  .con {
    width: 400px;
    margin: 30px auto;
    .img {
      width: 100%;
      height: 400px;;
    }
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
}
.swipe {
  text-align: center;
  padding: 60px 0;
  img {
    width: 90%;
  }
}
</style>