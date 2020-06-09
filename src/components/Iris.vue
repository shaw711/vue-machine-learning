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
      <div class="plot1" ref="plot1"></div>
      <div class="plot2" ref="plot2"></div>
      <div class="plot3" ref="plot3"></div>
    </div>
    <div id="train-wrapper">
      <button @click="RFtrain">Random Forest</button> |
      <button @click="Knntrain">Knn</button> |
      <button @click="Svmtrain">SVM</button> |
      <button @click="DTtrain">Decision Tree</button>
    </div>
    <div ref="plot4" class="plot4"></div>
  </div>
</template>

<script>
import IrisDataset from 'ml-dataset-iris'
import Plotly from 'plotly.js-dist'
import { RandomForestClassifier as RFClassifier } from 'ml-random-forest'
import KNN from 'ml-knn'
import SVM from 'libsvm-js/asm'
import { DecisionTreeClassifier as DTClassifier } from 'ml-cart'

export default {
  data () {
    return {
      labels: [],
      dataset: [],
      rownames: [],
      showdata: []
    }
  },
  methods: {
    RFtrain () {
      const options = {
        seed: 3,
        maxFeatures: 0.8,
        replacement: true,
        nEstimators: 25
      }
      const classifier = new RFClassifier(options)
      classifier.train(this.dataset, this.labels.slice(0, 130))
      const result = classifier.predict(this.dataset)
      var sum1 = result.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var sum2 = this.labels.slice(0, 130).reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var trace1 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum1),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace2 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum2),
        name: 'True Value',
        type: 'bar'
      }
      const plot4 = this.$refs.plot4
      var data = [trace1, trace2]
      var layout = { barmode: 'group' }
      Plotly.newPlot(plot4, data, layout)
    },
    Knntrain () {
      const knn = new KNN(this.dataset, this.labels.slice(0, 130))
      const ans = knn.predict(this.dataset)
      console.log(ans)
      var sum1 = ans.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var sum2 = this.labels.slice(0, 130).reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var trace1 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum1),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace2 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum2),
        name: 'True Value',
        type: 'bar'
      }
      const plot4 = this.$refs.plot4
      var data = [trace1, trace2]
      var layout = { barmode: 'group' }
      Plotly.newPlot(plot4, data, layout)
    },
    Svmtrain () {
      const options = {
        kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
        degree: 3
      }
      const svm = new SVM(options)
      svm.train(this.dataset, this.labels.slice(0, 130))
      const result = svm.predict(this.dataset)
      var sum1 = result.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var sum2 = this.labels.slice(0, 130).reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var trace1 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum1),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace2 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum2),
        name: 'True Value',
        type: 'bar'
      }
      const plot4 = this.$refs.plot4
      var data = [trace1, trace2]
      var layout = { barmode: 'group' }
      Plotly.newPlot(plot4, data, layout)
    },
    DTtrain () {
      var options = {
        gainFunction: 'gini',
        maxDepth: 10,
        minNumSamples: 3
      }
      var classifier = new DTClassifier(options)
      classifier.train(this.dataset, this.labels.slice(0, 130))
      var result = classifier.predict(this.dataset)
      console.log(result)
      var sum1 = result.reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var sum2 = this.labels.slice(0, 130).reduce(function (prev, next) {
        prev[next] = prev[next] + 1 || 1
        return prev
      }, {})
      var trace1 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum1),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace2 = {
        x: ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica'],
        y: Object.values(sum2),
        name: 'True Value',
        type: 'bar'
      }
      const plot4 = this.$refs.plot4
      var data = [trace1, trace2]
      var layout = { barmode: 'group' }
      Plotly.newPlot(plot4, data, layout)
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
