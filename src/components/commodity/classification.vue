<template>
    <el-card id="box">
        <mian-bao leavel1="商品管理" leavel2="商品分类"></mian-bao>
        <el-button type="success" plain class="btuun">成功按钮</el-button>
        <el-table
            :data="tableData"
            height="500px"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
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
        </el-card>
</template>

<script>
export default {
    data () {
        return {
            tableData:[],
            pagenum:1,
            pagesize:10,
        }
    },
    methods: {
        // 每次多少页
        handleSizeChange(){

        },
        // 第几页
        handleCurrentChange(){

        },
        async getlist(){
            const { data: { data, meta: { msg, status } } } = await this.$http.get(
                    `categories?type=3`
                );
                this.tableData=data
                console.log(data);
            }
    },
    created(){
        this.getlist()
    }
}
</script>

<style>
#box{
    height: 100%;
}
.btuun{
    margin-top: 10px;
}
</style>
