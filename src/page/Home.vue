<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="10" :md="8" :lg="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>添加各公司标价</span>
          </div>
          <div v-for="item in inputNums" :key="item" class="input-container clearfix">
            <el-input-number :step="1000" v-model="companyPrice[item-1]">{{item}}</el-input-number>
          </div>
          <div class="card1-footer">
            <el-button @click="resetAll">重置</el-button>
            <el-button @click="caculatePrice">计算</el-button>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :xs="24" :sm="10" :md="8" :lg="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>经济得分</span>
          </div>
          <div v-for="(item, index) in priceCalcuted.result" :key="index" class="priceItem">
            {{item}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" :lg="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>经济得分*0.4</span>
          </div>
          <div v-for="(item, index) in priceCalcuted.resultmin" :key="index" class="priceItem">
            {{item}}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="10" :md="8" :lg="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基准价</span>
          </div>
          <div v-if="priceCalcuted.avgStander">
            <p>{{ priceCalcuted.avgStander }}</p>
          </div>
        </el-card>
      </el-col> -->
      <el-col :xs="24" :sm="10" :md="8" :lg="6">
        <div id="main"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { companyScore } from '../../static/script/index.js'
export default {
  name: 'Home',
  data() {
    return {
      companyPrice: [],
      inputNums: 5,
      priceCalcuted: {
        avgStander: null,
        result: [],
        resultmin: []
      }
    }
  },
  mounted() {
    this.drawgraph()
  },
  methods: {
    resetAll() {
      this.companyPrice = []
      this.priceCalcuted.avgStander = null
      this.priceCalcuted.result = []
      this.priceCalcuted.resultmin = []
    },
    caculatePrice() {
      var inputPrices = this.companyPrice
      console.log(inputPrices)
      console.log(inputPrices.length)
      var prices = this.formatInput(inputPrices)
      // console.log(prices)
      // console.log(prices.length)
      var priceAfter = companyScore(prices)
      console.log(priceAfter)
      this.priceCalcuted = priceAfter
    },
    formatInput(prices) {
      var result = []
      prices.forEach(element => {
        if (element !== undefined) {
          result.push(element)
        }
      })
      return result
    },
    drawgraph() {
      var chartObj = this.$echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      chartObj.setOption(option)
    }
  }
}
</script>

<style>
.input-container {
  margin-top: 10px;
}
.card1-footer {
  margin-top: 30px;
  width: 100%;
}
.priceItem {
  margin: 30px 0;
}
.priceItem:first-child {
  margin-top: 30px;
}
#main {
  width: 600px;
  height: 400px;
  margin-top: 50px;
}
</style>
