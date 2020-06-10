<template>
  <div id="app">
     <div id="nav-algorithm">
       <h2>algorithm</h2>
      <router-link to="/linear">Linear Regression</router-link> |
      <router-link to="/knn">KNN</router-link> |
      <router-link to="/km">Kmeas</router-link>

    </div>
    <div id="nav-case-study">
      <h2>Case Study</h2>
      <router-link to="/titanic">Titanic</router-link> |
      <router-link to="/iris">Iris</router-link> |
      <router-link to="/leaf">Leaf</router-link>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      notshow: false
    }
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
