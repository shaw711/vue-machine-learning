<template>
  <div id="app">
    <div id="table-wrapper">
      <table>
        <tr>
          <td v-for="(rowname,id) of rownames" :key="id">{{rowname}}</td>
        </tr>
        <tr v-for="(item, index0) of showdata" :key="index0">
          <td v-for="(a,index1) of item" :key="index1">{{a}}</td>
        </tr>
      </table>
    </div>
    <div class="plot-wrapper">
      <div class="plot1" ref="plot1">
      <div class="plot2" ref="plot2">
      <div class="plot3" ref="plot3">
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import IrisDataset from 'ml-dataset-iris'
import Plotly from 'plotly.js-dist'

export default {
  data () {
    return {
      labels: [],
      dataset: [],
      rownames: [],
      showdata: []
    }
  },
  created: function () {
    this.labels = IrisDataset.getClasses().map((elem) =>
      IrisDataset.getDistinctClasses().indexOf(elem)
    )
    this.dataset = IrisDataset.getNumbers()
    this.rownames = ['Sepal length', 'Sepal width', 'Petal length', 'Petal width']
    this.showdata = this.dataset.splice(1, 20)
  },
  mounted: function () {
    const points = []
    const trace1 = {
      y: this.dataset.map(item => { return item[0] }),
      type: 'box',
      name: 'Sepal length'
    }
    const trace2 = {
      y: this.dataset.map(item => { return item[1] }),
      type: 'box',
      name: 'Sepal width'
    }
    const trace3 = {
      y: this.dataset.map(item => { return item[2] }),
      type: 'box',
      name: 'Petal length'
    }
    const trace4 = {
      y: this.dataset.map(item => { return item[3] }),
      type: 'box',
      name: 'Petal width'
    }
    var data1 = [trace1, trace2, trace3, trace4]
    const plot1 = this.$refs.plot1
    Plotly.newPlot(plot1, data1)

    const trace5 = {
      x: this.dataset.map(item => { return item[0] }),
      y: this.dataset.map(item => { return item[1] }),
      type: 'scatter',
      mode: 'markers',
      name: 'Sepal length vs Sepal width'
    }

    const trace6 = {
      x: this.dataset.map(item => { return item[2] }),
      y: this.dataset.map(item => { return item[3] }),
      xaxis: 'x2',
      yaxis: 'y2',
      type: 'scatter',
      mode: 'markers',
      name: 'Petal length vs Petal width'
    }
    const layout1 = {
      grid: { rows: 1, columns: 2, pattern: 'independent' }
    }

    const data2 = [trace5, trace6]
    const plot2 = this.$refs.plot2
    Plotly.newPlot(plot2, data2, layout1)

    for (let i = 0; i < this.dataset.length; i++) {
      points.push(i)
    }
    const trace7 = {
      x: points,
      y: this.dataset.map(item => { return item[0] }),
      type: 'scatter',
      name: 'Sepal length'
    }
    const trace8 = {
      x: points,
      y: this.dataset.map(item => { return item[1] }),
      xaxis: 'x2',
      yaxis: 'y2',
      type: 'scatter',
      name: 'Sepal width'
    }
    const trace9 = {
      x: points,
      y: this.dataset.map(item => { return item[2] }),
      xaxis: 'x3',
      yaxis: 'y3',
      type: 'scatter',
      name: 'Petal length'
    }
    const trace10 = {
      x: points,
      y: this.dataset.map(item => { return item[3] }),
      xaxis: 'x4',
      yaxis: 'y4',
      type: 'scatter',
      name: 'Petal width'
    }
    var layout2 = {
      grid: {
        rows: 2,
        columns: 2,
        pattern: 'independent',
        roworder: 'bottom to top'
      }
    }
    const data3 = [trace7, trace8, trace9, trace10]
    const plot3 = this.$refs.plot3
    Plotly.newPlot(plot3, data3, layout2)
  }
}
</script>

<style>

</style>
