import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _436fc487 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _ff9b1d08 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _f357f328 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _1a92ebec = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _015d2f39 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _6deabb80 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _37a0eaca = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))

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
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _436fc487,
    children: [{
      path: "",
      component: _ff9b1d08,
      name: "home"
    }, {
      path: "/home",
      component: _ff9b1d08
    }, {
      path: "/login",
      component: _f357f328,
      name: "login"
    }, {
      path: "/register",
      component: _f357f328,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _1a92ebec,
      name: "profile"
    }, {
      path: "/article/:slug",
      component: _015d2f39,
      name: "article"
    }, {
      path: "/settings",
      component: _6deabb80,
      name: "settings"
    }, {
      path: "/editor/:slug?",
      component: _37a0eaca,
      name: "editor"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
