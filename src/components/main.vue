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
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @select="fnnn"
      @close="handleClose">
      <el-submenu  v-for="(item,i) in data" :key="i"  :index="item.authName">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+item1.path" v-for="(item1,z) in item.children" :key="z">
              <i class="el-icon-menu"></i>
              {{item1.authName}}
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
    return {
      data:[]
    };
  },
  methods: {
    fnnn(a,b){
      console.log(this.$route.path);
    },
    async getleftlist(){
        const { data: { data, meta: { msg, status } } }=await this.$http.get('menus')
        this.data=data
        console.log(data);
    },
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
    this.getleftlist()
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
