<template>
  <div>
    <div class="list cart">
      <van-checkbox-group v-model="checked" @change="countTotal">
        <div class="item flex-center-y" v-for="(item, index) in data" :key="index">
          <van-checkbox class="checkbox" checked-color="#9B6350" :name="index"></van-checkbox>
          <div class="info flex flex_1">
            <div>
              <img :src="$imgUrl + item.photopath" alt="">
            </div>
            <div class="introduce flex_1 flex">
              <div class="title" @click="$router.push({path: '/details', query: {id: item.productid}})">{{item.productname}}</div>
              <div class="con">
                <p>编号：{{item.productno}}</p>
                <p>颜色：{{item.colourname}}</p>
                <p>尺寸：{{item.specifiname}}</p>
                <p class="flex-between">
                  <span>数量：{{item.number}}</span> 
                  <span class="price">￥<i>{{item.price}}</i></span>
                </p>
              </div>
              <div class="button flex">
                <div class="flex-center" @click="$router.push({path: '/edit', query: {cartid: item.id, id: item.productid}})">编辑</div>
                <div class="flex-center" @click="del(item.id)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </van-checkbox-group>
    </div>
    <div class="noData" v-if="!data.length">
      <img src="../../assets/images/ct_nd.png" alt="">
      <p>购物袋空空如也</p>
      <div class="button">
        <div class="flex-center confirm"  @click="$router.push('/')">去逛逛</div>
      </div>
    </div>
    <div class="balance flex-center-y" v-if="data.length">
      <div class="left flex_1 flex-center-y">
        <van-checkbox checked-color="#9B6350" @click="all" v-model="checkAll">全选</van-checkbox>
        <p class="total">合计：<span>￥<i>{{total}}</i></span></p>
      </div>
      <div class="button" @click="buy()">立即购买</div>
    </div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Dialog } from 'vant';
export default {
  components: {
    'van-checkbox': Checkbox,
    'van-checkbox-group': CheckboxGroup,
  },
  data() {
    return {
      checked: [],
      checkAll: false,
      data: [],
      total: "0.00"
    }
  },
  created() {
    if (this.$store.state.userInfo != '') this.getData()
  },
  methods: {
    getData() {
      this.$get('Purchase/PurchaseToCartList').then((res) => {
        this.data = res.data
      })
    },
    // 计算价格
    countTotal() {
      let total = 0
      this.checked.forEach((val, key) => {
        total += Number(this.data[val].price) * Number(this.data[val].number)
      })
      if(this.checked.length == this.data.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
      this.total = total.toFixed(2)
    },
    // 删除购物车商品
    del(id) {
      Dialog.confirm({
        title: '提示',
        message: '请确认是否删除！'
      }).then(() => {
        this.$post('Purchase/PurchaseToCartDelete', {cartlist: id}).then((res) => {
          this.getData()
        })
      })
    },
     // 全选
    all() {
      if (!this.checkAll) {
        let checked = []
        this.data.forEach((val, key) => {
          checked.push(key)
        })
        this.checked = checked
        this.countTotal()
      } else {
        this.checked = []
        this.countTotal()
      }
    },
    buy() {
      if (!this.checked.length) {
        this.$toast('请先选择商品')
        return false
      }
      let cartList = []
      this.checked.forEach((val, key) => {
        if (this.data[val]) cartList.push(this.data[val].id)
      })
      this.$router.push({path: '/payment', query: {id: cartList.toString(), status: 2}})
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 0 30px 80px;
  .item {
    padding: 50px 0;
    border-bottom: 1px solid #eee;
    .info img {
      width: 200px;
      // height: 300px;
      margin-left: 30px;
    }
    .introduce {
      padding-left: 30px;
      justify-content: space-between;
      flex-direction: column;
      overflow: hidden;
      .title {
        font-size: 30px;
        line-height: 1;
      }
      .con {
        padding: 20px 0;
        color: #777;
        font-size: 22px;
        p {
          margin: 4px 0;
        }
      }
      .flex-between {
        .price {
          color: $baseColor;
          i {
            font-size: 32px;
            font-weight: bold;
          }
        }
      }
    }
    .button {
      div {
        width: 125px;
        height: 50px;
        border: 2px solid #c6c6c6;
        font-size: 20px;
        margin-right: 30px;
        cursor: pointer;
        text-align: center;
        color: #1b1b1b;
      }
    }
  }
}
.noData {
  text-align: center;
  padding: 120px 30px 0 30px;
  font-size: 30px;
  color: #777;
  p {
    color: #777;
  }
  img {
    width: 50%;;
  }
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
.balance {
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 100px;
  left: 0;
  background: #e2e2e2;
  .left {
    padding-left: 30px;
    .total {
      padding-left: 50px;
      span {
        color: $baseColor;
        i {
          font-size: 36px;
          font-weight: bold;
        }
      }
    }
  }
  .button {
    width: 278px;
    background: $baseColor;
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    font-size: 30px;
  }
}
</style>

<style  lang="scss">
  .cart .van-checkbox__icon .van-icon {
    border-color: $baseColor;
  }
  .balance .van-checkbox__icon .van-icon {
    border-color: #000;
  }
</style>