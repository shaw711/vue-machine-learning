<template>
<div id="knn">
  <div class="title-wrapper">
    <h1 class="title">Introduction to k-Nearest Neighbors: A powerful Machine Learning Algorithm</h1>
  </div>
  <div class="content-wrapper">
      <p class="content">
        The k-nearest neighbors (KNN) algorithm is a simple, easy-to-implement
        supervised machine learning algorithm that can be used to solve both classification and regression problems. Pause! Let us unpack that.
      </p>
      <p class="content">KNN is a model that classifies data points based on the points that are most similar
        to it. It uses test data to make an “educated guess” on what an unclassified point should be classified as.</p>
      <p class="content">Just like almost everything else, KNN works because of the deeply rooted mathematical theories it uses. When implementing KNN, the first step is to transform data points into feature vectors,
         or their mathematical value. The algorithm then works by finding the distance between the mathematical values of these points. The most common way to find this distance is the Euclidean distance.</p>
  </div>
  <div class="img-wrapper">
    <h3 class="img-title">A image to Unserstand KNN</h3>
    <img class="img" src="https://cdn.analyticsvidhya.com/wp-content/uploads/2018/03/knn3.png">
  </div>
  <div class="table-wrapper">
    <h3>Dataset</h3>
    <div class="table-content">
      <table>
        <tr>
          <td>x</td>
          <td>y</td>
        </tr>
        <tr v-for="(item,id) of dataset.length" :key="id">
          <td>{{dataset[id][0]}}</td>
          <td>{{dataset[id][1]}}</td>
        </tr>
      </table>
    </div>
    <div class="table-label">
      <p>{{predictions}}</p>
    </div>
  </div>
  <div class="intreactive-wrapper">
    <div class="input-wrapper">
      Ponits: <input type="text" id="x" ref="points" value="0.5,0.5" class="input"><br>
      Label:     <input type="text" id="y" ref="label" value="0" class="input"><br>
    </div>
    <div class="add-wrapper">
      <button @click="add">
        Add
      </button>
    </div>
    <div class="plot-wrapper">
      <div id="tester" ref="tester"></div><br>
    </div>
    <div class="predict-wrapper">
      Predict: <input type="text" id="predict" ref="predict" value="0.2,0.2"><br>
      <button @click="predict">Predict</button>
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
      dataset: [
        [0, 0],
        [0, 1],
        [1, 1],
        [2, 2],
        [1, 2],
        [2, 1]],
      predictions: [0, 0, 0, 1, 1, 1],
      Length: 6,
      predictValue: []
    }
  },
  methods: {
    add () {
      const newData = this.$refs.points.value.split(',')
      const newpredictions = this.$refs.label.value
      this.dataset.push(newData)
      this.predictions.push(Number(newpredictions))
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
      const trace3 = {
        x: [Number(this.predictValue[0])],
        y: [Number(this.predictValue[1])],
        mode: 'markers',
        type: 'scatter',
        name: 'Predict',
        marker: { size: 12 }
      }
      const TESTER = this.$refs.tester
      const data = [trace1, trace2, trace3]
      Plotly.newPlot(TESTER, data)
    },
    predict () {
      this.predictValue = this.$refs.predict.value.split(',')
      const pred = []
      this.predictValue.forEach(i => {
        pred.push(Number(i))
      })
      const knn = new KNN(this.dataset, this.predictions)
      const ans = knn.predict(pred)
      alert(ans)
      this.plot(this.dataset, this.predictions)
    }
  },
  mounted () {
    this.plot(this.dataset, this.predictions)
  },
  updated () {
    this.plot(this.dataset, this.predictions)
  }
}
</script>

<style lang="stylus">
.img-wrapper
  height 300px
  width 350px
  margin-top 40px
  margin:0 auto
  .img-title
    margin-left 50px
  .img
    height 100%
    width 100%
.table-wrapper
  margin 0 auto
  text-align center
  margin-top 150px
  .table-content
    text-align center
    margin-left 700px
  .table-label
    margin-top -120px
.intreactive-wrapper
  margin 0 auto
  text-align center
  margin-top 150px
</style>
