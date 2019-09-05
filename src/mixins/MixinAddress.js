import { Checkbox, CheckboxGroup, RadioGroup, Radio, Dialog } from 'vant';
const MixinAddress = {
  components: {
    'van-checkbox': Checkbox,
    'van-checkbox-group': CheckboxGroup,
    'van-radio-group': RadioGroup,
    'van-radio': Radio
  },
  data() {
    return {
      checked: [],
      radio: '',
      data: []
    }
  },
  created() {
    if (this.$store.state.userInfo != '') this.getData()
  },
  methods: {
    getData() {
      let data = {
        Sort: 'ID',
        Order: 'asc',
        PageNumber: 1,
        Limit: 10
      }
      this.$post('Address/GetAddressPageList', data).then((res) => {
        this.data = res.data.Data
        this.radio = this.data.findIndex((val) => { return val.IsDefault })
      })
    },
    // 修改
    goEdit(item) {
      this.$router.push({
        path: '/ads_add',
        query: {
          type: 'edit',
          data: JSON.stringify(item)
        }
      })
    },
    // 删除
    del() {
      Dialog.confirm({
        title: '提示',
        message: '请确认是否删除！'
      }).then(() => {
        if (!this.checked.length) {
          this.$toast('请先选择要删除的地址!')
          return false
        }
        this.$get('Address/DeleteAddress', {ids: this.checked}).then((res) => {
          this.getData()
        })
      })
    }
  }
}

export default MixinAddress