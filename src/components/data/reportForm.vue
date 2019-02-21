<template>
    <el-card id="box">
        <mian-bao leavel1="数据统计" leavel2="数据报表"></mian-bao>
        <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
</template>

<script>
import Myecharts from 'echarts';
export default {
  data() {
    return {};
  },
  methods: {
    async getlist() {
      var myChart = Myecharts.init(document.getElementById("main"));
      var option1 = {
    title: {
        text: '堆叠区域图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    }
};
      const { data: { data, meta: { msg, status } } } = await this.$http.get(`reports/type/1`)
        console.log(data);
        const option={...option1,...data}
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style>
#box {
  height: 100%;
}
</style>
