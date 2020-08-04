<template>
  <div id="app">
    <el-row :gutter="20">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
          <el-menu-item index="/intro" route="/intro" class="grid-content-font">Introduction</el-menu-item>
          <el-menu-item index="/page" route="/page">Custom Web</el-menu-item>
      </el-menu>
    </el-row>
  <div class="line"></div>
  <div class="help">
      <el-button  icon="el-icon-setting" circle @click="handle"></el-button>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    handle () {
      this.$alert('<strong>I will  help</strong> you', 'How to use the web', {
        dangerouslyUseHTMLString: true
      })
    }
  }
}
</script>

<style lang="stylus">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
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
  .grid-content-font {
    text-align:center
  }
</style>
