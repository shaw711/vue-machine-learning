<template>
  <div id="app">
    <LinearRegression v-if="notshow"></LinearRegression>
    <knn></knn>
    <Kmeans v-if="notshow"></Kmeans>
  </div>
</template>

<script>
import LinearRegression from './components/LinearRegression'
import knn from './components/knn'
import Kmeans from './components/Kmeans'

export default {
  name: 'App',
  data () {
    return {
      notshow: false
    }
  },
  components: {
    LinearRegression,
    knn,
    Kmeans
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
