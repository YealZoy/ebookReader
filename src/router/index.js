import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import list from '@/components/list'
import read from '@/components/read'
import register from '@/components/register'
import upload from '@/components/upload'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/read',
      name: 'read',
      component: read
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
