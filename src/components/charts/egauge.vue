<template>
  <v-chart :options="option" />
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 200px;
  height: 200px;
}
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/gauge";

export default {
  props: {
    name: {
      type: String,
      default: null
    },
    tempvalue: {
      type: Number,
      default: null
    }
  },
  components: {
    "v-chart": ECharts
  },
  methods: {
    setClock() {
      this.option.series[0].data[0].value =
        (Math.random() * 100).toFixed(2) - 0;
      setInterval(function() {
        this.$set(this.option, 0, this.option);
      }, 2000);
    }
  },
  mounted() {
    // this.setClock();
  },
  data() {
    return {
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "℃",
            type: "gauge",

            center: ["50%", "40%"],
            min: -40,
            max: 100,
            splitNumber: 14,
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              lineStyle: {
                width: 20,
                color: [
                  [0.285714, "#f24444"],
                  [0.7857143, "#00b2a9"],
                  [1, "#f24444"]
                ]
              }
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: "auto"
              }
            },
            axisTick: {
              length: 15,
              lineStyle: {
                color: "auto"
              }
            },
            title: {
              textStyle: {
                fontWeight: "bolder",
                fontSize: 20,
                fontStyle: "italic",
                color: "#ffffff"
              },
              offsetCenter: [0, "100%"]
            },
            detail: {
              textStyle: {
                fontWeight: "bolder",
                fontSize: 20
              }
            },
            data: [{ value: this.tempvalue, name: this.name }]
          }
        ]
      }
    };
  }
};
</script>
