<template>
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{leavel1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{leavel2}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name:mianbao,
    props:["leavel1,leavel2"]
}
</script>

<style>

</style>
