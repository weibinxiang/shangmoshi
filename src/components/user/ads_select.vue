<template>
  <div>
    <headers :title="'选择地址'"></headers>
    <div class="containers">
      <div class="free flex">
        <van-checkbox checked-color="#9B6350" v-model="check"></van-checkbox>
        <div class="right">
          <p class="title flex-center-y">免费顺丰速递 <img src="../../assets/images/free.png" alt=""></p>
          <p class="text">提供您的送货地址（具体的提送时间取决于您所在的城市）</p>
        </div>
      </div>
      <div class="wrap">
        <div class="head">
          <p>选择地址</p>
        </div>
        <div class="list">
          <van-radio-group v-model="radio">
            <div class="item flex" v-for="(item, index) in data" :key="index">
              <van-radio :name="index" checked-color="#9B6350"></van-radio>
              <div class="info flex_1">
                <div class="name flex-between">
                  <p>{{item.Name}} <i v-if="item.IsDefault">（默认）</i></p>
                  <!-- <img src="../../assets/images/edit_ic.png" alt=""> -->
                </div>
                <p class="text">{{item.Province}}，{{item.City}}，{{item.Town}}，{{item.Detail}}</p>
                <p class="text">{{item.MobilePhone}}</p>
              </div>
            </div>
          </van-radio-group>
          <div class="nodata" v-if="!data.length">
            <img src="../../assets/images/address_ic.png" alt="">
            <p>暂无地址</p>
          </div>
        </div>

        <div class="button flex">
          <div class="confirm" @click="$router.push({path: '/ads_add', query: {type: 'add'}})">添加新地址</div>
          <div class="cancel" @click="submit">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MixinAddress from '../../mixins/MixinAddress.js'
export default {
  mixins: [MixinAddress],
  data() {
    return {
      check: true
    }
  },

  created() {
    
  },
  methods: {
    submit() {
      let v = this.data[this.radio]
      let data = {
        addressid: v.ID,
        city: v.City,
        detail: v.Detail,
        mobilephone: v.MobilePhone,
        name: v.Name,
        province: v.Province,
        town: v.Town
      }
      this.$router.push({path: '/payment', query:  Object.assign(this.$route.query,  {
        address: JSON.stringify(data)
      })})
    }
  },
}
</script>

<style scoped lang="scss">
.free {
  padding: 40px 28px 28px;
  border-bottom: 1px solid #f1f1f1;
  .right {
    padding-left: 20px;
    .title {
      font-size: 30px;
      line-height: 1;
      img {
        width: 35px;
      }
    }
    .text {
      color: #C7C7C7;
      margin-top: 10px;
    }
  }
}

.wrap {
  padding: 0 30px;
  .head {
    font-size: 30px;
    padding: 25px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .item {
    padding: 25px 0;
    border-bottom: 1px solid #f1f1f1;
    .info {
      padding: 0 20px;
      .name {
        font-size: 30px;
        margin-bottom: 20px;
        color: #1B1B1B;
        line-height: 1;
        img {
          width: 28px;
        }
      }
      .text {
        color: #777;
        font-size: 28px;
        line-height: 42px
      }
    }
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

.nodata {
  text-align: center;
  color: #777;
  margin-top: 100px;
  img {
    width: 100px;
  }
}
</style>
