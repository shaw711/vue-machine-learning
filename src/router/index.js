import Vue from 'vue'
import VueRouter from 'vue-router'
import intro from '../components/Intro'
import cus from '../components/Custom page/page'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  component: intro,
  meta: {
    title: ' Vue Web App for Machine Learning'
  }

},
{ path: '/page', component: cus },
{ path: '/intro', component: intro }
]

const router = new VueRouter({
  routes
})

export default router
