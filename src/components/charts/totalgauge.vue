<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <b-row>
      <b-col class="d-flex justify-content-center">
        <v-chart :style="{width:'300px',height:'300px',marginLeft:'8%'}" :options="option" />
      </b-col>
    </b-row>
  </div>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
</style>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/gauge";

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  components: {
    "v-chart": ECharts
  },
  methods: {
    setgaugedata() {
      let connected = this.connected;
      let total = this.total;

      this.option = Object.assign({}, this.option, {
        legend: {
          right: "center",
          bottom: 0,
          orient: "horizontal"
        },
        series: [
          {
            type: "gauge",
            center: ["40%", "40%"],
            startAngle: 225,
            endAngle: -45,
            radius: "75%",
            splitNumber: 0,
            axisLine: {
              lineStyle: {
                width: 40,
                color: [
                  [connected / total, "#00b2a9"],
                  [1, "#666666"]
                ]
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + "") {
                }
              }
            },
            pointer: {
              width: 0
            },
            title: {
              textStyle: {
                fontWeight: "bolder",
                fontSize: 15,
                color: "#ffffff"
              },
              offsetCenter: [0, "20%"]
            },
            detail: {
              textStyle: {
                fontWeight: "bolder",
                fontSize: 30,
                color: "#00f0b4"
              },
              offsetCenter: [0, "80%"],
              formatter: function(value) {
                return connected.toString().concat("/", total.toString());
              }
            },
            data: [{ value: connected }]
          }
        ]
      });
    }
  },
  created() {
    this.setgaugedata();
  },
  computed: {
    connected() {
      return 2;
    },
    total() {
      return 3;
    }
  },
  data() {
    return {
      option: {}
    };
  }
};
</script>
