<template>
    <el-card id="box">
        <mian-bao leavel1="商品管理" leavel2="商品分类"></mian-bao>
        <el-button type="success" plain class="btuun" @click="postclass()">添加分类</el-button>
        <el-table
            :data="tableData"
            height="500px"
            style="width: 100%">
            <el-tree-grid
            label="分类名称"
            prop='cat_name'
            childKey='children'
            parentKey='cat_pid'
            treeKey='cat_id'
            levelKey='cat_level'
            ></el-tree-grid>
            <el-table-column
                label="级别"
                width="580">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_level===0">一级</span>
                    <span v-if="scope.row.cat_level===1">二级</span>
                    <span v-if="scope.row.cat_level===2">三级</span>
                </template>
            </el-table-column>
            <el-table-column
                label="是否有效">
                <template slot-scope="scope">
                    {{scope.row.cat_deleted?'无效':'有效'}}
                </template>
            </el-table-column>
            <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagenum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
  </div>
        <el-dialog
        title="添加商品分类"
        :visible.sync="dialogVisible"
        width="30%">
        <el-form label-position="left" label-width="80px" :model="formDate">
        <el-form-item label="分类名称">
            <el-input v-model="formDate.cat_name"></el-input>
        </el-form-item>
        <el-form-item>
            <el-cascader
                clearable
                :options="options"
                expand-trigger="hover"
                v-model="selectedOptions"
                @change="handleChange"
                change-on-select
                :props='props'>
            </el-cascader>
            {{selectedOptions}}
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="tianjai()">确 定</el-button>
        </span>
        </el-dialog>
        </el-card>
</template>

<script>
export default {
  data() {
    return {
      formDate: {
          cat_name:'',
          cat_pid:-1,
          cat_level:'0'

      },
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      dialogVisible: false,
      options: [],
      selectedOptions: [],
      props: {
        label: "cat_name",
        value: "cat_id"
      }
    };
  },
  methods: {
    async tianjai() {
      if (this.selectedOptions.length === 0) {
          this.formDate.cat_pid=0;
          this.formDate.cat_level='0'
      } else if (this.selectedOptions.length === 1) {
          this.formDate.cat_pid=this.selectedOptions[0];
          this.formDate.cat_level='1'
      } else {
          this.formDate.cat_pid=this.selectedOptions[1];
          this.formDate.cat_level='2'
      }
      const { data: { data, meta: { msg, status } } } = await this.$http.post(
          `categories`,this.formDate
        );
        if(status===201){
            this.$message.success(msg)
            this.getlist();
        }
      this.dialogVisible = false;
    },
    handleChange() {},
    async postclass() {
      const { data: { data, meta: { msg, status } } } = await this.$http.get(
        `categories?type=2`
      );
      this.options = data;
      console.log(data);
      this.dialogVisible = true;
    },
    // 每次多少页
    handleSizeChange() {
        this.getlist()
    },
    // 第几页
    handleCurrentChange() {
        this.getlist()
    },
    async getlist() {
      const { data: { data, meta: { msg, status } } } = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.tableData = data.result;
      this.total = data.total;
      console.log(data);
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
.btuun {
  margin-top: 10px;
}
</style>
