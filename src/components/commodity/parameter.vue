<template>
    <el-card id="box">
        <mian-bao leavel1="商品管理" leavel2="分类参数"></mian-bao>
        <el-alert
            title="注意:只允许为第三级分类设置参数"
            type="warning"
            center
            show-icon class="heaad">
        </el-alert>
        <el-form label-position="left" label-width="110px" :model="formDate">
            <el-form-item label="请选择商品分类">
                <el-cascader
                    :options="options"
                    :props="prop"
                    clearable
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="1">
                <el-button type="primary" @click="geidatad()">设置动态参数</el-button>
                    <el-table
                    :data="tableData2"
                    style="width: 100%">
                    <el-table-column type="expand" width="20">
                    <template slot-scope="scope">
                        <el-tag
                        v-for="(tag) in scope.row.attr_vals"
                        :key="tag"
                        closable
                        type="primary"
                        @close="handleClose(scope.row,tag)">
                        {{tag}}
                        </el-tag>
                        <!-- 添加 -->
                        <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(scope.row)"
                        @blur="handleInputConfirm(scope.row)"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row.attr_vals)">+ New Tag</el-button>
                    </template>
                </el-table-column>
                    <el-table-column
                        label="#"
                        width="80">
                    </el-table-column>
                    <el-table-column
                        prop="attr_name"
                        label="属性名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="deletelistd(scope.row)"></el-button>
                </template>
                </el-table-column>
                    </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态参数" name="2">
                <el-button type="primary" @click="geidataj()">设置静态态参数</el-button>
                <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="#"
                    width="80"
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="attr_name"
                    label="属性名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="attr_vals"
                    label="属性值"
                    width="180">
                </el-table-column>
                 <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="fn()"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="deletelistj(scope.row)"></el-button>
                </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form label-position="top" label-width="80px" :model="formForm">
            <el-form-item label="属性名称">
            <el-input v-model="formForm.a"></el-input>
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
export default {
    data () {
        return {
            inputVisible: false,
            inputValue: '',
            formDate:{},
            prop:{
                label:'cat_name',
                value:'cat_id'
            },
            tableData:[],
            tableData2:[],
            options:[],
            selectedOptions:[],  //商品id  三个
            activeName:'1',
            dialogVisible:false,
            formForm:{
                a:''
            }
        }
    },
    methods: {
       async dialogVisibl(){
                const res = await this.$http.post(`categories/${this.selectedOptions[2]}/attributes`,{attr_sel:'many',attr_name:this.formForm.a});
                if(res.data.meta.status===201){
                this.$message.success(res.data.meta.msg)
                this.dialogVisible=false;
                this.handleChange()
            }
        },
        //添加标签
         showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
        async handleInputConfirm(a) {
        let inputValue = this.inputValue;
        if (inputValue) {
          a.attr_vals.push(inputValue);  //添加到数组里
          var b = a.attr_vals.join(',')
          const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${a.attr_id}`,{attr_sel:'many',attr_name:a.attr_name,attr_vals:b});
          if(res.data.meta.status===200){
                this.$message.success(res.data.meta.msg)
                
            }
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
        async geilist(){
            const{ data: { data, meta: { msg, status } } }=await this.$http.get(`categories?type=3`);
            this.options=data
        },
        // 商品改变
        async handleChange(value){
            if(this.selectedOptions.length!==3&&this.selectedOptions.length!==0){
                return this.$message.error('只能选择三级参数')
            }
            const{ data: { data, meta: { msg, status } } }=await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
            this.tableData=data;
            const res =await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        res.data.data.forEach(item=>{
            item.attr_vals=item.attr_vals.trim().length===0?[]:item.attr_vals.trim().split(',')
        })
        this.tableData2=res.data.data
        console.log(this.tableData2);
        },
        // 操作动态参数
        async handleClose(a,b){
            a.attr_vals.splice(a.attr_vals.indexOf(b),1)
            var c=a.attr_vals.join(',')
            const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${a.attr_id}`,{attr_sel:'many',attr_name:a.attr_name,attr_vals:c});
            if(res.data.meta.status===200){
                this.$message.success(res.data.meta.msg)
            }
        },
        // 删除列表
        async deletelistd(a){
            const res = await this.$http.delete(`categories/${this.selectedOptions[2]}/attributes/${a.attr_id}`);
            if(res.data.meta.status===200){
                this.$message.success(res.data.meta.msg)
                this.handleChange()
            }
        },
        // tabs切换
        handleClick(){

        },
        //静态数据
        geidataj(){

        }
        ,//动态数据
        async geidatad(){
            if(this.selectedOptions.length===3){
                this.dialogVisible=true
            }else{
                this.$message.error('请先设置商品')
            }
        }
    },
    created(){
        this.geilist()
    }
}
</script>

<style>
#box{
    height: 100%;
}
.heaad{
    margin-top: 15px;
}
.el-button{
    padding: 9px 20px;
}
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
