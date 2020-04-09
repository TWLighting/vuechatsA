<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <Linechart :chartData="chartData" :options="chartOptions"></Linechart>
  </div>
</template>

<script>
import Linechart from "./charts/linechart";
var dayjs = require("dayjs");
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  components: { Linechart },
  computed: {},
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
      let setdatasets = [];
      let labels = [];
      let unexpectedrow = {};
      let day = dayjs(new Date());
      for (let st = 7; st >= 1; st--) {
        labels.push(day.subtract(st, "day").format("MM-DD"));
      }

      for (let ssdrow of this.items) {
        unexpectedrow = this.unexpectedsSSDs.filter(
          x => x.name === ssdrow.DeviceName
        );
        // 設定每個線段樣式
        let rowdata = {};
        rowdata.label = unexpectedrow[0].name;
        rowdata.backgroundColor = this.statucolor(ssdrow.Status);
        rowdata.borderColor = this.statucolor(ssdrow.Status); // 設定線的顏色
        rowdata.pointBorderColor = this.statucolor(ssdrow.Status);
        rowdata.pointBackgroundColor = this.statucolor(ssdrow.Status); // 設定點的顏色
        rowdata.pointHoverBackgroundColor = this.statucolor(ssdrow.Status); // 設定點的顏色
        rowdata.lineTension = 0; // 顯示折線圖，不使用曲線
        rowdata.data = unexpectedrow[0].unexpectedday;
        rowdata.pointBorderWidth = 1;
        rowdata.pointHoverRadius = 1;
        rowdata.borderWidth = 1;
        rowdata.fill = false; // 不顯示底下的灰色區塊
        setdatasets.push(rowdata);
      }
      // 創建charts圖形的必要屬性
      this.chartData = Object.assign({}, this.chartData, {
        labels: labels,
        datasets: setdatasets
      });
    }
  },

  created() {
    this.setbardata();
  },
  data() {
    return {
      unexpectedsSSDs: [
        {
          name: "DESKTOP-NIFFRRK-DISK1",
          unexpectedday: [40, 40, 50, 80, 30, 50, 20]
        },
        {
          name: "DESKTOP-NIFFRRK-DISK2",
          unexpectedday: [40, 40, 80, 80, 10, 90, 10]
        },
        {
          name: "DESKTOP-FVGFV-DISK2",
          unexpectedday: [40, 40, 50, 80, 10, 22, 20]
        },
        {
          name: "DESKTOP-FVGFV-DISK1",
          unexpectedday: [40, 40, 50, 70, 55, 50, 0]
        },
        {
          name: "DESKTOP-ggfgfgf-DISK2",
          unexpectedday: [50, 0, 50, 80, 10, 80, 20]
        }
      ],
      chartData: null,
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(0,0,0,0.5)",
                fontStyle: "bold",
                maxTicksLimit: 5,
                padding: 5
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                zeroLineColor: "transparent"
              },
              ticks: {
                padding: 5,
                fontColor: "rgba(0,0,0,0.5)",
                fontStyle: "bold"
              }
            }
          ]
        }
      }
    };
  }
};
</script>
