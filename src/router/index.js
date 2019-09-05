import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

import home from '@/components/home/home'
import list from '@/components/home/list'
import details from '@/components/home/details'
import group from '@/components/home/group'
import activity from '@/components/home/activity'
import payment from '@/components/home/payment'

import classify from '@/components/classify/classify'
import search from '@/components/classify/search'

import cart from '@/components/cart/cart'
import edit from '@/components/cart/edit'
import order from '@/components/cart/order'
import order_dt from '@/components/cart/order_dt'

import user from '@/components/user/user'
import coupon from '@/components/user/coupon'
import member from '@/components/user/member'
import groupBooking from '@/components/user/groupBooking'
import address from '@/components/user/address'
import ads_select from '@/components/user/ads_select'
import ads_add from '@/components/user/ads_add'

import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: home,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'classify',
          name: 'classify',
          component: classify,
          meta: {
            title: '分类'
          }
        },
        {
          path: 'cart',
          name: 'cart',
          component: cart,
          meta: {
            title: '购物车'
          }
        },
        {
          path: 'user',
          name: 'user',
          component: user,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: '/list',
          name: 'list',
          component: list,
          meta: {
            title: '列表'
          },
        },
        {
          path: '/details',
          name: 'details',
          component: details,
          meta: {
            title: '详情'
          },
        },
        {
          path: '/search',
          name: 'search',
          component: search,
          meta: {
            title: '搜索'
          },
        }
      ],
      redirect: '/home'
    },
    {
      path: '/edit',
      name: 'edit',
      component: edit,
      meta: {
        title: '编辑'
      },
    },
    {
      path: '/group',
      name: 'group',
      component: group,
      meta: {
        title: '拼团'
      },
    },
    {
      path: '/order/:type',
      name: 'order',
      component: order,
      meta: {
        title: '订单'
      },
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: coupon,
      meta: {
        title: '优惠劵'
      },
    },
    {
      path: '/member',
      name: 'member',
      component: member,
      meta: {
        title: '我的团员'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登陆'
      },
    },
    {
      path: '/groupBooking',
      name: 'groupBooking',
      component: groupBooking,
      meta: {
        title: '我的拼团'
      },
    },
    {
      path: '/address',
      name: 'address',
      component: address,
      meta: {
        title: '我的地址'
      },
    },
    {
      path: '/ads_select',
      name: 'ads_select',
      component: ads_select,
      meta: {
        title: '选择地址'
      },
    },
    {
      path: '/ads_add',
      name: 'ads_add',
      component: ads_add,
      meta: {
        title: '添加地址'
      },
    },
    {
      path: '/order_dt',
      name: 'order_dt',
      component: order_dt,
      meta: {
        title: '订单详情'
      },
    },
    {
      path: '/activity',
      name: 'activity',
      component: activity,
      meta: {
        title: '拼团'
      },
    },
    {
      path: '/payment',
      name: 'payment',
      component: payment,
      meta: {
        title: '支付'
      },
    }
  ]
})
