import Vue from 'vue'
import VueRouter from 'vue-router'
import LinearRegression from '../components/LinearRegression'
import Knn from '../components/knn'
import Kmeans from '../components/Kmeans'

Vue.use(VueRouter)

const routes = [
  { path: '/linear', component: LinearRegression },
  { path: '/knn', component: Knn },
  { path: '/km', component: Kmeans }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
