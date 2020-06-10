<template>
  <div>
    <div id="table-wrapper">
      <table>
        <tr>
          <td v-for="(item,id) of rownames" :key="id">
            {{item}}
          </td>
        </tr>
        <tr v-for="(row,id) of showData" :key="id">
          <td v-for="(item,index) of row" :key="index" >
            {{item}}
          </td>
        </tr>
      </table><br>
      <div id="train-wrapper">
        <button @click="svmtrain">SVM</button> |
        <button>Bayes</button> |
        <button @click="knntrain">KNN</button> |
        <button>Logistic Regression</button> |
        <button @click="RFtrain">Random Forest</button> |
      </div>
    </div>
  </div>
</template>

<script>
import leaf from '../common/leaf'
import KNN from 'ml-knn'
import { RandomForestClassifier as RFClassifier } from 'ml-random-forest'
const SVM = require('libsvm-js/asm')
export default {
  data () {
    return {
      trainData: [],
      testData: [],
      trainLabel: [],
      testLabel: [],
      showData: [],
      rownames: [],
      Data: [],
      label: []
    }
  },
  methods: {
    svmtrain () {
      const options = {
        kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
        degree: 3
      }
      const svm = new SVM(options)
      svm.train(this.Data, this.label)
      const result = svm.predict(this.trainData)
      console.log(result)
    },
    knntrain () {
      const dataset = this.trainData
      const predictions = this.trainLabel
      const knn = new KNN(dataset, predictions, { k: 5 })
      console.log(knn)
    },
    RFtrain () {
      const options = {
        seed: 3,
        maxFeatures: 0.8,
        replacement: true,
        nEstimators: 25
      }
      var train = this.translateArray(this.trainData)
      var test = this.translateArray(this.trainLabel)
      const classifier = new RFClassifier(options)
      classifier.train(train, test)
      const result = classifier.predict(train)
      console.log(result)
    },

    translateArray (data) {
      var arr = []
      for (var i in data) {
        arr[i] = []
        for (var j in data[i]) {
          arr[i].push(data[i][j])
        }
      }
      return arr
    }

  },
  mounted: function () {
    for (let i = 1; i < leaf.length; i++) {
      const random = Math.floor(Math.random() * (i + 1));
      [leaf[i], leaf[random]] = [leaf[random], leaf[i]]
    }
    const LeafClass = leaf.map(item => {
      return item.type
    })
    const LeafData = leaf.map(item => {
      delete item.type
      delete item.specimenNumber
      return item
    })
    const TrainLength = LeafData.length * 0.8
    this.trainData = LeafData.slice(0, TrainLength)
    this.testData = LeafData.slice(TrainLength, LeafData.length)
    this.trainLabel = LeafClass.slice(0, TrainLength)
    this.testLabel = LeafClass.slice(TrainLength, LeafData.length)
    this.showData = leaf.slice(0, 20)
    this.rownames = Object.keys(this.showData[0])
    console.log(this.trainLabel)
    const sum1 = this.trainLabel.reduce(function (prev, next) {
      prev[next] = prev[next] + 1 || 1
      return prev
    }, {})
    console.log(sum1)
    const points = []
    for (let i = 1; i < 37; i++) { points.push(i) }
  }
}
</script>
<style scoped>

</style>
