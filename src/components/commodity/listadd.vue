<template>
    <el-card id="box">
        <mian-bao leavel1="商品管理" leavel2="商品列表"></mian-bao>
        <el-alert simple title="添加商品信息" type="warning" center show-icon class="title" :closable="false">
        </el-alert>
        <el-steps  :active="parseInt(active)" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
                <el-form class="foRm" label-position="top" label-width="80px" :model="formDate">
        <el-tabs v-model="active" tab-position="left" @tab-click="handleClick" height="400px">
            <el-tab-pane label="基本信息" name="1">
                    <el-form-item label="商品名称">
                        <el-input v-model="formDate.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="formDate.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="formDate.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="formDate.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                       <div class="block">
                            <el-cascader
                                clearable
                                expand-trigger="click"
                                :options="cities"
                                :props="props"
                                v-model="selectedOptions"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="2">

            <el-form label-width="80px" :model="xinxi1">
            <el-form-item v-for="(item,i) in xinxi" :key="i" :label="item.attr_name">
                <!-- <div style="margin-top: 20px"> -->
                    <!-- <el-checkbox-group v-model="item.attr_vals" @change="handleCheckedCitiesChange"> -->
                    <!-- 上面点击会删除？ -->
                    <el-checkbox-group v-model="item.attr_vals" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(item1) in item.a" :key="item1" :label="item1" border></el-checkbox>
                    </el-checkbox-group>
                <!-- </div> -->
            </el-form-item>
            </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="3">
                <el-form label-width="180px" label-position="top" :model="formLabelAlign">
                <el-form-item v-for="(item,i) in formDate1" :key="i" :label="item.attr_name">
                    <el-input  v-model="item.attr_vals"></el-input>
                </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="4">
                <el-upload
                class="upload-demo"
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList2"
                :on-success='changeFile'
                :headers="heades"
                multiple
                list-type="picture">
                <!-- drag 拖拽 multiple 多个-->
                <el-button size="small" type="primary">上传图片</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="5">
            <el-button type="primary" plain @click="shopadd()">添加商品</el-button>
               <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
  </quill-editor>

            </el-tab-pane>
        </el-tabs>
                </el-form>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        },
      formDate1:[],
      formLabelAlign:{},
      checkboxGroup: [],
      active: '1',
      value6: "",
      cities: [],
      xinxi: [],  //商品参数信息
      xinxi1:{},
      xinxi2:[],
      selectedOptions: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      formDate: {},
      fileList2:[],
      potos:[],
      heades:{},
    };
  },
  methods: {
    //   发送请求上传商品
      async shopadd(){
        //   console.log(this.formDate);  //第一页信息
        //   console.log(this.selectedOptions);   //分类id
            if(!this.formDate.goods_name){
                this.active='1'
                return this.$message.warning('请输入商品名称')
            }else if(!this.formDate.goods_price){
                this.active='1'
                return this.$message.warning('请输入商品价格')
            }else if(!this.formDate.goods_number){
                this.active='1'
                return this.$message.warning('请输入商品数量')
            }else if(!this.formDate.goods_weight){
                this.active='1'
                return this.$message.warning('请输入商品重量')
            }
            this.active=this.active+''
          let arr1=[]//attrs数据
          let arr2=[]
        //   console.log(this.potos);  // 图片数据
        //   console.log(this.content);  //富文本
        //   console.log(this.formDate1);  //静态参数
              this.xinxi.forEach((item)=>{
                let ax= item.attr_vals.join(',')
                //   console.log(item.attr_vals.join(','));
              arr1.push({attr_id:item.attr_id,attr_value:ax})
          })
          this.formDate1.forEach((item)=>{
              // console.log(item);
            //   item.attr_vals=item.attr_vals.join(',')
            // let ax= item.attr_vals.join(',')
              arr2.push({attr_id:item.attr_id,attr_value:item.attr_vals})
          })
          const arr3=[...arr1,...arr2]
          let form = this.formDate
          form.pics=this.potos
          form.attrs=arr3
          form.goods_introduce=this.content
          form.goods_cat=this.selectedOptions.join(',')
          // console.log(form);
        //   const { data: { data, meta: { msg, status } } } = await this.$http.post(`goods`,form);
          const { data: { data, meta: { msg, status } } } = await this.$http.post(`goods`,form);
            console.log(data);
          if(status===201){
            this.$message.success(msg);    
            this.$router.push({name:'shoplist'})
          }else{
            this.active='1'
            // this.$message.error(msg);
          }
      },
    //   富文本编辑器
      onEditorBlur(quill) {
        
        // console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        // console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        // console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        this.content = html
      },
    //   移出时触发
    handleRemove(file, fileList) {
        console.log(file)
        const arrPic = this.potos.findIndex((item)=>{
            // console.log(item.pic);
            return item.pic === file.response.data.tmp_path
        })
        this.potos.splice(arrPic,1)
      },
      //点击文件列表中已上传的文件时的钩子
      handlePreview(file) {
        console.log(file);
    },
    //文件上传是触发
    changeFile(response,file, fileList){
        // console.log(response);
        // console.log(file);
        // console.log(fileList);
        const {data,meta}=response;
        if(meta.status===200){
            this.potos.push({pic:data.tmp_path})
        }else{
            this.$message.success(meta.msg)
        }
        // console.log(this.potos);
    },
      //获取商品属性
      async getshuxing(){
       const { data: { data, meta: { msg, status } } } = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        this.formDate1=data
        // console.log(data);
      },
      //选中的商品
      handleCheckedCitiesChange(a){
          // console.log(a);
          // console.log(this.xinxi);
      },
    //选定商品
    async handleChange(a) {
        this.getshuxing()
      if (this.selectedOptions.length !== 3 && this.selectedOptions.length !== 0) {
        this.$message.error("只能添加三级菜单");
        this.selectedOptions = [];
        return
      }
      const { data: { data, meta: { msg, status } } } = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // 动态阐参数？
        this.xinxi = data;
        // console.log(data);
        // this.checkboxGroup=data
        // for(var i = 0;i<data.length;i++){
        //     this.checkboxGroup.push(data[i].attr_vals)
        // }
        //一开始遍历的没啥用
        var a = [];
        this.xinxi.forEach(item => {
            // console.log(item.attr_vals);
            // item.a=123
            item.attr_vals = item.attr_vals.trim().length===0?[]:item.attr_vals.trim().split(',')
            // this.attr_vals1.push(item.attr_vals)
            item.a=item.attr_vals
            a.push(item.attr_vals)
        });
    },
    //获取下拉框的选项
    async getshop() {
      const arr = [1, 2, 3];
      const { data: { data, meta: { msg, status } } } = await this.$http.get(
        `categories?type=${arr}`
      );
      this.cities = data;
      const AUTH_TOKEN = localStorage.getItem('token')
      this.heades['Authorization']=AUTH_TOKEN
    },

    // tabs
    async handleClick(tab) {
      if (this.selectedOptions.length === 3) {
        // const { data: { data, meta: { msg, status } } } = await this.$http.get(
        //   `categories/${this.selectedOptions[2]}/attributes?sel=many`
        // );
        // // 动态阐参数？
        // this.xinxi = data;
        // // console.log(data);
        // // this.checkboxGroup=data
        // // for(var i = 0;i<data.length;i++){
        // //     this.checkboxGroup.push(data[i].attr_vals)
        // // }
        // //一开始遍历的没啥用
        // var a = [];
        // this.xinxi.forEach(item => {
        //     // console.log(item.attr_vals);
        //     // item.a=123
        //     item.attr_vals = item.attr_vals.trim().length===0?[]:item.attr_vals.trim().split(',')
        //     // this.attr_vals1.push(item.attr_vals)
        //     item.a=item.attr_vals
        //     a.push(item.attr_vals)
        // });
        // // this.xinxi.a=a
        // this.xinxi2=a
        // // console.log(this.xinxi.a);
        // console.log(this.xinxi);
        // this.active = tab.name;
        if(tab.name==='3'){
            // this.getshuxing();
        }
      }else{
          if(tab.name==='2' || tab.name==='3'){
              this.$message.error('请先选择商品参数')
              this.xinxi=[]
              this.active='1'  //返回第一页？
          }
      }
    }
  },
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
  mounted() {
      // console.log('this is current quill instance object', this.editor)
    },
  created() {
    this.getshop();
  }
};
</script>

<style>
#box {
  height: 100%;
}
.title {
  margin-top: 30px;
  margin-bottom: 15px;
}
.el-step__title {
  font-size: 14px;
}
.el-checkbox {
  margin-right: 10px;
}
.foRm {
  height: 700px;
  overflow: auto;
}
</style>
