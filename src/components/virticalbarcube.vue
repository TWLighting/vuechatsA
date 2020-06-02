<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <Vbarchart
      :chartData="chartData"
      :options="chartOptions"
      :styles="{ height: this.height, position: 'relative' }"
    ></Vbarchart>
  </div>
</template>
<script>
import Vbarchart from "./charts/verticalbar";

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
  components: { Vbarchart },
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
      let labels = ["0%-20%", "20%-40%", "40%-60%", "60%-80%", "80%-100%"];
      let backgroundColor = [];
      let borderColor = [];
      let data = [5, 1, 8, 9, 4];

      for (let ssdrow of this.items) {
        let barcolor = this.statucolor(ssdrow.risk);
        backgroundColor.push(barcolor);
        borderColor.push(barcolor);
      }
      // 創建charts圖形的必要屬性
      this.chartData = Object.assign({}, this.chartData, {
        labels: labels,
        borderSkipped: "bottom",
        datasets: [
          {
            label: "total",
            barPercentage: 0.1,
            barThickness: 20,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: data
          }
        ]
      });
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
            top: 10,
            bottom: 0
          }
        },
        maintainAspectRatio: false, // my new default options
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#ffffff",
                z: 10
              },
              stacked: false,
              gridLines: {
                color: "#ffffff",
                offsetGridLines: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#09D9A7",
                stepSize: 5, // 設定 y 軸的數字級距
                z: 10
              },
              stacked: false,
              gridLines: {
                lineWidth: 1,
                zeroLineColor: "#56565E",
                color: "#464655",
                offsetGridLines: false,
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
