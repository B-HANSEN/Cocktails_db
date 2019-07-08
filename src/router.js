import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterBackButton from 'vue-router-back-button'


Vue.use(VueRouter);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    position.x = 0
    position.y = 0
  }
  return position
}


const router = new VueRouter({
  mode: 'history',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/cocktail/:id',
      name: 'Details',
      component: () => import('./views/Details.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: () => import('./views/Chatroom.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/Profile.vue')
    },

  ]
})

Vue.use(VueRouterBackButton, {
  router
})

export default router;