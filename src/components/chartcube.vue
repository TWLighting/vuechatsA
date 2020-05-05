<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <Barchart
      :chartData="chartData"
      :options="chartOptions"
      :styles="{ height: this.height, position: 'relative' }"
    ></Barchart>
  </div>
</template>
<script>
import Barchart from "./charts/barchart";

export default {
  props: {
    height: {
      type: String,
      default: "250px"
    },
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    ifAlert: {
      type: Boolean,
      default: false
    }
  },
  components: { Barchart },
  methods: {
    statucolor(statusValue) {
      let color = "";
      if (statusValue >= 90) {
        color = "#006666";
      } else if (statusValue >= 80) {
        color = "#008E8A";
      } else if (statusValue >= 60) {
        color = "#00B2A9";
      } else if (statusValue >= 20) {
        color = "#FF7B22";
      } else {
        color = "#E52828";
      }
      return color;
    },
    setbardata() {
      let labels = [];
      let backgroundColor = [];
      let borderColor = [];
      let data = [];

      for (let ssdrow of this.riskiest) {
        let barcolor = this.statucolor(ssdrow.risk);
        labels.push(ssdrow.DeviceName);
        data.push(ssdrow.risk);
        backgroundColor.push(barcolor);
        borderColor.push(barcolor);
      }
      // 創建charts圖形的必要屬性
      this.chartData = Object.assign({}, this.chartData, {
        labels: labels,
        borderSkipped: "bottom",
        datasets: [
          {
            label: this.title,
            barPercentage: 0.3,
            barThickness: 20,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: data
          }
        ]
      });
    }
  },
  computed: {
    riskiest: function() {
      return this.items.slice().sort((a, b) => a.risk - b.risk);
    }
  },
  created() {
    this.setbardata();
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        legend: {
          display: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false, // my new default options
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: this.ifAlert ? "rgba(0,0,0,0.5)" : "#ffffff",
                stepSize: 20, // 設定 x 軸的數字級距
                z: 10
              },
              stacked: false,
              gridLines: {
                lineWidth: 1,
                color: this.ifAlert ? "rgba(0,0,0,0.5)" : "#ffffff",
                zeroLineColor: this.ifAlert ? "#56565E" : "#56565E",
                offsetGridLines: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: this.ifAlert ? "#09D9A7" : "#09D9A7",
                padding: 0,
                lineHeight: 0,
                z: 10
              },
              stacked: false,
              gridLines: {
                color: this.ifAlert ? "#ffffff" : "#464655",
                offsetGridLines: true,
                z: -10
              }
            }
          ]
        }
      }
    };
  }
};
</script>
