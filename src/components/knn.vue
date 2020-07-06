<template>
<div id="knn">
   <div class="title-wrapper">
    <h1 class="title">Introduction to k-Nearest Neighbors: A powerful Machine Learning Algorithm</h1>
    <div class="sub-title-wrapper">
      <h3 >
        Overview
      </h3>
      <ul>
        <li>Understand k nearest neighbor (KNN) – one of the most popular machine learning algorithms</li>
        <li>Visiution</li>
      </ul>
    </div>
  </div>
  <h3 class="content-title">Introduction</h3>
  <div class="content-wrapper">
    <p class="content">In the four years of my data science career, I have built more than 80% classification models
        and just 15-20% regression models. These ratios can be more or less generalized throughout the industry. The reason behind this bias towards classification models is that most analytical problems involve making a decision.</p>
    <p class="content">For instance, will a customer attrite or not, should we target customer X for
        digital campaigns, whether customer has a high potential or not, etc.
        These analysis are more insightful and directly linked to an implement ation roadmap.</p>
  </div>
  <div class="img-wrapper">
    <h3>A important image to Unserstand KNN</h3>
    <img class="img" src="https://cdn.analyticsvidhya.com/wp-content/uploads/2018/03/knn3.png">
  </div>
  <div class="table-wrapper">
    <h2>
      Visualization
    </h2>
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
  </div>
  <div class="label-wrapper">
    <a>label</a>
    <p>{{predictions}}</p>
  </div>
  <div class="inputWarper">
    Ponits: <input type="text" id="x" ref="points" value="0.5,0.5"><br>
    Label: <input type="text" id="y" ref="label" value="0"><br>
  </div>
  <div class="add-wrapper"><button @click="add">Add</button></div>
  <div class="predict-wrapper">
    Predict: <input type="text" id="predict" ref="predict" value="0.2,0.2"><br>
  <div class="predict-value">
    <button @click="predict">Predict</button>
  </div>
  </div>
  <div class="tester" ref="tester"></div>
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
      console.log(ans)
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
.title-wrapper
  margin-top 20px
  .sub-title-wrapper
    margin-left 20px;
  .content-title
    left -200px
.content-title
  margin-top 20px
  margin-bottom -50px
  margin-left 20px
.img-wrapper
  height 300px
  width 350px
  margin-top 40px
  margin:0 auto
  .img
    height 100%
    width 100%
</style>
