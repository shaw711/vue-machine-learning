import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import '../src/assets/theme/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale })

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
