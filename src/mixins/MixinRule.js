import { Popup } from 'vant';
const MixinRule = {
  components: {
    'van-popup': Popup
  },
  data() {
    return {
      ruleShow: false,
      rule: ''
    }
  },
  methods: {
    // 规则
    rules(Mark) {
      this.rule = ''
      let data = {
        Mark: Mark,
        RuleID: 0,
        Sort: 'ID',
        Order: 'asc',
        PageNumber: 1,
        Limit: 10
      }
      this.$post('Advertise/GetPageRulePageList', data).then((res) => {
        this.ruleShow = true
        this.rule = res.data.Data[0].Detail
      })
    },
    // 成分和保养
    info() {
      this.rule = ''
      this.$get('Product/ProductMaintainAndComponent', {productid: this.$route.query.id}).then((res) => {
        this.ruleShow = true
        this.rule = res.data.data.replace(/src="/g, 'src="'+this.$imgUrl)
      })
    }
  }
}

export default MixinRule