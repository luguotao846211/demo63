<template>
    <div class="div">
        <el-container class="head">
  <el-header>
      <el-row>
        <el-col :span="4">
            <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19">
            <h2>123</h2>
        </el-col>
        <el-col :span="1">
            <a href="#">退出</a>
        </el-col>
    </el-row>
  </el-header>
  <el-container class="left">
    <el-aside width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
export default {}
</script>

<style>
.div{
    height: 100%
}
.head{
    height: 100%;
    background: yellow;
}
.left{
    background: red;
}
.main{
    background: orange;
}
</style>
