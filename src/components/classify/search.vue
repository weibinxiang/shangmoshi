<template>
  <div>
    <div class="search_wrap flex-between">
      <div class="search flex_1 flex-center">
        <img src="../../assets/images/search_ic.png" alt="">
        <input type="text" placeholder="搜索感兴趣产品" class="flex_1">
      </div>
      <div class="sweep">
        <img src="../../assets/images/sweep.png" alt="">
        <p>扫一扫</p>
      </div>
    </div>
    <div class="con">
      <div class="list flex">
        <div class="item" v-for="(item, index) in 10" :key="index">
          <img src="../../assets/images/index2.jpg" alt="">
          <p class="title">牛栏前</p>
          <p class="price"><i>￥</i>999</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
.search_wrap {
  position: fixed;
  z-index: 10;
  height: 90px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px 0 30px;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  .search {
    img {
      width: 56px;
    }
  }
  .sweep {
    font-size: 20px;
    text-align: center;
    color: #bfbfbf;
    img {
      width: 44px;
    }
    p {
      line-height: 1;
    }
  }
}
.con {
  padding-top: 90px;
}
.list {
  flex-wrap: wrap;
  padding: 0 20px;
  justify-content: space-between;
  .item {
    width: 48.5%;
    margin-top: 20px;
    text-align: center;
    img {
      width: 100%;
    }
    p {
      margin: 10px 0;
      font-size: 30px;
      line-height: 1;
    }
    .name {
      color: #303030;
    }
    .price {
      color: $baseColor;
      font-weight: bold;
      font-size: 32px;
      i {
        font-size: 16px;
      }
    }
  }
}
</style>
