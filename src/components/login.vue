<template>
    <div class="login">
    <el-form :label-position="labelPosition" label-width="80px" :model="formDate" class="form">
        <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formDate.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formDate.password" type="password"></el-input>
  </el-form-item>
  <el-button @click.prevent="subminFrom()" type="primary" class="btn">提交</el-button>
</el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'top',
      formDate: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async subminFrom () {
      const res = await this.$http.post('login', this.formDate)
      const { data: { data, meta: { msg, status } } } = res
      if (status === 200) {
        sessionStorage.setItem('token', data.token)
        this.$router.push({name: 'main'})
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.login {
  height: 100%;
  background: #193e57;
}
.form {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 30px;
  background: #fff;
}
.btn {
  width: 100%;
}
</style>
