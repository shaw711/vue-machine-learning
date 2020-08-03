<template>
  <div>
    <div class="plot">
      <canvas id="NPGcanvas" width="500" height="500">Browser not supported for Canvas. Get a real browser.</canvas>
    </div>
    <div class="optsdiv">
      <div style="width:230px; float: left; margin-left: 10px;">
        <vue-slider ref="slider" v-model="value1" v-bind="options1"  @change="sliderChange1"></vue-slider><br>
        <span id="creport" ref="svmc">C = 1</span>
      </div>
      <div style="width:230px; float: right; margin-right: 10px;">
        <vue-slider ref="slider" v-model="value2" v-bind="options2"  @change="sliderChange2"></vue-slider><br>
        <span id="sigreport" ref='sigma'>RBF Kernel sigma = 1.0</span>
      </div>
    </div>
    <div class="button-wrapper">
       <el-row class="button">
          <el-button type="primary" @click="AddRed">Add Red Points</el-button>
        </el-row>
        <el-row class="button">
          <el-button type="primary" @click="AddGreen">Add Green Points</el-button>
        </el-row>
    </div>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  components: {
    vueSlider
  },
  data () {
    return {
      N: 10,
      wb: 0,
      ss: 50,
      trainstats: 0,
      kernelid: 1,
      rbfKernelSigma: 0.5,
      svmc: 1.0,
      dirty: true,
      SVM: 0,
      data: [],
      labels: [],
      ctx: 0,
      value1: 0,
      value2: 0,
      options1: {
        dotSize: 14,
        width: '40%',
        height: 4,
        contained: false,
        direction: 'ltr',
        min: 0,
        max: 100,
        interval: 1,
        disabled: false,
        duration: 0.5,
        adsorb: false,
        lazy: true,
        tooltip: 'active',
        tooltipPlacement: 'top'
      },
      options2: {
        dotSize: 14,
        width: '40%',
        height: 4,
        contained: false,
        direction: 'ltr',
        min: 0,
        max: 10,
        interval: 0.01,
        disabled: false,
        duration: 0.5,
        adsorb: false,
        lazy: true,
        tooltip: 'active',
        tooltipPlacement: 'top'
      }
    }
  },
  mounted () {
    var svm = require('svm')
    this.SVM = new svm.SVM()
    this.data =
    [[-0.4326, 1.1909],
      [3.0, 4.0],
      [0.1253, -0.0376],
      [0.2877, 0.3273],
      [-1.1465, 0.1746],
      [1.8133, 2.1139],
      [2.7258, 3.0668],
      [1.4117, 2.0593],
      [4.1832, 1.9044],
      [1.8636, 1.1677]]
    this.labels = [1, 1, 1, 1, 1, -1, -1, -1, -1, -1]
    this.retrainSVM()
  },
  methods: {
    retrainSVM () {
      if (this.kernelid === 1) {
        this.trainstats = this.SVM.train(this.data, this.labels, { kernel: 'rbf', rbfsigma: this.rbfKernelSigma, C: this.svmC })
      }
      if (this.kernelid === 0) {
        this.trainstats = this.SVM.train(this.data, this.labels, { kernel: 'linear', C: this.svmC })
        this.wb = this.SVM.getWeights()
      }
      this.dirty = true // to redraw screen
      this.draw()
    },
    drawCircle (x, y, r) {
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, Math.PI * 2, true)
      this.ctx.closePath()
      this.ctx.stroke()
      this.ctx.fill()
    },
    draw () {
      var canvas = document.getElementById('NPGcanvas')
      this.ctx = canvas.getContext('2d')
      var WIDTH = canvas.width
      var HEIGHT = canvas.height
      if (!this.dirty) return
      this.ctx.clearRect(0, 0, WIDTH, HEIGHT)
      var density = 4.0
      for (var x = 0.0; x <= WIDTH; x += density) {
        for (var y = 0.0; y <= HEIGHT; y += density) {
          var dec = this.SVM.marginOne([(x - WIDTH / 2) / this.ss, (y - HEIGHT / 2) / this.ss])
          if (dec > 0) this.ctx.fillStyle = 'rgb(150,250,150)'
          else this.ctx.fillStyle = 'rgb(250,150,150)'
          this.ctx.fillRect(x - density / 2 - 1, y - density - 1, density + 2, density + 2)
        }
      }
      // draw axes
      this.ctx.beginPath()
      this.ctx.strokeStyle = 'rgb(50,50,50)'
      this.ctx.lineWidth = 1
      this.ctx.moveTo(0, HEIGHT / 2)
      this.ctx.lineTo(WIDTH, HEIGHT / 2)
      this.ctx.moveTo(WIDTH / 2, 0)
      this.ctx.lineTo(WIDTH / 2, HEIGHT)
      this.ctx.stroke()
      // draw datapoints. Draw support vectors larger
      this.ctx.strokeStyle = 'rgb(0,0,0)'
      for (var i = 0; i < this.N; i++) {
        if (this.labels[i] === 1) this.ctx.fillStyle = 'rgb(100,200,100)'
        else this.ctx.fillStyle = 'rgb(200,100,100)'
        if (this.SVM.alpha[i] > 1e-2) this.ctx.lineWidth = 3 // distinguish support vectors
        else this.ctx.lineWidth = 1
        this.drawCircle(this.data[i][0] * this.ss + WIDTH / 2, this.data[i][1] * this.ss + HEIGHT / 2, Math.floor(3 + this.SVM.alpha[i] * 5.0 / this.svmc))
      }

      if (this.kernelid === 0) {
        var xs = [-5, 5]
        var ys = [0, 0]
        ys[0] = (-this.wb.b - this.wb.w[0] * xs[0]) / this.wb.w[1]
        ys[1] = (-this.wb.b - this.wb.w[0] * xs[1]) / this.wb.w[1]
        this.ctx.fillStyle = 'rgb(0,0,0)'
        this.ctx.lineWidth = 1
        this.ctx.beginPath()
        // wx+b=0 line
        this.ctx.moveTo(xs[0] * this.ss + WIDTH / 2, ys[0] * this.ss + HEIGHT / 2)
        this.ctx.lineTo(xs[1] * this.ss + WIDTH / 2, ys[1] * this.ss + HEIGHT / 2)
        // wx+b=1 line
        this.ctx.moveTo(xs[0] * this.ss + WIDTH / 2, (ys[0] - 1.0 / this.wb.w[1]) * this.ss + HEIGHT / 2)
        this.ctx.lineTo(xs[1] * this.ss + WIDTH / 2, (ys[1] - 1.0 / this.wb.w[1]) * this.ss + HEIGHT / 2)
        // wx+b=-1 line
        this.ctx.moveTo(xs[0] * this.ss + WIDTH / 2, (ys[0] + 1.0 / this.wb.w[1]) * this.ss + HEIGHT / 2)
        this.ctx.lineTo(xs[1] * this.ss + WIDTH / 2, (ys[1] + 1.0 / this.wb.w[1]) * this.ss + HEIGHT / 2)
        this.ctx.stroke()
        for (let i = 0; i < this.N; i++) {
          if (this.SVM.alpha[i] < 1e-2) continue
          if (this.labels[i] === 1) {
            ys[0] = (1 - this.wb.b - this.wb.w[0] * xs[0]) / this.wb.w[1]
            ys[1] = (1 - this.wb.b - this.wb.w[0] * xs[1]) / this.wb.w[1]
          } else {
            ys[0] = (-1 - this.wb.b - this.wb.w[0] * xs[0]) / this.wb.w[1]
            ys[1] = (-1 - this.wb.b - this.wb.w[0] * xs[1]) / this.wb.w[1]
          }
          var u = (this.data[i][0] - xs[0]) * (xs[1] - xs[0]) + (this.data[i][1] - ys[0]) * (ys[1] - ys[0])
          u = u / ((xs[0] - xs[1]) * (xs[0] - xs[1]) + (ys[0] - ys[1]) * (ys[0] - ys[1]))
          var xi = xs[0] + u * (xs[1] - xs[0])
          var yi = ys[0] + u * (ys[1] - ys[0])
          console.log(xi)
          console.log(yi)
          this.ctx.moveTo(this.data[i][0] * this.ss + WIDTH / 2, this.data[i][1] * this.ss + HEIGHT / 2)
          this.ctx.lineTo(xi * this.ss + WIDTH / 2, yi * this.ss + HEIGHT / 2)
        }
        this.ctx.stroke()
      }
    },
    sliderChange1 (value) {
      this.svmc = Math.pow(10, value)
      this.retrainSVM()
      this.$refs.svmc.textContent = 'C = ' + value
    },
    sliderChange2 (value) {
      this.rbfKernelSigma = Math.pow(10, value)
      if (this.kernelid === 1) {
        this.retrainSVM()
      }
      this.$refs.sigma.textContent = 'RBF Kernel sigma = ' + value
    },
    AddRed () {
      var x = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
      var y = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
      var d = [x, y]
      this.data.push(d)
      this.labels.push(-1)
      this.N = this.N + 1
      this.retrainSVM()
    },
    AddGreen () {
      var x = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
      var y = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5
      var d = [x, y]
      this.data.push(d)
      this.labels.push(1)
      this.N = this.N + 1
      this.retrainSVM()
    }
  }
}

</script>

<style>
.plot {
  text-align:center;
  margin-bottom: 20px;
}
canvas {
    border: 1px solid #555;
    margin-top: 10px;
    margin-bottom: 20px;
}
.optsdiv{
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.button-wrapper{
  text-align:center;
  margin-top: 100px;
}
.button{
  margin-bottom: 10px;
}

</style>
