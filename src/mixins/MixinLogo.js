const MixinLogo = {
  data() {
    return {
      logoUrl: 'this.src="' + require('../assets/images/logo.png') + '"',
      logo: ''
    }
  },
  created() {
    this.getLogo()
  },
  methods: {
     // 获取logo
     getLogo() {
      let data = {
        Type: '',
        Mark: 'Logo_img',
        Sort: 'ID',
        Order: 'asc',
        PageNumber: 1,
        Limit: 10
      }
      this.$post('Advertise/GetAdvertisePageList', data).then((res) => {
        this.logo = res.data.Data[0].Image
      })
    },
  }
}
export default MixinLogo