<template>
    <el-card id="box">
        <mian-bao leavel1="权限管理" leavel2="权限列表"></mian-bao>
       <el-table
    :data="tableData2"
    height="800px"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      type="index"
      label="#"
      width="180">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level==='0'">一级</span>
        <span v-if="scope.row.level==='1'">二级</span>
        <span v-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
        </el-card>
</template>

<script>
export default {
    data() {
      return {
        tableData2: []
      }
    },
    methods: {
        //列表获取
         async getlist(){
             const res = await this.$http.get(`rights/list`)
             const{data:{data,meta:{msg,status}}}=res
             if(status===200){
                 this.tableData2=data
                 console.log(this.tableData2);
             }
        },
        //颜色控制
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    created () {
        this.getlist()
    }
}
</script>

<style>
#box{
    height: 100%;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
