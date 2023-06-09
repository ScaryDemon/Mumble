import {createRouter, createWebHashHistory} from 'vue-router'

import Authenticate from '@/views/AuthenticateView.vue';
import Dashboard from '@/views/DashboardView.vue'
import FriendRequest from '@/views/FriendrequestView.vue';
import Register from '@/views/RegisterView.vue';

const routes = [
    {
        path: '/',
        redirect:'/Dashboard'
    },
    {
        path: '/Authenticate',
        component: Authenticate
    },
    {
        path: '/Register',
        component: Register
    },
    {
      path: '/Dashboard',
      component: Dashboard
    },
    {
      path: '/FriendRequest',
      component: FriendRequest
    }
  ]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  router.beforeEach((to, from, next) => {
    const publicPages = ['/Authenticate', '/Register'];
    const authRequired = !publicPages.includes(to.path);
    let loggedIn;
    try{
      loggedIn = localStorage.getItem('token');
    }
    catch{
      console.log('nope')
    }
    
  
    if (authRequired && !loggedIn) {
      return next('/Authenticate');
    }
  
    next();
  })

export default router;