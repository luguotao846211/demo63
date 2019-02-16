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
    <el-aside width="200px">
        <!-- 侧边导航 -->
        <el-menu unique-opened router
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              用户列表
              </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="role">
              <i class="el-icon-menu"></i>
              角色列表
              </el-menu-item>
              <el-menu-item index="jurisdiction">
              <i class="el-icon-menu"></i>
              权限列表
              </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
          <el-menu-item index="shoplist">
              <i class="el-icon-menu"></i>
              商品列表
              </el-menu-item>
              <el-menu-item index="parameter">
              <i class="el-icon-menu"></i>
              分类参数
              </el-menu-item>
              <el-menu-item index="classification">
              <i class="el-icon-menu"></i>
              商品分类
              </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
          <el-menu-item index="orderList">
              <i class="el-icon-menu"></i>
              订单分类
              </el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
          <el-menu-item index="dataForm">
              <i class="el-icon-menu"></i>
              数据报表
              </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
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
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(1);
    },
    handleClose(key, keyPath) {
      console.log(2);
    },
    tclogin() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.clear();
          this.$router.push({ name: "login" });
          this.$message.success("退出成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  //   router,
  created() {
    const token = localStorage.getItem("token");
    if (!token) {
      // 返回登录页
      this.$router.push({ name: "login" });
      this.$message.warning("请先登录");
    }
  }
};
</script>

<style>
.div {
  height: 100%;
}
.head {
  height: 100%;
  background: #e0d8bb;
}
.left {
  background:white;
}
.main {
  background: rgb(245, 235, 215);
}
.a,
.h2 {
  line-height: 60px;
  text-align: center;
}
.a {
  text-decoration: none;
}
</style>
