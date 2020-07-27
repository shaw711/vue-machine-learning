<template>
    <div>
      <div class="title-wrapper">
        <h1 class="title">Linear Regression</h1>
      </div>
      <div class="content-wrapper">
        <p class="content">
           Linear regression is used for finding linear relationship between target and one or more predictors. There are two types of linear regression- Simple and Multiple.
        </p>
        <p class="content">
          The core idea is to obtain a line that best fits the data. The best fit line is the one for which total prediction error (all data points) are as small as possible.
           Error is the distance between the point to the regression line. <font style="font-weight:bold">We estimate the line by some points.</font>
        </p>
        <p class="content">
          We can explore a simple Linear Regression with mathematics.
        </p>
        <p>
          ŷ = b0 + b1x
        </p>
        <p class="content">
          Where b0 is a constant, b1 is the regression coefficient, x is the value of the independent variable, and ŷ is the predicted value of the dependent variable
        </p>
        <p class="content">
          Normally, you will use a computational tool - a software package (e.g., Excel) or a graphing calculator - to find b0 and b1.
           You enter the X and Y values into your program or calculator, and the tool solves for each parameter.
        </p>
        <p class="content">
          But for me, the best way to solve using a matrix
        </p>
        <el-image src="https://miro.medium.com/max/236/1*rwgC2rwbjaGqR4YSGXCuow.png"></el-image>
        <p class="content">Theta contains co-efficient of all predictors including constant term ‘b0’. Normal equation performs computation by taking inverse of input matrix. Complexity of the computation will increase as the number of features increase. It gets very slow when number of features grow large.
        </p>
      </div>
      <div class="intreactive">
        <h2 class="title">Interactive graphics</h2>
        <div class="title-notes">
          <p style="margin-left:20px">Notes: Use <font style="font-weight:bold">input and submit</font> to generate the data. Then use <font style="font-weight">predict</font> to train the model and see the result. </p>
        </div>
        <div  class="intreactive-wrapper">
            <div class="input-wrapper">
              X: <input type="text" id="x" ref="input_x" value="20,30,39" class="input"><br>
              Y: <input type="text" id="y" ref="input_y" value="40,60,80" class="input"><br>
              <button @click="process">submit</button><br>
            </div>
            <div class="plot-wrapper">
              <div id="tester" ref="tester"></div><br>
            </div>
            Predict Function: <p ref='response'></p>
            <div>
              <h3>Predict value</h3> <input type="text" ref="pred" value="35">
              <button @click="predict" style="margin-bottom:30px">Predict</button><br>
              <div id="tester1" ref="tester1"></div><br>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import SimpleLinearRegression from 'ml-regression-simple-linear'
import Plotly from 'plotly.js-dist'
export default {
  name: 'LinearRegression',
  data () {
    return {
      Slope: 0,
      Intercept: 0,
      inputx: [],
      inputy: [],
      yPred: []
    }
  },
  methods: {
    process () {
      this.inputx = this.$refs.input_x.value.split(',')
      this.inputy = this.$refs.input_y.value.split(',')
      this.plot(this.inputx, this.inputy)
      const regression = new SimpleLinearRegression(this.inputx, this.inputy)
      for (const i of this.inputx) {
        this.yPred.push(regression.slope * i + regression.intercept)
      }
      if (this.inputx.length !== this.inputy.length) {
        alert('Please make sure x=y')
      }
      if (regression.intercept >= 0) {
        this.symbol = '+'
      } else {
        this.symbol = '-'
      }
      this.Slope = regression.slope
      this.Intercept = regression.intercept
      this.$refs.response.innerHTML = 'The predict function:' + regression.slope + '*x ' + this.symbol + regression.intercept
    },
    predict () {
      const predictVlue = this.$refs.pred.value.split(',')
      const PredY = predictVlue * this.Slope + this.Intercept
      alert(PredY)
      const TESTER1 = this.$refs.tester1
      var trace1 = {
        x: this.inputx,
        y: this.inputy,
        mode: 'line',
        name: 'line',
        marker: {
          color: 'rgb(219, 64, 82)',
          size: 12
        }
      }
      var trace2 = {
        x: predictVlue,
        y: [PredY],
        mode: 'markes',
        name: 'PredictValue',
        marker: {
          color: 'blue',
          size: 15
        }
      }
      var data = [trace1, trace2]
      Plotly.newPlot(TESTER1, data)
    },
    plot (x, y) {
      const TESTER = this.$refs.tester
      var trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        name: 'points',
        marker: {
          color: 'rgb(219, 64, 82)',
          size: 12
        }
      }
      var data = [trace1]
      Plotly.newPlot(TESTER, data)
    }
  },
  mounted: function () {
    this.inputx = this.$refs.input_x.value.split(',')
    this.inputy = this.$refs.input_y.value.split(',')
    this.plot(this.inputx, this.inputy)
  },
  updated: function () {
    this.plot(this.inputx, this.inputy)
  }
}
</script>

<style lang="stylus">
  .title-wrapper
    margin-top 50px
    .title
      text-align: center
  .content-wrapper
    display flex
    flex-direction column
    justify-content center
    align-items center
    margin-top 50px
    .content
      width 80%
      font-size 18px
      font-family Verdana
  .intreactive
    margin 0 auto
    text-align center
    .input-wrapper
      margin-top 30px
      .input
        margin-bottom 5px
</style>
