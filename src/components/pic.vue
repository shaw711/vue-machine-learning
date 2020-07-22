<template>
  <div id="app">
    <div class="image">
      <div id="tester" ref="tester"></div>
    </div>
    <div class="main-wrapper">
      <div class="button-wrapper">
        <font font-family = "sans-serif" class="word">Max Values of classes</font>
        <el-row class="button">
          <el-button type="primary"
          v-for="(item, index) of classes" v-bind:key = "index"
          @click="changeClass($event)" ref="classes" id="classed">{{item}}</el-button>
        </el-row>
      </div>
      <div>
        <font font-family = "sans-serif" class="word">Num Neighbors (K)</font>
        <el-row class="button">
          <el-button type="primary" v-for="(item, index) of Neighbors"
          v-bind:key = "index"
           @click="changek($event)">{{item}}</el-button>
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
import KNN from 'ml-knn'
export default {
  data () {
    return {
      classes: [2, 3, 4, 5, 6],
      Neighbors: [1, 2, 3, 4, 5, 6, 7, 8],
      points: [20, 30, 40, 50, 60],
      K: 4,
      class: 3,
      dataset: [
        [5, 5],
        [3, 3],
        [7, 7],
        [8.5, 8.5],
        [9, 9],
        [9.3, 9.5]
      ],
      predictions: [0, 0, 0, 1, 1, 1],
      arrX: [],
      arrY: [],
      data: [
        [5, 5],
        [3, 3],
        [7, 7],
        [8.5, 8.5],
        [9, 9],
        [9.3, 9.5]
      ],
      plotData: []
    }
  },
  methods: {
    changeClass (event) {
      this.class = event.currentTarget.childNodes[2].innerHTML
      for (var i = 0; i < 6; i++) {
        this.predictions[i] = Math.abs(Math.floor(Math.random() * this.class))
      }
      this.predict(this.data, this.K)
    },
    changek (event) {
      this.K = event.currentTarget.childNodes[2].innerHTML
      this.predict(this.data, this.K)
    },
    changePoints (event) {
      const nums = event.currentTarget.childNodes[2].innerHTML
      this.arrX = Array.from({ length: nums }, () => Math.floor(Math.random() * 20))
      this.arrY = Array.from({ length: nums }, () => Math.floor(Math.random() * 20))
      this.data = this.array_hebing(this.arrX, this.arrY)
      this.predict(this.data, this.K)
    },
    array_hebing (arr1, arr2) {
      var result = []
      for (var i = 0; i < arr1.length; i++) {
        result.push([arr1[i], arr2[i]])
      }
      return result
    },
    predict (data, k) {
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
      var X_5 = []
      var Y_5 = []
      var options = {
        k: k
      }
      var knn = new KNN(this.dataset, this.predictions, options)
      var ans = knn.predict(data)
      for (var i = 0; i < ans.length; i++) {
        this.data[i].push(ans[i])
      }
      for (const elem of this.data.values()) {
        if (elem[2] === 0) {
          X_0.push(elem[0])
          Y_0.push(elem[1])
        } else if (elem[2] === 1) {
          X_1.push(elem[0])
          Y_1.push(elem[1])
        } else if (elem[2] === 2) {
          X_2.push(elem[0])
          Y_2.push(elem[1])
        } else
        if (elem[2] === 3) {
          X_3.push(elem[0])
          Y_3.push(elem[1])
        } else
        if (elem[2] === 4) {
          X_4.push(elem[0])
          Y_4.push(elem[1])
        } else
        if (elem[2] === 5) {
          X_5.push(elem[0])
          Y_5.push(elem[1])
        }
      }
      var trace1 = {
        x: X_0,
        y: Y_0,
        mode: 'markers',
        type: 'scatter',
        name: 'class A',
        marker: { size: 12 }
      }
      var trace2 = {
        x: X_1,
        y: Y_1,
        mode: 'markers',
        type: 'scatter',
        name: 'class B',
        marker: { size: 12 }
      }
      var trace3 = {
        x: X_2,
        y: Y_2,
        mode: 'markers',
        type: 'scatter',
        name: 'class C',
        marker: { size: 12 }
      }
      var trace4 = {
        x: X_3,
        y: Y_3,
        mode: 'markers',
        type: 'scatter',
        name: 'class D',
        marker: { size: 12 }
      }
      var trace5 = {
        x: X_4,
        y: Y_4,
        mode: 'markers',
        type: 'scatter',
        name: 'class E',
        marker: { size: 12 }
      }
      var trace6 = {
        x: X_5,
        y: Y_5,
        mode: 'markers',
        type: 'scatter',
        name: 'class F',
        marker: { size: 12 }
      }
      const TESTER = this.$refs.tester
      var plotdata = [trace1, trace2, trace3, trace4, trace5, trace6]
      Plotly.newPlot(TESTER, plotdata)
    }
  },
  mounted: function () {
    this.predict(this.data, this.K)
  }

}
</script>

<style lang="stylus">
.main-wrapper
  position absolute
  left 200px
  top 500px
  .word
    margin-left 50px
  .button
    margin-top 20px
    margin-bottom 20px
</style>
