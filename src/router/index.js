import Vue from 'vue'
import VueRouter from 'vue-router'
import LinearRegression from '../components/LinearRegression'
import Knn from '../components/knn'
import Kmeans from '../components/Kmeans'
import iris from '../components/Iris'
import leaf from '../components/leaf'

Vue.use(VueRouter)

const routes = [
  { path: '/linear', component: LinearRegression },
  { path: '/knn', component: Knn },
  { path: '/km', component: Kmeans },
  { path: '/iris', component: iris },
  { path: '/leaf', component: leaf }
]

const router = new VueRouter({
  routes
})

export default router
