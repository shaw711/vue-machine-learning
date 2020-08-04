<template>
  <div>
    <h1>Introduction</h1>
    <el-row>
      <el-col :span="24">
        <el-tag>How to Use the Web</el-tag>
        <el-card>
          <ul>
            <li>We have some dataset in our web, you can use them. Also you can upload your own dataset</li>
            <li>You can only choose the 2 columns for training and 1 column for response variable. Because it's easy to plot.</li>
            <li>Choose the machine learning algrothim which you want to explore.</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }

}
</script>

<style lang="stylus">
  .image-wrapper
    width 80%
    margin:0 auto
    background-color grey
    .el-image
      width 100%
  .word-wrapper
    width 80%
    margin:0 auto
    .normal-word
      width 100%
      font-family cursive
  .help
    position absolute
    top 750px
    right 50px
</style>
