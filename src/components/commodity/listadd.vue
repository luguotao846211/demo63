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
                <el-form class="form" label-position="top" label-width="80px" :model="formDate">
        <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick" height="400px">
            <el-tab-pane label="基本信息" name="1">
                    <el-form-item label="商品名称">
                        <el-input v-model="formDate.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="formDate.region"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="formDate.type"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="formDate.type"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                       <div class="block">
                            <el-cascader
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
                    <el-checkbox-group v-model="checkboxGroup" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="(item1,z) in item.attr_vals" :key="z" :label="item1" border></el-checkbox>
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

            </el-tab-pane>
            <el-tab-pane label="商品内容" name="5">

            </el-tab-pane>
        </el-tabs>
                </el-form>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      formDate1:[],
      formLabelAlign:{},
      checkboxGroup: [],
      active: "1",
      value6: "",
      cities: [],
      xinxi: [],
      xinxi1:{},
      selectedOptions: [],
      props: { value: "cat_id", label: "cat_name", children: "children" },
      activeName: "1",
      formDate: {}
    };
  },
  methods: {
      //获取商品属性
      async getshuxing(){
       const { data: { data, meta: { msg, status } } } = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );
        this.formDate1=data
        console.log(data);
      },
      //选中的商品
      handleCheckedCitiesChange(a){
          console.log(a);
      },
    //选定商品
    handleChange(a) {
      if (this.selectedOptions.length !== 3) {
        this.$message.error("只能添加三级菜单");
        this.selectedOptions = [];
      }
    },
    //获取下拉框的选项
    async getshop() {
      const arr = [1, 2, 3];
      const { data: { data, meta: { msg, status } } } = await this.$http.get(
        `categories?type=${arr}`
      );
      this.cities = data;
    },

    // tabs
    async handleClick(tab) {
      if (this.selectedOptions.length === 3) {
        const { data: { data, meta: { msg, status } } } = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // 动态阐参数？
        this.xinxi = data;
        console.log(data);
        // this.checkboxGroup=data
        // for(var i = 0;i<data.length;i++){
        //     this.checkboxGroup.push(data[i].attr_vals)
        // }
        var a =[];
        data.forEach(item => {
            console.log(item.attr_vals);
            item.attr_vals = item.attr_vals.split(',')
            item.attr_vals.forEach(item1=>{
                a.push(item1)
            })
        });
        this.checkboxGroup=a
        this.active = tab.name;
        if(tab.name==='3'){
            this.getshuxing();
        }
      }else{
          if(tab.name==='2' || tab.name==='3'){
              this.activeName='1'  //返回第一页？
              this.$message.error('请先选择商品')
          }
      }
    }
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
.el-checkbox{
    margin-right: 10px;
}
.form{
    height: 700px;
    overflow: auto;
}
</style>
