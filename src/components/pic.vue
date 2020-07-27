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
    //  var d3 = Plotly.d3
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
      const TESTER = this.$refs.tester
      // var plotdata = [trace1, trace2, trace3, trace4, trace5, trace6]
      var plotdata = [
        {
          x: X_0,
          y: Y_0,
          mode: 'markers',
          name: 'class A'

        }, {
          x: X_1,
          y: Y_1,
          mode: 'markers',
          name: 'class B'
        }, {
          x: X_2,
          y: Y_2,
          mode: 'markers',
          name: 'class C'
        }, {
          x: X_3,
          y: Y_3,
          mode: 'markers',
          name: 'class D'
        }, {
          x: X_4,
          y: Y_4,
          mode: 'markers',
          name: 'class F'
        }, {
          x: X_5,
          y: Y_5,
          mode: 'markers',
          name: 'class E'
        }
      ]
      // var layout = {
      //   shapes: [
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_0),
      //       y0: d3.min(Y_0),
      //       x1: d3.max(X_0),
      //       y1: d3.max(Y_0),
      //       opacity: 0.8,
      //       fillcolor: 'blue',
      //       line: {
      //         color: 'blue'
      //       }
      //     },
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_1),
      //       y0: d3.min(Y_1),
      //       x1: d3.max(X_1),
      //       y1: d3.max(Y_1),
      //       opacity: 0.8,
      //       fillcolor: 'orange',
      //       line: {
      //         color: 'orange'
      //       }
      //     },
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_2),
      //       y0: d3.min(Y_2),
      //       x1: d3.max(X_2),
      //       y1: d3.max(Y_2),
      //       opacity: 1,
      //       fillcolor: 'black',
      //       line: {
      //         color: 'black'
      //       }
      //     },
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_3),
      //       y0: d3.min(Y_3),
      //       x1: d3.max(X_3),
      //       y1: d3.max(Y_3),
      //       opacity: 0.2,
      //       fillcolor: 'red',
      //       line: {
      //         color: 'red'
      //       }
      //     },
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_4),
      //       y0: d3.min(Y_4),
      //       x1: d3.max(X_4),
      //       y1: d3.max(Y_4),
      //       opacity: 0.2,
      //       fillcolor: 'yellow',
      //       line: {
      //         color: 'yellow'
      //       }
      //     },
      //     {
      //       type: 'circle',
      //       xref: 'x',
      //       yref: 'y',
      //       x0: d3.min(X_5),
      //       y0: d3.min(Y_5),
      //       x1: d3.max(X_5),
      //       y1: d3.max(Y_5),
      //       opacity: 0.2,
      //       fillcolor: 'rgb(128, 0, 128)',
      //       line: {
      //         color: 'rgb(128, 0, 128)'
      //       }
      //     }
      //   ],
      //   showlegend: true
      // }
      console.log(X_2)
      console.log(Y_2)
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
