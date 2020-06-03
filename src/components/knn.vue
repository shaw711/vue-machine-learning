<template>
<div id="knn">
  <div class="table-wrapper">
    <table>
      <p>dataset</p>
      <tr>
        <td>x</td>
        <td>y</td>
      </tr>
      <tr v-for="(item,id) of dataset.length" :key="id">
        <td>{{dataset[id][0]}}</td>
        <td>{{dataset[id][1]}}</td>
      </tr>
    </table>
    <div class="label-wrapper">
      <a>label</a>
      <p>{{predictions}}</p>
    </div>
  </div>
  <div class="inputWarper">
    Ponits: <input type="text" id="x" ref="points" value="0.5,0.5"><br>
    Label: <input type="text" id="y" ref="label" value="0"><br>
  </div>
  <div class="add-wrapper"><button @click="add">Add</button></div>
  <div class="plot-wrapper"><button @click="plot">Plot</button></div>
  <div class="tester" ref="tester"></div>
</div>
</template>

<script>
import Plotly from 'plotly.js-dist'
export default {
  data () {
    return {
      dataset: [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 2],
        [1, 2],
        [2, 1]],
      predictions: [0, 0, 0, 1, 1, 1],
      Length: 6
    }
  },
  methods: {
    add () {
      const newData = this.$refs.points.value.split(',')
      const newpredictions = this.$refs.label.value
      this.dataset.push(newData)
      this.predictions.push(Number(newpredictions))
      this.Length = this.Length + 1
    },
    plot () {
      const X = []
      const Y = []
      const index0 = []
      const index1 = []
      const X0 = []
      const Y0 = []
      const X1 = []
      const Y1 = []
      for (let i = 0; i < this.predictions.length; i++) {
        if (this.predictions[i] === 0) {
          index0.push(i)
        } else {
          index1.push(i)
        }
      }
      for (const i of this.dataset) {
        X.push(Number(i[0]))
        Y.push(Number(i[1]))
      }
      index0.forEach(i => {
        X0.push(X[i])
        Y0.push(Y[i])
      })
      index1.forEach(i => {
        X1.push(X[i])
        Y1.push(Y[i])
      })
      const trace1 = {
        x: X0,
        y: Y0,
        mode: 'markers',
        type: 'scatter',
        name: 'Label 0',
        marker: { size: 12 }
      }
      const trace2 = {
        x: X1,
        y: Y1,
        mode: 'markers',
        type: 'scatter',
        name: 'Label 1',
        marker: { size: 12 }
      }
      const TESTER = this.$refs.tester
      const data = [trace1, trace2]
      Plotly.newPlot(TESTER, data)
    }
  }
}
</script>

<style lang="stylus">

</style>
