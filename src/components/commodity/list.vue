<template>
    <el-card id="box">
        <mian-bao leavel1="商品管理" leavel2="商品列表"></mian-bao>
        <el-row>
            <div style="margin-top: 15px;">
            <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        </div>
        <el-col :span="4"><el-button type="success" plain @click="listadd()">添加商品</el-button></el-col>
    </el-row>

    <!-- 表格 -->
<template>
  <el-table
    :data="tableData2"
    style="width: 100%"
    height="578px"
    :row-class-name="tableRowClassName">
    <el-table-column
    type="index"
      label="#"
      width="50">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="1000">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格">
    </el-table-column>
    <el-table-column
      prop="goods_number"
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop="upd_time"
      label="创建日期">
    </el-table-column>
    <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
        </template>
      </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

    <!-- 表格 -->

    </el-card>
</template>

<script>
export default {
    data () {
        return {
            input5:'',
            tableData2: [],
        pagenum:1,
        pagesize:10,
        query:'',
        total:0
        }
    },
    methods: {
        // 商品添加
        listadd(){
            this.$router.push({name:"listadd"})
        },
        // 多少页
        async handleCurrentChange(a){
            this.pagenum=a
        const{ data: { data, meta: { msg, status } } }=await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`)
            if(status===200){
                this.getlist()
            }
        },
        // 每页数量该表
        async handleSizeChange(a){
            this.pagesize=a
          const{ data: { data, meta: { msg, status } } }=await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`)
            if(status===200){
                this.getlist()
            }
        },
        async getlist(){
            const{ data: { data, meta: { msg, status } } }=await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`)
            if(status===200){
                this.tableData2=data.goods
                this.total=data.total;
            }
        },
        // /颜色
        tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    created(){
        this.getlist()
    },
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
