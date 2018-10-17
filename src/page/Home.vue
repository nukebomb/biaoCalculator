<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
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
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>经济得分</span>
          </div>
          <div v-for="(item, index) in priceCalcuted.result" :key="index" class="priceItem">
            {{item}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>经济得分*0.4</span>
          </div>
          <div v-for="(item, index) in priceCalcuted.resultmin" :key="index" class="priceItem">
            {{item}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基准价</span>
          </div>
          <div v-if="priceCalcuted.avgStander">
            <p>{{ priceCalcuted.avgStander }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { companyScore } from '../../static/script/index.js'
export default {
  name: 'Home',
  data () {
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
  methods: {
    resetAll () {
      this.companyPrice = []
      this.priceCalcuted.avgStander = null
      this.priceCalcuted.result = []
      this.priceCalcuted.resultmin = []
    },
    caculatePrice () {
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
    formatInput (prices) {
      var result = []
      prices.forEach(element => {
        if (element !== undefined) {
          result.push(element)
        }
      })
      return result
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
</style>
