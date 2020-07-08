<template>
    <div id="kmeans">
      <div class="title-wrapper">
        <h1 class="title">Introduction to K-means Clustering</h1>
      </div>
      <div class="content-wrapper">
        <p class="content">The Κ-means clustering algorithm uses iterative refinement to produce a final result. The algorithm inputs are the number of clusters Κ and the data set. The data set is a collection of features for each data point. The algorithms starts with initial estimates for the Κ centroids, which can either be randomly generated or randomly selected from the data set.
          The algorithm then iterates between 3 steps:
        </p>
        <p class="content">
          1. First we initialize k points, called means, randomly.
        </p>
        <p class="content">
          2. We categorize each item to its closest mean and we update the mean’s coordinates, which are the averages of the items categorized in that mean so far.
        </p>
        <p class="content">
          3. We repeat the process for a given number of iterations and at the end, we have our clusters.
        </p>
      </div>
      <div class="img-wrapper">
        <img class="img" src="https://miro.medium.com/max/1400/1*OiB2cSYSO4W0LHR9_I-n7A.png">
      </div>
      <div class="table-wrapper">
        <div class="table1">
          <table>
            <h4>dataset</h4>
            <tr>
              <td>x</td>
              <td>y</td>
            </tr>
            <tr v-for="(item,id) of dataset" :key="id">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </table>
        </div>
        <div class="table2">
          <table>
            <h4>centers</h4>
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
      </div>
      <div class="intreactive-wrapper">
        <div class="input-wrapper">
          add <input type="text" class="input" ref="input" value="2.5, 2.5">
          <button class="add" @click="add" ref="add">Add</button>
        </div>
        <div class="initalplot" ref="initalplot"></div>
        <div class="result-wrapper">
          <button @click="train">Train</button> |
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
.table-wrapper
  margin-top 50px
  .table1
    margin-left 400px
  .table2
    margin-top -180px
    margin-left 900px
</style>
