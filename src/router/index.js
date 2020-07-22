import Vue from 'vue'
import VueRouter from 'vue-router'
import LinearRegression from '../components/LinearRegression'
import Knn from '../components/knn'
import Kmeans from '../components/Kmeans'
import iris from '../components/Iris'
import leaf from '../components/leaf'
import intro from '../components/Intro'
import pic from '../components/pic'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/linear', component: LinearRegression },
  { path: '/knn', component: Knn },
  { path: '/km', component: Kmeans },
  { path: '/iris', component: iris },
  { path: '/leaf', component: leaf },
  { path: '/intro', component: intro },
  { path: '/pic', component: pic }
]

const router = new VueRouter({
  routes
})

export default router
