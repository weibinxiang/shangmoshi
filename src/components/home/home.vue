<template>
  <div>
    <div class="login_img flex-center"><img :src="$imgUrl + logo" alt="" :onerror="logoUrl"></div>
    <div class="logo_padding"></div>

    <van-swipe :autoplay="8000" indicator-color="#fff" class="swipe" >      
      <van-swipe-item v-for="(item,index) in data.Data" :key="index"><img :src="$imgUrl + item.Image" alt="" :onerror="defaultImg"></van-swipe-item>
    </van-swipe>

    <div class="list">
      <div class="item" v-for="(item,index) in typeData" :key="index" @click="$router.push({path: '/list', query: {id: item.id}})">
        <img :src="$imgUrl + item.webIndexAd" alt="" :onerror="defaultImg">
      </div>
    </div>

    <!-- <van-swipe :autoplay="8000" indicator-color="#fff" class="swipe" >      
      <van-swipe-item v-for="(item,index) in 3" :key="index"><img src="../../assets/images/index.jpg" alt="" :onerror="errorLoadImg"></van-swipe-item>
    </van-swipe>

    <div class="list">
      <div class="item" v-for="(item,index) in 3" :key="index" @click="$router.push({path: '/list'})">
        <img src="../../assets/images/index2.jpg" alt="" :onerror="errorLoadImg">
      </div>
    </div> -->
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import MixinLogo from '../../mixins/MixinLogo.js'
export default {
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  mixins: [MixinLogo],
  data() {
    return {
      data: {},
      typeData: [],
      defaultImg: 'this.src="' + require('../../assets/images/index.jpg') + '"',
    }
  },
  created() {
    this.getData()
    this.getTypeData()
  },
  methods: {
    // 获取轮播图
    getData() {
      let data = {
        Type: '',
        Mark: 'Index_AD',
        Sort: 'ID',
        Order: 'asc',
        PageNumber: 1,
        Limit: 10
      }
      this.$post('Advertise/GetAdvertisePageList', data).then((res) => {
        this.data = res.data
      })
    },
    // 获取分类
    getTypeData() {
      this.$post('Product/ProductColumnList', {}).then((res) => {
        this.typeData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo_padding {
  height: 90px;
}
.login_img {
  text-align: center;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 90px;
  background: #fff;
  img {
    width: 200px;
  }
}

.swipe {
  img {
    width: 100%;
  }
}
.list {
  padding-top: 20px;
  margin-bottom: -20px;
  .item {
    margin-top: 15px;
   
    img {
      width: 100%;
    }
    p {
      text-align: center;
      font-size: 38px;
      padding: 20px 0 30px 0;
    }
  }
}
</style>