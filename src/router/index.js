import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  // mapping relationship: path => component
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import("@/views/home/home.vue")
    },
    {
      path: '/favor',
      component: () => import("@/views/favor/favor.vue")
    },
    {
      path: '/order',
      component: () => import("@/views/order/order.vue")
    },
    {
      path: '/message',
      component: () => import("@/views/message/message.vue"),
      meta: {
        hideTabbar: true
      }
    },
    {
      path: '/city',
      component: () => import("@/views/city/city.vue"),
      /** 在开发中常用到的一种方案: 当进行路由切换的时候,如果界面上有些东西显示的不一样,可以用route这个对象来完成需要的操作;
       其它路由,因为没有设置meta,其中的meta.hideTabbar拿到的值是undefined,取反就为true,tabbar就可以显示出来
      meta: {
        hideTabbar: true
      }
      */
    },
    {
      path: '/search',
      component: () => import('@/views/search/search.vue'),
      meta: {
        hideTabbar: true
      }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/detail/detail.vue')
    }
  ]
})

export default router