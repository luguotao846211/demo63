<template>
    <div class="div">
        <el-card class="box-card">
            <div class="color">
  <el-breadcrumb separator-class="el-icon-loading">
  <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
            </div>
            <el-row class="row">
       <el-col :span="6">
       <el-input @clear="getAll" placeholder="请输入内容" clearable v-model="query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="sousuo"></el-button>
  </el-input>
  </el-col>
  <el-button type="success" plain  @click="dialogVisibleAdd = true">添加用户</el-button>
</el-row>
<!-- 表格 -->
<el-table
    :data="tableData2"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="#"
      width="80">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="130">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="250">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="230">
    </el-table-column>
    <el-table-column
      label="创建日期"
      width="230">
      <template slot-scope="scope">
          {{scope.row.create_time | capitalize}}
      </template>
    </el-table-column>
    <el-table-column
      
      label="用户状态"
      width="360">
      <template slot-scope="scope">
         <el-switch @change="fn(scope.row.id,scope.row.mg_state)"
  v-model="scope.row.mg_state"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" size="mini" circle plain @click="putlist(scope.row.id)"></el-button>
  <el-button type="danger" icon="el-icon-delete" size="mini" circle plain @click="deletelist(scope.row.id)"></el-button>
  <el-button type="success" icon="el-icon-check" size="mini" circle plain @click="fenpeijuese(scope.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- <template slot-scope="scope"> -->

  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- </template> -->




</el-card>
<el-dialog
  title="添加用户"
  :visible.sync="dialogVisibleAdd"
  width="40%"
  >
  <el-form :label-position="labelPosition" ref="formDate" label-width="80px" :model="formDate" class="fosrm">
  <el-form-item label="用户名" prop="username" :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min:3, max:7, message: '请输入3到7位用户名', trigger: ['blur', 'change'] }
    ]">
    <el-input v-model="formDate.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min:6, max:16, message: '请输入6到16位密码', trigger: ['blur', 'change'] }
    ]">
    <el-input v-model="formDate.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formDate.emial"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="formDate.mobile"></el-input>
  </el-form-item>
  <el-input v-model="formDate.id" hidden></el-input>
</el-form>
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('formDate')">确 定</el-button>
  </span>

</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="dialogVisibleEdit"
  width="40%"
  >
  <el-form :label-position="labelPosition" ref="formDate2" label-width="80px" :model="formDateEdit" class="fosrm">
  <el-form-item label="用户名" prop="username" :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ]">
    <el-input v-model="formDateEdit.username" disabled=""></el-input>
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="formDateEdit.email"></el-input>
  </el-form-item>
  <el-form-item label="电话">
    <el-input v-model="formDateEdit.mobile"></el-input>
  </el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="llist()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="dialogVisibleFp"
  width="40%"
  >
  <el-form :label-position="labelPosition" ref="formDate2" label-width="80px" :model="formDateEdit" class="fosrm">
  <span>用户名</span> <span>{{formDateEdit.username}}</span>
  <div>
      <span>角色</span>
      <el-select v-model="rolseId">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option v-for="(item,i) in rolse" :key="i" :label="item.roleName" :value="item.id"></el-option>
    </el-select>
  </div>
</el-form>
<span slot="footer" class="dialog-footer">llist
    <el-button @click="dialogVisibleFp = false">取 消</el-button>
    <el-button type="primary" @click="llistFp()">确 定</el-button>
  </span>
</el-dialog>


    </div>
    
</template>

<script>
export default {
  data() {
    return {
      pagenum: 1  ,
      zg:'',
      labelPosition: "right",
      formDateEdit: {},
      formDate: {
        username: "",
        email: "",
        password: "",
        mobile: "",
        create_time: ""
      },
      tableData2: [],
      rolseId:'',
      rolse:[],
      query: "",
      pagesize: 2,
      //   currentPage4: 1,
      value2: true,
      total: '',
      dialogVisibleAdd: false,
      dialogVisibleEdit: false,
      dialogVisibleFp: false
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    //分配
    async llistFp(){

      const res = await this.$http.put(`users/${this.zg}/role`,{rid:this.rolseId})
      const { data: { data, meta: { msg, status } } } = res;
      // console.log(res);
      if(status===200){
         this.$message.success(msg);
      }
      this.dialogVisibleFp=false
    },
    async fenpeijuese(id) {
      this.zg=id
      const res = await this.$http.get(`users/${id}`);
      const { data: { data, meta: { msg, status } } } = res;
      if (status === 200) {
        this.rolseId = data.rid;
        console.log(data.rid);
        this.dialogVisibleFp = true;
      }
      const ret = await this.$http.get(`roles`)
      console.log(ret.data);
      this.rolse=ret.data.data
    },
    async llist(id) {
      //   alert(123)
      const res = await this.$http.put(
        `users/${this.formDateEdit.id}`,
        this.formDateEdit
      );
      const { data: { data, meta: { msg, status } } } = res;
      if (status === 200) {
        this.dialogVisibleEdit = false;
        this.getlist();
      }
    },
    async putlist(id) {
      const res = await this.$http.get(`users/${id}`);
      const { data: { data, meta: { msg, status } } } = res;
      if (status === 200) {
        this.formDateEdit = data;
        this.dialogVisibleEdit = true;
      }
    },
    async deletelist(id) {
      if (!confirm("sure")) return false;
      const res = await this.$http.delete(`users/${id}`);
      const { data: { data, meta: { msg, status } } } = res;
      if (status === 200) {
        this.pagenum = 1;
        this.getlist();
      }
    },
    async fn(id, mg_state) {
      //   alert(id)
      const res = await this.$http.put(`users/${id}/state/${mg_state}`);
      const { data: { data, meta: { msg, status } } } = res;
      console.log(res);
      if (status === 200) {
        this.$message.success(msg)
        // this.getlist();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisibleAdd = false;
          this.create_time = new Date();
          this.$http.post("users", this.formDate).then(res => {
            this.getlist();
            this.formDate={}
          });
          // alert('submit!');
          // 验证通过
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAll() {
      this.pagenum = 1;
      this.getlist();
    },
    sousuo() {
      this.pagenum = 1;
      this.getlist();
    },
    handleSizeChange(a) {
      this.pagesize = a;
      this.getlist();
    },
    handleCurrentChange(b) {
      this.pagenum = b;
      this.getlist();
    },
    //表格颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    async getlist() {
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const { data: { data, meta: { msg, status } } } = res;
      this.total = data.total;
      console.log(res);
      if (status === 200) {
        this.tableData2 = data.users;
      }
    }
  },
  updated () {
    // this.getlist()
  }
};
</script>

<style>
.div {
  height: 100%;
}
.box-card {
  height: 100%;
}
.el-breadcrumb__separator {
  color: red;
}
.row {
  margin-top: 10px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.fosrm {
  width: 100%；;
}
</style>
