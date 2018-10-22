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
      <el-col :xs="24" :sm="12" :md="16" :lg="18" v-if="priceCalcuted.avgStander">
        <graph :price-score="priceCalcuted.result"
        :score-m="priceCalcuted.resultmin"
        :company="companies"
        :cutline="['评分', '评分*0.4']"></graph>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { companyScore } from '../../static/script/index.js'
import Graph from '../components/graph'
export default {
  components: {
    Graph
  },
  name: 'Home',
  data() {
    return {
      companyPrice: [],
      inputNums: 5,
      priceCalcuted: {
        avgStander: null,
        result: [],
        resultmin: []
      },
      companies: [],
      childPropsNeed: {
      }
    }
  },
  mounted() {},
  methods: {
    resetAll() {
      this.companyPrice = []
      this.priceCalcuted.result = []
      this.priceCalcuted.resultmin = []
      this.priceCalcuted.avgStander = null
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
      priceAfter.result.forEach((ele, index) => {
        this.companies.push('报价' + (index + 1))
      })
    },
    formatInput(prices) {
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
