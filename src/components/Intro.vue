<template>
  <div>
    <div>
      <h1>Vue Web for Machine Learning</h1>
      <div class="intro-wrapper">
        <p>NAME: HENGYU WANG</p>
        <p>UNIVERSITY: Universidad Carlos III de Madrid</p>
        <p>Director: BERNARDO D AURIA</p>
      </div>
      <el-row class="intro">
        <el-col :span="24">
          <el-tag>How to Use the Web</el-tag>
          <el-card>
            <ul>
              <li>We have some dataset in our web, you can use them. Also you can upload your own dataset</li>
              <li>You can choose 2 columns or more for training and 1 column for response variable. Because it's easy to plot.</li>
              <li>Choose the machine learning algrothim which you want to explore.</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
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
.intro-wrapper
  position absolute
.intro
  margin-top 200px
.help
  position absolute
  top 750px
  right 20px
</style>
