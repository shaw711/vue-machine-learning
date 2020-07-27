<template>
  <div>
    <div class="table-wrapper">
      <table>
        <tr>
          <td v-for="(a,index1) of rowname" :key="index1">{{a}}</td>
        </tr>
        <tr v-for="(item,index0) of shwoData" :key="index0">
          <td v-for="(item1, index2) of item" :key="index2">{{item1}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Traindata from '../common/TitanicTrain'

export default {
  data () {
    return {
      rowname: [],
      Train: {},
      shwoData: []
    }
  },
  created: function () {
    this.rowname = Object.keys(Traindata[0])
    this.Train = Traindata
    this.shwoData = this.Train.splice(1, 20)
    for (let i = 0; i < this.Train.length; i++) {
      if (this.Train[i].Age <= 16) {
        console.log('111')
      } else if (this.Train[i].Age > 16 && this.Train[i].Age <= 32) {
        return 1
      } else if (this.Train[i].Age > 32 && this.Train[i].Age <= 48) {
        return 2
      } else if (this.Train[i].Age > 48 && this.Train[i].Age <= 64) {
        return 3
      } else {
        // Anything other than above condition will be group 4
        return 4
      }
    }
  }

}
</script>

<style lang="stylus">

</style>
