const MixinGoods = {
  data() {
    return {
      data: {},
      submit: {
        colourid: '',
        specificaID: '',
        sku: '',
        number: 1
      },
      salesVolume: 0,
      sizeList: []
    }
  },
  methods: {
     // 获取基础数据
     getData(control) {
      this.$post('Product/ProductModel', {ProductID: this.$route.query.id}).then((res) => {
        this.data = res.data
        this.getSize(res.data.colourList[0], 0, control)
        this.data.productinfo = res.data.productinfo.replace(/src="/g, 'src="'+this.$imgUrl)
      })
    },

    // 获取型号
    getSize(item, index, control) {
      if (!control) this.submit.colourid = item.id

      this.$refs.swipe.swipeTo(index)

      let data = {
        ProductID: this.$route.query.id,
        colourid: item.id
      }

      this.$post('Product/PurchaseObtainSize', data, false).then((res) => {
        let data = []
        let list = []
        res.data.forEach((val) => {
          data.push(val)
          list.push(val.id)
        })
        if (!control) {
          this.submit.specificaID = data[0].id
          this.salesVolume = data[0].salesVolume
          this.submit.sku = data[0].sku
        }
        this.sizeList = list
      })
    },

    // 选择型号
    setSize(item) {
      if (this.sizeList.indexOf(item.id) == -1) return false
      this.submit.specificaID = item.id
      this.salesVolume = item.salesVolume
      this.submit.number = 1
    },

    // 加入购物车 编辑购物车
    addCart() {
      let data = Object.assign(this.submit, {
        productID: this.$route.query.id
      })
      this.$post('Purchase/PurchaseToCartEdit', data).then((res) => {
        this.$toast('加入购物车成功！')
      })
    }
  }
}
export default MixinGoods