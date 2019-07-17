import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterBackButton from 'vue-router-back-button'


Vue.use(VueRouter);


const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {
      x: 0,
      y: 0
    }
    return position
  }
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
      path: '/cocktail/:idDrink',
      name: 'Details',
      component: () => import('./views/Details.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/chatrooms',
      name: 'chatrooms',
      component: () => import('./views/Chatrooms.vue')
    },
    {
      path: '/chatroom/:id',
      props: true,
      name: 'Chatroom',
      component: () => import('./views/Chatroom.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('./views/Profile.vue')
    }
  ]
})

Vue.use(VueRouterBackButton, {
  router
})



export default router