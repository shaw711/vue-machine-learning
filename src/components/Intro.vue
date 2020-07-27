<template>
  <div>
    <div class="title-wrapper">
      <div class="main-title">
        <h1>What is Machine Learning?</h1>
      </div>
      <div class="title">
        <p>Machine-learning algorithms find and apply patterns in data. And they pretty much run the world.</p>
        <p class="author" style="margin-left:800px">--by<font style="margin-left:10px">Karen Hao</font></p>
      </div>
      <el-divider></el-divider>
    </div>
    <div class="image-wrapper">
      <el-image :src="src" class="image"></el-image>
    </div>
    <div class="word-wrapper">
      <p class="normal-word">Machine learning is an application of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed.
        Machine learning focuses on the development of computer programs that can access data and use it learn for themselves.</p>
      <p class="normal-word"><font class="extra-word">  But! </font>If you want to understand machine learning, you have to understand a lot of statistical algorithms.
      The goal of this website is to allow users to easily understand basic machine learning algorithms</p>
      <p class="normal-word">Users can understand these algorithms through mathematical formulas and interactive images.
         At the same time, we will analyze some real data sets to help users better understand these algorithms.</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: 'https://expertsystem.com/wp-content/uploads/2017/03/machine-learning-definition.jpeg'
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
