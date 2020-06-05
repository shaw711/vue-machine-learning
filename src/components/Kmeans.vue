<template>
    <div id="kmeans">
      <div class="data-wrapper">
        <div class="data">
          <table>
            <p>dataset</p>
            <tr>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr v-for="(item,id) of dataset" :key="id">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </table>
          <table>
            <p>centers</p>
            <tr>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr v-for="(item, id) of centers" :key="id">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </table>
        </div>
        <div class="input-wrapper">
          add <input type="text" class="input" ref="input" value="2.5, 2.5">
          <button class="add" @click="add" ref="add">Add</button>
        </div>
        <div class="train-wrapper">
          <button @click="train">Train</button>
        </div>
        <div class="initalplot" ref="initalplot"></div>
        <div class="result-wrapper">
          <button @click="Seeresult">See the Result</button>
        </div>
        <div class="resultplot" ref="resultplot"></div>
      </div>
    </div>
</template>

<script>
import kmeans from 'ml-kmeans'
import Plotly from 'plotly.js-dist'

export default {
  data () {
    return {
      dataset: [
        [1, 1], [0.5, 3], [-1, -2], [2, -1]
      ],
      centers: [[1, 2], [-1, -1]],
      clusters: []
    }
  },
  methods: {
    train () {
      const data = this.dataset
      const centers = this.centers
      const ans = kmeans(data, 2, { initialization: centers })
      this.clusters = ans.clusters
      console.log(ans)
    },
    add () {
      const newD = this.$refs.input.value.split(',')
      this.dataset.push(newD)
    },
    Seeresult () {
      const point0 = []
      const point1 = []
      for (let i = 0; i < this.clusters.length; i++) {
        if (this.clusters[i] === 0) {
          point0.push(i)
        } else {
          point1.push(i)
        }
      }
      const X = point0.map(item => {
        return this.dataset[item]
      })
      const Y = point1.map(item => {
        return this.dataset[item]
      })
      console.log(X.map(item => { return item[0] }))
      console.log(X.map(item => { return item[1] }))
      const trace1 = {
        x: X.map(item => { return item[0] }),
        y: X.map(item => { return item[1] }),
        mode: 'markers',
        type: 'scatter',
        name: 'Label 0',
        marker: { size: 12 }
      }
      const trace2 = {
        x: Y.map(item => { return item[0] }),
        y: Y.map(item => { return item[1] }),
        mode: 'markers',
        type: 'scatter',
        name: 'Label 1',
        marker: { size: 12 }
      }
      const resultplot = this.$refs.resultplot
      const data = [trace1, trace2]
      Plotly.newPlot(resultplot, data)
    }
  },
  mounted: function () {
    const trace1 = {
      x: this.dataset.map(item => { return item[0] }),
      y: this.dataset.map(item => { return item[1] }),
      mode: 'markers',
      type: 'scatter',
      name: 'Data',
      marker: { size: 12 }
    }
    const trace2 = {
      x: this.centers.map(item => { return item[0] }),
      y: this.centers.map(item => { return item[1] }),
      mode: 'markers',
      type: 'scatter',
      name: 'Centers',
      marker: { size: 12 }
    }
    const initalplot = this.$refs.initalplot
    const data = [trace1, trace2]
    Plotly.newPlot(initalplot, data)
  },
  updated: function () {
    const trace1 = {
      x: this.dataset.map(item => { return item[0] }),
      y: this.dataset.map(item => { return item[1] }),
      mode: 'markers',
      type: 'scatter',
      name: 'Data',
      marker: { size: 12 }
    }
    const trace2 = {
      x: this.centers.map(item => { return item[0] }),
      y: this.centers.map(item => { return item[1] }),
      mode: 'markers',
      type: 'scatter',
      name: 'Centers',
      marker: { size: 12 }
    }
    const initalplot = this.$refs.initalplot
    const data = [trace1, trace2]
    Plotly.newPlot(initalplot, data)
  }
}
</script>

<style lang="stylus">

</style>
