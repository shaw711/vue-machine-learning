<template>
  <div>
    <div id="table-wrapper">
      <table>
        <tr>
          <td>
          </td>
        </tr>
        <tr>
          <td>
          </td>
        </tr>
      </table><br>
      <div id="train-wrapper">
        <button @click="SvmTrain">SVM</button> |
        <button @click="BayeTrain">Bayes</button> |
        <button @click="KnnTrain">KNN</button> |
        <button @click="LogTrain">Logistic Regression</button> |
        <button @click="RFTrain">Random Forest</button> |
      </div>
    </div>
  </div>
</template>

<script>
import leaf from '../common/leaf'
import KNN from 'ml-knn'
import SVM from 'libsvm-js/asm'
import Bayes from 'ml-naivebayes'
import Matrix from 'ml-matrix'
import LogisticRegression from 'ml-logistic-regression'
import { RandomForestClassifier as RFClassifier } from 'ml-random-forest'

export default {
  data () {
    return {
      trainingSetX: [],
      trainingSetY: [],
      testingSetX: [],
      testingSetY: []
    }
  },
  methods: {
    translateArray (data) {
      var arr = []
      for (var i in data) {
        arr[i] = []
        for (var j in data[i]) {
          arr[i].push(data[i][j])
        }
      }
      return arr
    },
    shuffleArray (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      return array
    },
    KnnTrain () {
      const knn = new KNN(this.trainingSetX, this.trainingSetY, { k: 5 })
      const result = knn.predict(this.testingSetX)
      console.log(result)
      console.log(this.testingSetY)
    },
    SvmTrain () {
      const options = {
        kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
        degree: 3
      }
      const svm = new SVM(options)
      svm.train(this.trainingSetX, this.trainingSetY)
      const result = svm.predict(this.testingSetX)
      console.log(result)
      console.log(this.testingSetY)
    },
    BayeTrain () {
      const bayes = new Bayes()
      bayes.train(this.trainingSetX, this.trainingSetY)
      const result = bayes.predict(this.testingSetX)
      console.log(result)
    },
    LogTrain () {
      const logreg = new LogisticRegression({ numSteps: 5000, learningRate: 5e-3 })
      logreg.train(this.trainingSetY, this.trainingSetY)
      const preValue = new Matrix(this.testingSetX)
      const result = logreg.predict(preValue)
      console.log(result)
    },
    RFTrain () {
      const options = {
        seed: 3,
        maxFeatures: 0.8,
        replacement: true,
        nEstimators: 25
      }
      const classifier = new RFClassifier(options)
      classifier.train(this.trainingSetX, this.trainingSetY)
      const result = classifier.predict(this.testingSetX)
      console.log(result)
    }
  },
  mounted: function () {
    const data = this.translateArray(this.shuffleArray(leaf))
    const y = data.map(item => {
      return item[1]
    })
    const X = data.map(item => {
      return item.slice(2, 16)
    })
    const seperationSize = 0.9 * X.length
    this.trainingSetX = X.slice(0, seperationSize)
    this.trainingSetY = y.slice(0, seperationSize)
    this.testingSetX = X.slice(seperationSize)
    this.testingSetY = y.slice(seperationSize)
    console.log(new Matrix(this.testingSetX))
  }
}
</script>
<style scoped>

</style>
