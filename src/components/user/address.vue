<template>
  <div>
    <headers :title="'地址'"></headers>
    <div class="containers">
      <div class="wrap">
        <div class="head">
          <p>我的地址簿</p>
        </div>
        <div class="list">
          <van-checkbox-group v-model="checked">
            <div class="item flex" v-for="(item, index) in data" :key="index">
              <van-checkbox :name="item.ID" checked-color="#9B6350"></van-checkbox>
              <div class="info flex_1">
                <div class="name flex-between">
                  <p>{{item.Name}} <i v-if="item.IsDefault">（默认）</i></p>
                  <img src="../../assets/images/edit_ic.png" alt="" @click="goEdit(item)">
                </div>
                <p class="text">{{item.Province}}，{{item.City}}，{{item.Town}}，{{item.Detail}}</p>
                <p class="text">{{item.MobilePhone}}</p>
              </div>
            </div>
          </van-checkbox-group>
          <div class="nodata" v-if="!data.length">
            <img src="../../assets/images/address_ic.png" alt="">
            <p>暂无地址</p>
          </div>
        </div>

        <div class="button flex">
          <div class="confirm" :class="data.length ? '' : 'only'" @click="$router.push({path: '/ads_add', query: {type: 'add'}})">添加新地址</div>
          <div class="cancel" @click="del" v-if="data.length">删除</div>
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
  }
}
</script>

<style scoped lang="scss">

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
  .only {
    width: 100%;
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

