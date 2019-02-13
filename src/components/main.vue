<template>
    <div class="div">
        <el-container class="head">
  <el-header>
      <el-row>
        <el-col :span="4">
            <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19">
            <h2 class="h2">电商后台管理系统</h2>
        </el-col>
        <el-col :span="1">
            <a @click.prevent="tclogin()" href="#" class="a">退出</a>
        </el-col>
    </el-row>
  </el-header>
  <el-container class="left">
    <el-aside width="200px">Aside</el-aside>
    <el-main class="main">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
// import router from '../router/index'
export default {
  data () {
    return {

    }
  },
  methods: {
    tclogin () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            localStorage.clear()
            this.$router.push({name:'login'})
            this.$message.success('退出成功')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });
        });
    }
  },
  //   router,
  beforeCreate () {
    const token = localStorage.getItem('token')
    console.log(token)
    if (!token) {
      // 返回登录页
      this.$router.push({name: 'login'})
      this.$message.warning('请先登录')
    }
  }
}
</script>

<style>
.div{
    height: 100%
}
.head{
    height: 100%;
     background: #b3c0d1;
}
.left{
    background: red;
}
.main{
    background: orange;
}
.a, .h2{
line-height: 60px;
text-align: center
}
.a{
    text-decoration: none;
}
</style>
