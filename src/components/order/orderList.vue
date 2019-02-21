<template>
    <el-card id="box">
        <mian-bao leavel1="订单管理" leavel2="订单列表"></mian-bao>
                <el-table
            :data="tableData"
            height="500px"
            style="width: 100%">
            <el-table-column
               type="index"
                label="#"
                width="80">
            </el-table-column>
            <el-table-column
                prop="order_number"
                label="订单编号"
                width="280">
            </el-table-column>
            
            <el-table-column
                prop="order_price"
                label="订单价格"
                width="180">
            </el-table-column>
            <el-table-column
                label="是否付款"
                width="180">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.pay_status==='0'">未付款</el-tag>
                    <el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="is_send"
                label="是否发货"
                width="380">
            </el-table-column>
            <el-table-column
                label="下单时间"
                width="280">
                <template slot-scope="scope">
                    {{ scope.row.update_time |capitalize}}
                </template>
            </el-table-column>
            <el-table-column
      label="操作">
      <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="putlist(scope.row)"></el-button>
             <el-button type="warning" icon="el-icon-star-off" size="mini" plain @click="postadd(scope.row)"></el-button>
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
  title="修改订单地址"
  :visible.sync="dialogVisible1"
  width="30%"
  >
  <el-form label-position="left" label-width="80px" :model="formLabelAlign">
  <el-form-item label="省市区/县">
    <el-cascader
                clearable
                :options="options"
                expand-trigger="hover"
                v-model="selectedOptions">
            </el-cascader>
  </el-form-item>
  <el-form-item label="详细地址">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
</el-dialog>

  <el-dialog
  title="状态管理"
  :visible.sync="dialogVisible"
  width="30%">
  <el-form label-position="left" label-width="80px" :model="formDate2">
  <el-form-item label="是否发货">
    <!-- <el-input v-model="formDate2.is_send"></el-input> -->
     <el-select v-model="formDate2.is_send" :placeholder="formDate2.is_send">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="是否付款">
    <!-- <el-input v-model="formDate2.pay_status"></el-input> -->
    <el-select v-model="formDate2.pay_status" placeholder="请选择">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="支付方式">
    <!-- <el-input v-model="formDate2.order_pay"></el-input> -->
    <el-select v-model="formDate2.order_pay" placeholder="否">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="订单价格">
    <el-input v-model="formDate2.order_price" disabled></el-input>
  </el-form-item>
  <el-form-item label="订单编号">
    <el-input v-model="formDate2.order_number" disabled></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisibl()">确 定</el-button>
  </span>
</el-dialog>

        </el-card>
</template>

<script>
import jsonadd from '@/assets/city_data2017_element.js'
export default {
    data () {
        return {
            options:[{value:'否',lable:'0'},{value:'是',lable:'1'}],
            options2:[{value:'否',lable:'0'},{value:'是',lable:'1'}],
            options3:[{value:'未支付',lable:0},{value:'支付宝',lable:1},{value:'微信',lable:2},{value:'银行卡',lable:3}],
            formDate2:{},
            tableData:[],
            pagenum:1,
            pagesize:10,
            formLabelAlign:{
                name:'',
                region:''
            },
            selectedOptions:[],
            total:0,
            dialogVisible:false,
            dialogVisible1:false,
            id:0,
            options:[]
        }
    },
    methods: {
        async postadd(item){
        this.dialogVisible1=true
        this.options=jsonadd
        },
        async dialogVisibl(){
            // console.log(this.formDate2);
            //  const { data: { data, meta: { msg, status } } } = await this.$http.put(
            //         `orders/${this.id.order_id}}`,this.formDate2
            //     );
            // console.log(this.formDate2.is_send);
            if(this.formDate2.pay_status==='否'){
                this.formDate2.pay_status = '0'
            }else if(this.formDate2.pay_status==='是'){
                 this.formDate2.pay_status = '1'
            }
            if(this.formDate2.order_pay==='未支付'){
                this.formDate2.order_pay = '0'
            }else if(this.formDate2.order_pay==='支付宝'){
                 this.formDate2.order_pay==='1'
            }else if(this.formDate2.order_pay==='微信'){
                 this.formDate2.order_pay==='2'
            }else if(this.formDate2.order_pay==='银行卡'){
                 this.formDate2.order_pay==='3'
            }
            // console.log(this.formDate2.order_pay);
            // console.log(this.formDate2.pay_status);
             const res = await this.$http.put(
                    `orders/${this.id.order_id}}`,{order_price:40,
                    is_send:0,
                    order_pay:0,
                    pay_status:1
                    }
                );
                if(res.data.meta.status===201){
                    this.$message.success(res.data.meta.msg)
                    this.getlist()
                }
                    this.dialogVisible=false
        },
        // 修改信息
        async putlist(a){
            this.id=a
             const { data: { data, meta: { msg, status } } } = await this.$http.get(
                    `orders/${a.order_id}}`
                );
                if(data.pay_status==='0'){
                    data.pay_status='否'
                }else{
                    data.pay_status='是'
                }
                if(data.order_pay==='0'){
                    data.order_pay='未支付'
                }else if(data.order_pay==='1'){
                    data.order_pay='支付宝'
                }else if(data.order_pay==='2'){
                    data.order_pay='微信'
                }else if(data.order_pay==='3'){
                    data.order_pay='银行卡'
                }
                this.formDate2=data
            this.dialogVisible=true
        },
        //多少一页
        handleSizeChange(){
            this.getlist()
        },
        // 多少页
        handleCurrentChange(){
            this.getlist()
        },
        async getlist(){
            const { data: { data, meta: { msg, status } } } = await this.$http.get(
                    `orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`
                );
                this.tableData=data.goods
                this.total=data.total
            }
    },
    created(){
        this.getlist()
    }
}
</script>

<style>

</style>
