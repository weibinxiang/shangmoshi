<template>
  <div>
    <headers :title="$route.query.type == 'add' ? '添加地址' : '修改地址'"></headers>
    <div class="containers">
      <div class="wrap">
        <div class="item">
          <div class="ques">如何称呼您？</div>
          <div class="input">
            <input type="text" placeholder="姓名," v-model="data.name">
          </div>
          <!-- <div class="input">
            <input type="text" placeholder="名," v-model="data.lastName">
          </div> -->
        </div>

        <div class="item">
          <div class="ques">您的电话号码？</div>
          <div class="input">
            <input type="text" placeholder="电话号码," v-model="data.mobilePhone">
          </div>
        </div>

        <div class="item">
          <div class="ques">输入您的地址？</div>
          <div class="area flex-between">
            <div class="column flex-center-y" @click="show = true">
              <van-icon name="arrow-down" />
              <div class="text flex_1 ellipsis">{{data.province}}</div>
              <div class="txt" v-if="data.province == ''">省</div>
            </div>
            <div class="column flex-center-y" @click="show = true">
              <van-icon name="arrow-down" />
              <div class="text flex_1 ellipsis">{{data.city}}</div>
              <div class="txt" v-if="data.city == ''">市</div>
            </div>
            <div class="column flex-center-y" @click="show = true">
              <van-icon name="arrow-down" />
              <div class="text flex_1 ellipsis">{{data.town}}</div>
              <div class="txt" v-if="data.town == ''">区</div>
            </div>
          </div>
          <div class="input flex-center-y">
            <input type="text" placeholder="地址," v-model="data.detail">
          </div>
        </div>
      </div>
      <div class="check flex-center-y">
        <van-checkbox checked-color="#9B6350" v-model="data.isDefault" shape="square"></van-checkbox>
        <p @click="data.isDefault = !data.isDefault">是否设为默认地址</p>
      </div>
      <div class="button flex">
        <div class="confirm" @click="submit">{{$route.query.type == 'add' ? '确认添加' : '确认修改'}}</div>
        <div class="cancel" @click="$router.back()">取消</div>
      </div>
  </div>
    <van-popup v-model="show" position="bottom">
      <van-area :area-list="site" @cancel="show=false" @confirm="changeAddress"/>
    </van-popup>
  </div>
</template>

<script>
import { Icon, Area, Popup, Checkbox } from 'vant';
import util from '../utils/utils.js'
export default {
  components: {
    'van-checkbox': Checkbox,
    'van-icon': Icon,
    'van-area': Area,
    'van-popup': Popup
  },
  data() {
    return {
      data: {
        province: '',
        city: '',
        town: '',
        mobilePhone: '',
        detail: '',
        isDefault: false,
        name: ''
      },
      show: false,
      site: util.site
    }
  },
  created() {
    if (this.$route.query.type == 'edit') {
      let data = JSON.parse(this.$route.query.data)
      this.data = {
        province: data.Province,
        city: data.City,
        town: data.Town,
        mobilePhone: data.MobilePhone,
        detail: data.Detail,
        isDefault: data.IsDefault,
        name: data.Name,
        id: data.ID
      }
    }
  },
  methods: {
    // 地址变动
    changeAddress(val) {
      this.data.province = val[0].name
      this.data.city = val[1].name
      this.data.town = val[2].name
      this.show = false
    },
    submit() {
      // let data = Object(this.data, {
      //   // name: this.data.firstName + this.data.lastName
      // })
      this.$post('Address/SaveAddress', this.data).then((res) => {
        this.$toast( this.$route.query.type == 'add' ? '添加成功' : '修改成功')
        this.$router.back()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 0 30px;
  .item {
    margin: 70px 0;
    .ques {
      font-size: 30px;
      line-height: 1;
    }
    .input {
      margin-top: 40px;
      padding: 4px 0;
      font-size: 30px;
      border-bottom: 1px solid #777777;
    }
    .area {
      margin-top: 40px;
      .column {
        width: 28%;
        border-bottom: 1px solid #777777;
        font-size: 30px;
        padding: 4px 0;
        .text {
          padding: 0 5px;
          text-align: center;
        }
      }
    }
  }
}
.check {
  margin: 40px 30px;
  p {
    padding: 0 10px;
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
</style>
