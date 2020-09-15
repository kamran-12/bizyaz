import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _419d2f59 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _e2846026 = () => interopDefault(import('../pages/new-post.vue' /* webpackChunkName: "pages/new-post" */))
const _3e62a8d8 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _3a77f02d = () => interopDefault(import('../pages/test_api.vue' /* webpackChunkName: "pages/test_api" */))
const _1596ffd6 = () => interopDefault(import('../pages/community/_url.vue' /* webpackChunkName: "pages/community/_url" */))
const _0739d7ea = () => interopDefault(import('../pages/post/_id.vue' /* webpackChunkName: "pages/post/_id" */))
const _e465379e = () => interopDefault(import('../pages/user/_username.vue' /* webpackChunkName: "pages/user/_username" */))
const _77f58c42 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _419d2f59,
    name: "login"
  }, {
    path: "/new-post",
    component: _e2846026,
    name: "new-post"
  }, {
    path: "/signup",
    component: _3e62a8d8,
    name: "signup"
  }, {
    path: "/test_api",
    component: _3a77f02d,
    name: "test_api"
  }, {
    path: "/community/:url?",
    component: _1596ffd6,
    name: "community-url"
  }, {
    path: "/post/:id?",
    component: _0739d7ea,
    name: "post-id"
  }, {
    path: "/user/:username?",
    component: _e465379e,
    name: "user-username"
  }, {
    path: "/",
    component: _77f58c42,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
