<template>
  <div>
    <div id="main" :style="{width:'800px',height:'500px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceScoreCurrent: this.priceScore,
      scoreMCurrent: this.scoreM,
      companyCurrent: this.company
    }
  },
  props: ['priceScore', 'scoreM', 'company', 'cutline'],
  mounted() {
    this.draw(this.priceScoreCurrent, this.scoreMCurrent, this.companyCurrent, this.cutline)
  },
  watch: {
    priceScore(newval, oldval) {
      console.log(oldval + '----' + newval)
      this.priceScoreCurrent = newval
      this.draw(this.priceScoreCurrent, this.scoreMCurrent, this.companyCurrent, this.cutline)
    },
    scoreM(newval) {
      this.scoreMCurrent = newval
      this.draw(this.priceScoreCurrent, this.scoreMCurrent, this.companyCurrent, this.cutline)
    },
    company(newval) {
      this.companyCurrent = newval
    }
  },
  methods: {
    draw(priceScore, priceScoreM, company, cutline) {
      var app = this.$echarts.init(document.getElementById('main'))
      var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: this.$echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          }
          app.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          })
        }
      }
      var labelOption = {
        normal: {
          show: true,
          position: app.config.position,
          distance: app.config.distance,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          rotate: app.config.rotate,
          // formatter: '{c}  {name|{a}}',
          formatter: '{c}',
          fontSize: 12,
          rich: {
            name: {
              textBorderColor: '#fff'
            }
          }
        }
      }
      var option = {
        color: ['#003366', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: cutline
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            // data: ['公司1', '公司2', '公司3', '公司4', '公司5', '标准均值']
            data: company
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '评分',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            // data: [98, 91, 89.2, 94.1, 97.2, 94.3]
            data: priceScore
          },
          {
            name: '评分*0.4',
            type: 'bar',
            label: labelOption,
            // data: [37.5, 33.2, 30.1, 35.1, 36.4, 33.9]
            data: priceScoreM
          }
        ]
      }
      app.setOption(option)
    }
  }
}
</script>

<style>
</style>
