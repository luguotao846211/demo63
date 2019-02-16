<template>
    <div>
      <el-breadcrumb separator-class="el-icon-loading">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item> {{leavel1}} </el-breadcrumb-item>
      <el-breadcrumb-item> {{leavel2}} </el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>
<script>
export default {
    name:"mianBao",
    data () {
        return {
            
        }
    },
    props:["leavel1","leavel2"]
}
</script>

<style>
.el-breadcrumb__separator {
  color: red;
}
</style>
