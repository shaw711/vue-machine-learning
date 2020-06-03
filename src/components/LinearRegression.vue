<template>
    <div>
        <h1>Linear Regression</h1>
        <div>
            X: <input type="text" id="x" ref="input_x" value="20,30,39"><br>
            Y: <input type="text" id="y" ref="input_y" value="40,60,80"><br>
            <button @click="process">submit</button><br>
            Predict Function: <p ref='response'></p>
        </div>
        <div>
          <h3>Predict value</h3> <input type="text" ref="pred" value="35">
          <button @click="predict" >Predict</button>
        </div>
        <div id="tester" ref="tester"></div><br>
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
      inputx: 0,
      inputy: 0,
      yPred: []
    }
  },
  methods: {
    process () {
      this.inputx = this.$refs.input_x.value.split(',')
      this.inputy = this.$refs.input_y.value.split(',')
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
      console.log(PredY)
      const TESTER = this.$refs.tester
      var trace1 = {
        x: this.inputx,
        y: this.inputy,
        mode: 'markers',
        name: 'points',
        marker: {
          color: 'rgb(219, 64, 82)',
          size: 12
        }
      }
      var trace2 = {
        x: this.input,
        y: this.yPred,
        mode: 'line',
        name: 'Regression Function',
        line: {
          color: 'rgb(55, 128, 191)',
          width: 3
        }
      }
      var trace3 = {
        x: predictVlue,
        y: [PredY],
        mode: 'markers',
        type: 'scatter',
        name: 'Predict value',
        marker: {
          color: 'rgb(110, 62, 65)',
          size: 12
        }
      }
      var data = [trace1, trace2, trace3]
      Plotly.newPlot(TESTER, data)
    }
  }
}
</script>

<style lang="stylus">

</style>
