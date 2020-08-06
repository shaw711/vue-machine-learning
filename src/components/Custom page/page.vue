<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Dataset">
              <el-button  @click="chooseIris" >Iris</el-button>
              <el-button  @click="chooseabalone">Abalone</el-button>
              <el-button @click="choosecryo">Cryotherapy</el-button>
              <el-upload
              ref="upload"
              action="/"
              :show-file-list="false"
              :on-change="importExcel"
              :auto-upload="false">
                <el-button
                  slot="trigger"
                  icon="el-icon-upload"
                  size="small"
                  type="primary">
                  Upload
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="Column">
              <template>
                <el-select v-model="col" multiple  placeholder="Choose 2 columns">
                  <el-option
                    v-for="(item,index) in rowname"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="Response">
              <template>
                <el-select v-model="response" placeholder="Choose response variable">
                  <el-option
                    v-for="(item,index) in rowname"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
            <el-form-item label="Algorithm">
              <el-button :disabled = "!tshow" type="success" plain @click="knn" >KNN</el-button>
              <el-button  :disabled = "!tshow" type="success" plain @click="svm">SVM</el-button>
              <el-button :disabled = "!tshow" type="success" plain @click="logistic">Logistic regression</el-button>
            </el-form-item>
            <el-form-item>
              <el-button :disabled = "!tshow" type="success" plain @click="dt">Decision Tree</el-button>
              <el-button :disabled = "!tshow" type="success" plain @click="rf">Random Forest</el-button>
              <el-button :disabled = "!tshow" type="success" plain @click="nb">Naive Bayes</el-button>
            </el-form-item>
            <el-form-item>
              <p>Please click Refresh if you want to change Dataset</p>
              <el-button type="primary" @click="handle">Refresh</el-button>
               <el-button type="warning">Info</el-button>
            </el-form-item>
          </el-form>
    </el-col>
      <el-col :span="15">
           <tableshow ref='tabledata' id="table" v-if="tshow" :tabledata="showData"></tableshow>
              <div>
                <div class="plot1" ref="plot1" v-show="showplot" style="float:left"></div>
                <div class="plot2" ref="plot2" v-show="showplot" style="float:left"></div>
                <div class="plot3" ref="plot3" v-show="showplot" style="float:left"></div>
                <div style="clear:both"></div>
              </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import tableshow from './Showtable'
import Iris from '../../common/iris'
import abalone from '../../common/abalone'
import cryo from '../../common/Cryotherapy'
import KNN from 'ml-knn'
import LG from 'ml-logistic-regression'
import { DecisionTreeClassifier as DTClassifier } from 'ml-cart'
import Plotly from 'plotly.js-dist'
import { RandomForestClassifier as RFClassifier } from 'ml-random-forest'
import { MultinomialNB } from 'ml-naivebayes'

export default {
  name: 'page',
  components: {
    tableshow
  },
  data () {
    return {
      xlsxJson: [],
      rowname: [],
      tshow: false,
      showKey: 0,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      col: [],
      showData: [],
      response: '',
      X: [],
      Y: [],
      labels: [],
      dataset: [],
      showplot: false
    }
  },
  methods: {
    importExcel (file) {
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
      if (!fileType) {
        this.$message.error({
          message: 'Wrong Format!!!!!! Please upload the .csv file'
        })
        return
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson[0].sheet
          this.showData = this.xlsxJson
          this.rowname = Object.keys(this.showData[0])
          var that = this
          this.tshow = false
          setTimeout(function () { that.tshow = true }, 100)
        }
      })
    },
    file2Xce (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
      })
    },
    handle () {
      this.xlsxJson = null
      this.tshow = false
      this.col = []
      this.response = ''
      this.showplot = false
      this.rowname = null
      this.showData = null
    },
    chooseIris () {
      var that = this
      this.tshow = false
      this.showData = Iris
      this.rowname = Object.keys(this.showData[0])
      setTimeout(function () { that.tshow = true }, 100)
    },
    chooseabalone () {
      var that = this
      this.tshow = false
      this.handle()
      this.showData = abalone
      this.rowname = Object.keys(this.showData[0])
      setTimeout(function () { that.tshow = true }, 100)
    },
    choosecryo () {
      var that = this
      this.tshow = false
      this.handle()
      this.showData = cryo
      this.rowname = Object.keys(this.showData[0])
      setTimeout(function () { that.tshow = true }, 100)
    },
    knn () {
      this.X = []
      this.Y = []
      this.labels = []
      this.dataset = []
      if (this.col.length !== 2) {
        this.$message.error({
          message: 'Please choose 2 clomuns'
        })
        this.handle()
      }
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      var knn = new KNN(this.dataset, labNum)
      var ans = knn.predict(this.dataset)
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (String(elem) === String(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      const plot1 = this.$refs.plot1
      var layout1 = {
        title: 'Predict Value'
      }
      Plotly.newPlot(plot1, data1, layout1)

      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'True Value',
        type: 'bar'
      }
      var data3 = [trace3, trace4]
      var layout2 = {
        title: 'True Value VS Predict Value'
      }
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    svm () {
      this.dataset = []
      this.X = []
      this.Y = []
      this.labels = []
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      const SVM = require('libsvm-js/asm')
      const options = {
        kernel: SVM.KERNEL_TYPES.POLYNOMIAL,
        degree: 3
      }
      const svm = new SVM(options)
      svm.train(this.dataset, labNum)
      var ans = svm.predict(this.dataset)
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      var layout1 = {
        title: 'Predict Value'
      }
      const plot1 = this.$refs.plot1
      Plotly.newPlot(plot1, data1, layout1)

      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'True Value',
        type: 'bar'
      }
      var data3 = [trace3, trace4]
      var layout2 = {
        title: 'True Vlaue VS Predict Value'
      }
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    logistic () {
      this.dataset = []
      this.X = []
      this.Y = []
      this.labels = []
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      const logreg = new LG({ numSteps: 5000, learningRate: 5e-3 })
      const { Matrix } = require('ml-matrix')
      logreg.train(new Matrix(this.dataset), Matrix.columnVector(labNum))
      var ans = logreg.predict(new Matrix(this.dataset))
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      const plot1 = this.$refs.plot1
      var layout1 = {
        title: 'Predict Value'
      }
      Plotly.newPlot(plot1, data1, layout1)

      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'Real Value',
        type: 'bar'
      }
      var layout2 = {
        title: 'True Value VS Predict Value'
      }
      var data3 = [trace3, trace4]
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    dt () {
      this.dataset = []
      this.X = []
      this.Y = []
      this.labels = []
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      var classifier = new DTClassifier()
      classifier.train(this.dataset, labNum)
      var ans = classifier.predict(this.dataset)
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      const plot1 = this.$refs.plot1
      var layout1 = {
        title: 'Predict Value'
      }
      Plotly.newPlot(plot1, data1, layout1)
      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'Real Value',
        type: 'bar'
      }
      var layout2 = {
        title: 'True Value VS Predict Value'
      }
      var data3 = [trace3, trace4]
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    rf () {
      this.dataset = []
      this.X = []
      this.Y = []
      this.labels = []
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      var classifier = new RFClassifier()
      classifier.train(this.dataset, labNum)
      var ans = classifier.predict(this.dataset)
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      const plot1 = this.$refs.plot1
      var layout1 = {
        title: 'Predict Value'
      }
      Plotly.newPlot(plot1, data1, layout1)
      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var layout2 = {
        title: 'True Value VS Predict Value'
      }
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'Real Value',
        type: 'bar'
      }
      var data3 = [trace3, trace4]
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    nb () {
      this.dataset = []
      this.X = []
      this.Y = []
      this.labels = []
      this.showData.forEach(elem => {
        for (var val in elem) {
          if (val === this.col[0]) {
            this.X.push(elem[val])
          } else
          if (val === this.col[1]) {
            this.Y.push(elem[val])
          } else
          if (val === this.response) {
            this.labels.push(elem[val])
          }
        }
      })
      this.dataset = this.X.map((key, value) => [key, this.Y[value]])
      var label = Object.keys(this.getRepeatNum(this.labels))
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (String(elem) === (label[i])) {
            labNum.push(i)
          }
        }
      })
      var classifier = new MultinomialNB()
      classifier.train(this.dataset, labNum)
      var ans = classifier.predict(this.dataset)
      var cateNum = Object.keys(this.getRepeatNum(ans))
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      var X = []
      for (let i = 0; i < label.length; i++) {
        X[i] = []
      }

      for (var i = 0; i < this.dataset.length; i++) {
        for (var j = 0; j < label.length; j++) {
          if (finalAns[i] === label[j]) {
            X[j].push(this.dataset[i])
          }
        }
      }
      var data1 = []
      for (let i = 0; i < X.length; i++) {
        var trace = {
          x: X[i].map(elem => { return elem[0] }),
          y: X[i].map(elem => { return elem[1] }),
          mode: 'markers',
          type: 'scatter',
          marker: { size: 12 },
          name: label[i]
        }
        data1.push(trace)
      }
      this.showplot = true
      document.getElementById('table').style.display = 'none'
      const plot1 = this.$refs.plot1
      var layout1 = {
        title: 'Predict Value'
      }
      Plotly.newPlot(plot1, data1, layout1)
      // var Y = []
      // for (let i = 0; i < label.length; i++) {
      //   Y[i] = []
      // }
      // for (let i = 0; i < this.dataset.length; i++) {
      //   for (let j = 0; j < label.length; j++) {
      //     if (String(this.labels[i]) === label[j]) {
      //       Y[j].push(this.dataset[i])
      //     }
      //   }
      // }
      // var data2 = []
      // for (let i = 0; i < Y.length; i++) {
      //   var trace2 = {
      //     x: Y[i].map(elem => { return elem[0] }),
      //     y: Y[i].map(elem => { return elem[1] }),
      //     mode: 'markers',
      //     type: 'scatter',
      //     marker: { size: 12 },
      //     name: label[i]
      //   }
      //   data2.push(trace2)
      // }
      // const plot2 = this.$refs.plot2
      // Plotly.newPlot(plot2, data2)
      var trace3 = {
        x: Object.keys(this.getRepeatNum(finalAns)),
        y: Object.values(this.getRepeatNum(finalAns)),
        name: 'Predicted Value',
        type: 'bar'
      }
      var trace4 = {
        x: Object.keys(this.getRepeatNum(this.labels)),
        y: Object.values(this.getRepeatNum(this.labels)),
        name: 'Real Value',
        type: 'bar'
      }
      var data3 = [trace3, trace4]
      var layout2 = {
        title: 'True Value VS Predict Value'
      }
      const plot3 = this.$refs.plot3
      Plotly.newPlot(plot3, data3, layout2)
    },
    getRepeatNum (arr) {
      var obj = {}
      for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i]
        obj[item] = (obj[item] + 1) || 1
      }
      return obj
    }

  },
  created () {

  }
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
