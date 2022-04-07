import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../http'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Login',
    component:() => import('../views/Login')
  },
  {
    path:'/admin',
    name:'Home',
    component:() => import('../views/Home'),
    children:[
      {
        path:'/admin/home',
        name:'Homes',
        component:() => import('../views/Home/home.vue'),
        meta: {
          title: '首页'
        },
      },
      {
        path:'/admin/user',
        name:'User',
        component:() => import('../views/User/user.vue'),
        meta: {
          title: '用户管理'
        },
      },
      {
        path:'/admin/admin',
        name:'Admin',
        component:() => import('../views/User/admin.vue'),
        meta: {
          title: '管理员管理'
        },
      },
      {
        path:'/admin/profile',
        name:'Profile',
        component:() => import('../views/User/index.vue'),
        meta: {
          title: '管理员档案'
        },
      },
      {
        path:'/admin/update',
        name:'Update',
        component:() => import('../views/User/update.vue'),
        meta: {
          title: '修改密码'
        },
      },
      {
        path:'/admin/notice',
        name:'Notice',
        component:() => import('../views/Notice/index.vue'),
        meta: {
          title: '公告管理'
        },
      },
      {
        path:'/admin/pay',
        name:'Pay',
        component:() => import('../views/Pay/index.vue'),
        meta: {
          title: '待缴费列表'
        },
      },
      {
        path:'/admin/pay/release',
        name:'Relese',
        component:() => import('../views/Pay/release.vue'),
        meta: {
          title: '发布缴费信息'
        },
      },
      {
        path:'/admin/pay/payorder',
        name:'PayOder',
        component:() => import('../views/Pay/payorder.vue'),
        meta: {
          title: '缴费订单'
        },
      },
      {
        path:'/admin/repairs',
        name:'Repairs',
        component:() => import('../views/Repairs/index.vue'),
        meta: {
          title: '待维修列表'
        },
      },
      {
        path:'/admin/repairs/indent',
        name:'RepairsIndent',
        component:() => import('../views/Repairs/indent.vue'),
        meta: {
          title: '维修订单'
        },
      },
      {
        path:'/admin/complaints',
        name:'Complaints',
        component:() => import('../views/Retroaction/index.vue'),
        meta: {
          title: '反馈管理'
        },
      },
      {
        path:'/admin/park',
        name:'Park',
        component:() => import('../views/Park'),
        meta: {
          title: '停车管理'
        },
      },
      {
        path:'/admin/advertising',
        name:'Advertising',
        component:() => import('../views/Advertising'),
        meta: {
          title: '广告管理'
        },
      },
      {
        path:'/admin/message',
        name:'Message',
        component:() => import('../views/Message'),
        meta: {
          title: '发布通知'
        },
      },
      {
        path:'/admin/message/oder',
        name:'MessageOder',
        component:() => import('../views/Message/messageoder.vue'),
        meta: {
          title: '通知列表'
        },
      },
    ]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
}) 

//重复点击导航时，控制台不会报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//路由的前置守卫
router.beforeEach( (to, from, next) => {
  document.title = '社区物业后台管理系统'
  next()

  if(localStorage.token){
    http({
      path:'api/user/check/personal',
      method:'post',
      params:{tel:localStorage.token}

    }).then(res =>{
      // console.log(res.data);
      store.commit('setUsername', res.data.data)
    })
  }
})

export default router
