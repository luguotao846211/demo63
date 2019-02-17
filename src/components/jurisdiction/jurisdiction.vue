<template>
    <el-card id="box">
        <mian-bao leavel1="权限管理" leavel2="权限列表"></mian-bao>
<el-table
    :data="tableData2"
    height="800px"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      label=" "
      width="30"
      type="expand">
          <template slot-scope="scope">
              <!-- 一级 -->
          <el-row v-for="(item,i) in scope.row.children" :key="i">
              <el-col :span="4">
              <el-tag
            closable
            type="" @close="handleClose(item,scope.row)">
             {{item.authName}}
</el-tag>&nbsp;>
</el-col>
<el-col :span="20">
    <!-- 二级 -->
    <el-row v-for="(item1,z) in item.children" :key="z">
        <el-col :span="4">
<el-tag
            closable
            type="success" @close="handleClose(item1,scope.row)">
             {{item1.authName}}
</el-tag>&nbsp;>
</el-col>
<el-col :span="20">
<el-row>
    <span v-for="(item2,t) in item1.children" :key="t">
            <el-tag
            closable
            type="warning" @close="handleClose(item2,scope.row)">
             {{item2.authName}}
</el-tag>
    </span>
</el-row>
</el-col>
    </el-row>
</el-col>
          </el-row>
      </template>
    </el-table-column>
    <el-table-column
    type="index"
      label="#"
      width="280">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称"
      width="430">
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="角色描述"
      width="650">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" size="mini" circle plain @click="putlist(scope.row.id)"></el-button>
  <el-button type="danger" icon="el-icon-delete" size="mini" circle plain @click="deletelist(scope.row.id)"></el-button>
  <el-button type="success" icon="el-icon-check" size="mini" circle plain @click="fenpeijuese(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>



<!-- 弹出框 -->

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
  >
  <span slot="footer" class="dialog-footer">
<!-- 内容 -->
<el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps"
  :default-checked-keys="checkedList">
</el-tree>

<!-- node-key 唯一值 -->
<!-- highlight-current高亮选中 -->
<!-- current-node-key当前选中节点 -->
<!-- 内容 -->
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="setFree()">确 定</el-button>
  </span>
</el-dialog>
<!-- 弹出框 -->
        </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      data2: [],
      currentRoleId: 0,
      checkedList: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      dialogVisible: false,
      tableData2: []
    };
  },
  methods: {
    // 关闭移出tag
    async handleClose(tag,id,i){
     
      const res = await this.$http.delete(`roles/${id.id}/rights/${tag.id}`)
      const{ data: { data, meta: { msg, status } } }=res
      if(status===200){
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.$message.success(msg)
        // console.log(data);
          id.children=data
      }
    },
    //三级权限
    handleChange(val) {
      console.log(val);
    },
    //设置权限
    async setFree() {
      const checkeds = this.$refs.tree.getCheckedKeys(); //所有选中的全节点
      const checkedban = this.$refs.tree.getHalfCheckedKeys(); //所有选中的半节点
      const newArr = checkeds.join(",") + "," + checkedban.join(",");
      const { data: { data, meta: { msg, status } } } = await this.$http.post(
        `roles/${this.currentRoleId}/rights`,
        { rids: newArr }
      );
      if (status === 200) {
        this.$message.success(msg);
        this.dialogVisible = false;
        this.getlist()
      }
    },
    //编辑
    putlist() {},
    // 删除
    deletelist() {},
    // 分配权限
    async fenpeijuese(row) {
      this.currentRoleId = row.id;
      const arr = [];
      row.children.forEach(item => {
        item.children.forEach(item1 => {
          item1.children.forEach(item2 => {
            arr.push(item2.id);
          });
        });
      });
      this.checkedList = arr;
      const res = await this.$http.get(`rights/tree`);
      // console.log(res);
      const { data: { data, meta: { msg, status } } } = res;
      this.data2 = data;
      const ret = await this.$http.get();

      this.dialogVisible = true;
    },
    //列表获取
    async getlist() {
      const res = await this.$http.get(`roles`);
      const { data: { data, meta: { msg, status } } } = res;
      if (status === 200) {
        this.tableData2 = data;
      }
    },
    //颜色控制
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style>
#box {
  height: 100%;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.row-add{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
