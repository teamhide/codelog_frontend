import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from './components/Feed.vue'
import Tag from './components/Tag.vue'
import Search from './components/Search.vue'
import Write from './components/Write.vue'
import Login from './components/Login.vue'
import About from './components/About.vue'
import PrivateFeed from './components/PrivateFeed.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Feed
      },
      {
        path: '/tags',
        component: Tag
      },
      {
        path: '/search',
        component: Search
      },
      {
        path: '/write',
        component: Write
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/private',
        component: PrivateFeed
      },
    ]
  })  