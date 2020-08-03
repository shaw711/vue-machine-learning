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
              <el-button :disabled = "!tshow" type="success" plain @click="dt">Decision Tree</el-button>
            </el-form-item>
            <el-form-item>
              <p>Please click Refresh if you want to change anything</p>
              <el-button type="primary" @click="handle">Refresh</el-button>
            </el-form-item>
          </el-form>
    </el-col>
      <el-col :span="12">
           <tableshow ref='tabledata' v-if="tshow" :tabledata="showData"></tableshow>
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
      dataset: []
    }
  },
  methods: {
    importExcel (file) {
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types)
      if (!fileType) {
        alert('wrong format!!!!!! Plese uplpad csv file')
        return
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson[0].sheet
          this.showData = this.xlsxJson
          this.rowname = Object.keys(this.showData[0])
          this.$nextTick(function () {
            this.tshow = true
          })
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
    },
    chooseIris () {
      this.showData = Iris
      this.rowname = Object.keys(this.showData[0])
      this.tshow = true
    },
    chooseabalone () {
      this.showData = abalone
      this.rowname = Object.keys(this.showData[0])
      this.tshow = true
    },
    choosecryo () {
      this.showData = cryo
      this.rowname = Object.keys(this.showData[0])
      this.tshow = true
    },
    knn () {
      this.X = []
      this.Y = []
      this.labels = []
      this.dataset = []
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
      var label = this.getRepeatNum(this.labels)
      var labNum = []
      this.labels.forEach(elem => {
        for (var i = 0; i < label.length; i++) {
          if (elem === Number(label[i])) {
            labNum.push(i)
          }
        }
      })
      var knn = new KNN(this.dataset, labNum)
      var ans = knn.predict(this.dataset)
      var cateNum = this.getRepeatNum(ans)
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      console.log(finalAns)
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
      var label = this.getRepeatNum(this.labels)
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
      var cateNum = this.getRepeatNum(ans)
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      console.log(finalAns)
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
      var label = this.getRepeatNum(this.labels)
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
      var cateNum = this.getRepeatNum(ans)
      var finalAns = []
      ans.forEach(elem => {
        for (var i = 0; i < cateNum.length; i++) {
          if (elem === Number(cateNum[i])) {
            finalAns.push(label[i])
          }
        }
      })
      console.log(finalAns)
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
      console.log(this.dataset)
      console.log(this.labels)
      DTClassifier.train(this.dataset, this.labels)
      var result = DTClassifier.predict(this.dataset)
      console.log(result)
    },
    getRepeatNum (arr) {
      var obj = {}
      for (var i = 0, l = arr.length; i < l; i++) {
        var item = arr[i]
        obj[item] = (obj[item] + 1) || 1
      }
      return Object.keys(obj)
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
