import Vue from 'vue'
import axios from 'axios'
import { Toast } from 'vant'


// axios.defaults.baseURL = 'http://api.maxsull.com/api/'
// axios.defaults.baseURL = 'http://192.168.0.246:8080/api/'
axios.defaults.baseURL = 'http://192.168.0.247/api/'
var imgUrl = 'http://192.168.0.246'

// axios.defaults.baseURL = '/api/'

Vue.prototype.axios = axios

// axios.defaults.baseURL = Vue.prototype.HOST
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8;'
export function get (url, params = {}, loading = true, headers = {}) {
  return new Promise((resolve, reject) => {
    if (loading) {
      this.$store.state.loading = true
    }
    headers['Authorization'] = 'BasicAuth '+ (this.$store.state.userInfo ? this.$store.state.userInfo.Ticket : '')
    params.enterpriseID = 6
    axios.get(url, {
      params: params,
      headers: headers
    }).then(response => {
      this.$store.state.loading = false
      if (response.data.code == 200) {
        resolve(response.data)
      } else if (response.data.code == 401) {
        Toast('请先登录！')
        // this.$router.push({
        //   path: '/login'
        // })
        this.$store.state.loginShow = true
      } else {
        Toast(response.data.data)
        reject(response.data)
      }
    }).catch(err => {
      this.$store.state.loading = false
      Toast(err.msg)
      reject(err)
    })
  })
}

export function post (url, data = {}, loading = true, headers = {}) {
  return new Promise((resolve, reject) => {
    if (loading) {
      this.$store.state.loading = true
    }
    headers['Content-Type'] = 'application/json; charset=UTF-8'
    headers['Authorization'] = 'BasicAuth '+ (this.$store.state.userInfo ? this.$store.state.userInfo.Ticket : '')
    data.enterpriseID = 6
    axios({
      url: url,
      method: 'post',
      data: data,
      headers: headers
    }).then(response => {
      this.$store.state.loading = false
      if (response.data.code == 200) {
        resolve(response.data)
      } else if (response.data.code == 401) {
        Toast('请先登录！')
        // this.$router.push({
        //   path: '/login'
        // })
        this.$store.state.loginShow = true
      } else {
        Toast(response.data.data)
        reject(response)
      }
    }, err => {
      this.$store.state.loading = false
      Toast(err.msg)
      reject(err)
    })
  })
}

export function upImg (data = {}, headers = {}, loading = true) {
  return new Promise((resolve, reject) => {
    if (loading) {
      this.$store.state.loading = true
    }
    headers['Content-Type'] = 'multipart/form-data'
    axios({
      url: 'upload',
      method: 'post',
      data: data,
      headers: headers
    }).then(response => {
      this.$store.state.loading = false
      if (response.data.code == 200) {
        resolve(response.data)
      } else if (response.data.code == 408) {
        // Toast('请先登录')
        // this.$router.push({path: '/login'})
        window.location.href = response.data.msg

        // resolve(response.data)
      } else {
        Toast(response.data.msg)
        reject(response)
      }
    }, err => {
      this.$store.state.loading = false
      Toast(err.msg)
      reject(err)
    })
  })
}

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$upImg = upImg
Vue.prototype.$imgUrl = imgUrl
export default {}