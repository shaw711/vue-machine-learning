<template>
  <div id="app">
    <div class="word-wrapper">
    </div>
    <div class="image">
      <div id="tester" ref="tester"></div>
    </div>
    <div class="main-wrapper">
      <div>
        <font font-family = "sans-serif" class="word">Maximum values of Classes</font>
        <el-row class="button">
          <el-button type="primary" v-for="(item, index) of classes"
          v-bind:key = "index"
           @click="changek($event)">{{item}}</el-button>
        </el-row>
      </div>
       <div class="button-wrapper">
        <font font-family = "sans-serif" class="word">Generate centers Randomly</font>
        <el-row class="button">
          <el-button type="primary"
          @click="generateRandom($event)" ref="classes" id="classed">Begin</el-button>
        </el-row>
      </div>
       <div>
        <font font-family = "sans-serif" class="word">Num points</font>
        <el-row class="button">
          <el-button type="primary" v-for="(item, index) of points"
           v-bind:key = "index"
           @click="changePoints($event)">{{item}}</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from 'plotly.js-dist'
import kmeans from 'ml-kmeans'

export default {
  data () {
    return {
      classes: [2, 3, 4, 5],
      points: [20, 40, 60, 80],
      K: 5,
      class: 3,
      dataset: [
        [1.5, 1.5],
        [4, 5],
        [6, 4.5],
        [5.5, 3.5],
        [25, 27],
        [24.5, 23.5],
        [29, 26],
        [26, 27],
        [45, 45],
        [46.5, 47],
        [48, 49.5],
        [47, 48.5],
        [66, 67],
        [68, 66],
        [66.2, 67],
        [67, 66.5],
        [85, 88],
        [87.2, 86],
        [88.3, 89.5],
        [89.2, 85],
        [1.3, 2.5],
        [4.5, 7.5],
        [8, 2.5],
        [5.8, 4.5],
        [23.2, 24.3],
        [25.3, 21.8],
        [26.9, 27.2],
        [28.8, 26.7],
        [47.5, 48.6],
        [48.4, 46.9],
        [43.6, 48.7],
        [47.2, 48.5],
        [67.5, 63.2],
        [64.7, 68.5],
        [61.2, 69.3],
        [64.1, 67.6],
        [83.4, 87.3],
        [89.1, 85.7],
        [84.4, 85.9],
        [87.4, 86.5],
        [6.3, 4.7],
        [3.5, 5.2],
        [6.7, 4.8],
        [7.32, 8.33],
        [28.2, 23.72],
        [21.99, 24.57],
        [28.32, 26.97],
        [29.01, 24.76],
        [42.61, 43.56],
        [46.23, 44.22],
        [45.12, 47.7],
        [48.78, 43.56],
        [63.55, 68.32],
        [64.78, 66.42],
        [61.99, 68.03],
        [62.35, 69.6],
        [82.88, 88.33],
        [89.22, 80.7],
        [84.05, 85.55],
        [88.32, 82.32],
        [2.3, 7.6],
        [1.2, 8.5],
        [6.9, 3.333],
        [8.5656, 1.33],
        [29.221, 20.72],
        [22.39, 27.57],
        [27.1212, 22.97],
        [28.01, 22.36],
        [41.311, 49.56],
        [45.23, 44.3232],
        [44.12, 46.7],
        [49.78, 40.56],
        [60.55, 69.32],
        [61.78, 68.42],
        [63.99, 66.03],
        [65.35, 65.6],
        [80.88, 89.33],
        [82.22, 88.7],
        [84.05, 86.55],
        [88.32, 80.32]
      ],
      plotData: [],
      nums: 0,
      centers: [[1, 5], [8, 20]]
    }
  },
  methods: {
    hebing (arr1, arr2) {
      var result = []
      for (var i = 0; i < arr1.length; i++) {
        result.push([arr1[i], arr2[i]])
      }
      return result
    },
    generateRandom (event) {
      const X = Array.from({ length: this.K }, v => Math.floor(Math.random() * 100))
      const Y = Array.from({ length: this.K }, v => Math.floor(Math.random() * 100))
      this.centers = this.hebing(X, Y)
    },

    changek (event) {
      this.K = event.currentTarget.childNodes[2].innerHTML
    },
    changePoints (event) {
      this.nums = event.currentTarget.childNodes[2].innerHTML
      var data = this.dataset.slice(0, this.nums)
      this.plotData = data
      const classes = Number(this.K)
      this.predict(this.plotData, classes, this.centers)
    },
    predict (data, K, center) {
      var res = kmeans(data, K, { initialization: center }).clusters
      var train = data
      var centerX = []
      var centerY = []
      this.centers.forEach(elem => {
        centerX.push(elem[0])
        centerY.push(elem[1])
      })
      var X_0 = []
      var Y_0 = []
      var X_1 = []
      var Y_1 = []
      var X_2 = []
      var Y_2 = []
      var X_3 = []
      var Y_3 = []
      var X_4 = []
      var Y_4 = []
      for (var i = 0; i < res.length; i++) {
        if (res[i] === 0) {
          X_0.push(train[i][0])
          Y_0.push(train[i][1])
        } else
        if (res[i] === 1) {
          X_1.push(train[i][0])
          Y_1.push(train[i][1])
        } else
        if (res[i] === 2) {
          X_2.push(train[i][0])
          Y_2.push(train[i][1])
        } else
        if (res[i] === 3) {
          X_3.push(train[i][0])
          Y_3.push(train[i][1])
        } else
        if (res[i] === 4) {
          X_4.push(train[i][0])
          Y_4.push(train[i][1])
        }
      }
      const TESTER = this.$refs.tester
      var trace0 = {
        x: centerX,
        y: centerY,
        mode: 'markers+text',
        type: 'scatter',
        marker: { size: 20 },
        name: 'centers',
        text: ['center', 'center', 'center', 'center', 'center']
      }
      var trace1 = {
        x: X_0,
        y: Y_0,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 },
        name: 'Class A'
      }
      var trace2 = {
        x: X_1,
        y: Y_1,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 },
        name: 'Class B'
      }

      var trace3 = {
        x: X_2,
        y: Y_2,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 },
        name: 'Class C'
      }

      var trace4 = {
        x: X_3,
        y: Y_3,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 },
        name: 'Class D'
      }

      var trace5 = {
        x: X_4,
        y: Y_4,
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12 },
        name: 'Class F'
      }
      var pdata = [trace0, trace1, trace2, trace3, trace4, trace5]
      Plotly.newPlot(TESTER, pdata)
    }
  },
  mounted: function () {
    var initData = this.dataset.slice(0, 20)
    var classess = 2
    var zhongxin = [[1, 5], [8, 20]]
    this.predict(initData, classess, zhongxin)
  }

}
</script>

<style lang="stylus">
.main-wrapper
  position absolute
  left 200px
  top 550px
  .word
    margin-left 50px
  .button
    margin-top 10px
    margin-bottom 10px
</style>
