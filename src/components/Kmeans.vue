<template>
    <div @click="train" id="kmeans">111</div>
</template>

<script>
import kmeans from 'ml-kmeans'
export default {
  methods: {
    train () {
      const data = [[1, 1], [1, 2], [-1, -1], [-1, -1]]
      const centers = [[1, 2], [-1, -1]]
      const ans = kmeans(data, 2, { initialization: centers })
      console.log(ans)
    }
  }

}
</script>

<style lang="stylus">

</style>
