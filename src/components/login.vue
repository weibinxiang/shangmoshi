<template>
  <div>
    <div class="logo flex-center">
      <van-icon name="cross" class="back_icon" @click="$store.state.loginShow = false"></van-icon>
      <img :src="$imgUrl + logo" alt="" :onerror="logoUrl">
    </div>
    <van-tabs v-model="active" title-inactive-color="#777" title-active-color="#9B6350" color="#9B6350" :line-height="2" :line-width="180">
      <van-tab title="登陆">
        <div class="login">
          <h2>我已注册</h2>

          <div class="input flex">
            <p>手机号</p>
            <input type="text" placeholder="请输入手机号" class="flex_1" v-model="loginData.mobilePhone">
            
          </div>
          
          <div class="input flex">
            <p>密码</p>
            <input type="password" placeholder="请输入密码" class="flex_1" v-model="loginPassword">
          </div>

          <div class="check flex-center-y">
            <van-checkbox checked-color="#9B6350" v-model="loginData.isCheck" shape="square"></van-checkbox>
            <p>我已阅读并接受 <i @click="rules('GMTJ')">购买条件</i> 及同意 <i @click="rules('YSTK')">隐私条款</i></p>
          </div>

          <div class="button" @click="login">登录我的 YIFUNIA 账号</div>
          <div class="forget">忘记密码 ></div>
        </div>
      </van-tab>
      <van-tab title="注册">
        <div class="register">
          <div class="input flex-center-y">
            <p>手机号</p>
            <input type="text" placeholder="请输入手机号" class="flex_1" v-model="data.phoneNumber" maxlength="11">
            <div class="flex-center gary" :class="codeText == '获取验证码' && data.phoneNumber.length == 11 ? 'code' : ''" @click="getCode">{{codeText}}</div>
          </div>
          <div class="input flex-center-y">
            <p>密码</p>
            <input type="password" placeholder="请输入密码" class="flex_1" v-model="password">
          </div>
          <div class="input flex-center-y">
            <p>确认密码</p>
            <input type="password" placeholder="请重复输入密码" class="flex_1" v-model="confirmPassword">
          </div>
          <div class="input flex-center-y">
            <p>验证码</p>
            <input type="text" placeholder="请输入手机验证码" class="flex_1" v-model="data.vertifyCode">
          </div>
          <div class="button" @click="register">注册我的 YIFUNIA 账号</div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="ruleShow" position="bottom" class="popup">
      <div class="rule" v-html="rule"></div>
    </van-popup>
  </div>
</template>

<script>
import { Tab, Tabs, Checkbox, Icon } from 'vant';
import MixinLogo from '../mixins/MixinLogo.js'
import MixinRule from '../mixins/MixinRule.js'
import md5 from 'js-md5';
export default {
  components: {
    'van-checkbox': Checkbox,
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-icon': Icon
  },
  mixins: [MixinLogo, MixinRule],
  data() {
    return {
      active: 0,
      codeText: '获取验证码',
      data: {
        phoneNumber: '',
        password: '',
        vertifyCode: '',
      },
      loginPassword: '',
      password: '',
      confirmPassword: '',
      loginData: {
        mobilePhone: '',
        password: '',
        isCheck: false
      },
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      if (!(/^1[3456789]\d{9}$/.test(this.data.phoneNumber))) {
        this.$toast('请输入正确的手机号码')
        return false
      } else if (this.codeText !== '获取验证码') {
        return false
      }

      this.$get('Login/VertifyCode', {phoneNumber: this.data.phoneNumber}).then((res) => {
        this.data.vertifyCode = res.data
      })

      let index = 60
      let clock = window.setInterval(() => {
        this.codeText = index + 's'
        index --
        if (index < 0) {
          window.clearInterval(clock)
          this.codeText = '获取验证码'
        }
      }, 1000)
    },
    
    // 注册
    register() {
      if (this.password.length < 6) {
        this.$toast('密码长度不能小于6位')
        return false
      } else if (this.password !== this.confirmPassword) {
        this.$toast('请确认密码是否一致')
        return false
      }
      this.data.password = md5(this.password)
      this.$post('Login/SaveRegister', this.data).then((res) => {
        this.$toast('注册成功')
        this.active = 0
        this.data = {
          phoneNumber: '',
          password: '',
          vertifyCode: '',
        }
        this.confirmPassword = ''
      })
    },

    // 登录
    login() {
      if (this.loginData.mobilePhone == '') {
        this.$toast('请输入手机号')
        return false
      } else if (this.loginPassword == '') {
        this.$toast('请输入密码')
        return false
      } else if (!this.loginData.isCheck) {
        this.$toast('请勾选协议后再登录')
        return false
      }
       this.loginData.password = md5(this.loginPassword)
      this.$post('Login/Login', this.loginData).then((res) => {
        this.$toast('登录成功')
        this.$store.commit('userUpdate', res.data)
        // this.$router.push({
        //   path: '/'
        // })
        this.$store.state.loginShow = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  
  text-align: center;
  height: 90px;;
  img {
    width: 200px;
  }
}
.login {
  padding: 35px;
  h2 {
    font-size: 48px;
    margin: 10px 0;
  }
  .input {
    padding: 40px 0;
    border-bottom: 1px solid #f1f1f1;
    p {
      width: 150px;
    }
  }
  .check {
    margin: 40px 0;
    p {
      padding: 0 10px;
      i {
        color: $baseColor;
        border-bottom: 1px solid $baseColor;
      }
    }
  }
  .forget {
    text-align: center;
    margin: 30px 0;
    color: #777;
  }
}
.button {
  height: 80px;
  line-height: 80px;
  text-align: center;
  background: $baseColor;
  color: #fff;
  font-size: 30px;
  margin-top: 100px;
}
.register {
  padding: 50px 35px;
  .input {
    height: 110px;
    border-bottom: 1px solid #f1f1f1;
    p {
      width: 150px;
    }
    .gary {
      width: 170px;
      height: 50px;
      color: #fff;
      background: #e6e6e6;
    }
    .code {
      width: 170px;
      height: 50px;
      color: #fff;
      background: $baseColor;
    }
  }
}
.back_icon {
  position: fixed;
  left: 30px;
  top: 30px;
  font-size: 40px;
  color: $baseColor;
  z-index: 100
}
</style>



