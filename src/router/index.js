import Vue from 'vue'
import VueRouter from 'vue-router'
import LinearRegression from '../components/Algorithm/LinearRegression'
import Knn from '../components/Algorithm/knn'
import Kmeans from '../components/Algorithm/Kmeans'
import iris from '../components/case/Iris'
// import leaf from '../components/case/leaf'
import intro from '../components/Intro'
import pic from '../components/pic'
import pic2 from '../components/pic2'
import svm from '../components/Algorithm/Svm'
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
{ path: '/linear', component: LinearRegression },
{ path: '/knn', component: Knn },
{ path: '/km', component: Kmeans },
{ path: '/iris', component: iris },
// { path: '/leaf', component: leaf },
{ path: '/intro', component: intro },
{ path: '/pic', component: pic },
{ path: '/pic2', component: pic2 },
{ path: '/svm', component: svm },
{ path: '/page', component: cus }
]

const router = new VueRouter({
  routes
})

export default router
