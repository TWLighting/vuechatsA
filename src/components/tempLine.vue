<template>
  <div>
    <b-row class="justify-content-center">
      <b-col class="scrollline">
        <Linechart
          :chartData="chartData"
          :options="chartOptions"
          :style="{width:'2000px',height:'600px'}"
        ></Linechart>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Linechart from "./charts/linechart";
var dayjs = require("dayjs");
export default {
  props: {
    TempRowList: {
      type: Object,
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
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
    },
    setlinedata() {
      let setdatasets = [];
      let labels = [];
      let rowdata = {};
      let linedata = [];

      // 設定每個線段樣式

      let day = dayjs(new Date());
      for (let st = 168; st >= 1; st--) {
        labels.push(day.subtract(st, "hour").format("MM-DD HH"));
        linedata.push(this.getRandomIntInclusive(-45, 100));
      }
      // console.log(this.TempRowList);
      rowdata.label = this.TempRowList.lists.SSDName;
      rowdata.backgroundColor = this.statucolor(70);
      rowdata.borderColor = this.statucolor(70); // 設定線的顏色
      rowdata.pointBorderColor = this.statucolor(70);
      rowdata.pointBackgroundColor = this.statucolor(70); // 設定點的顏色
      rowdata.pointHoverBackgroundColor = this.statucolor(70); // 設定點的顏色
      rowdata.lineTension = 0; // 顯示折線圖，不使用曲線
      rowdata.pointBorderWidth = 1;
      rowdata.pointHoverRadius = 1;
      rowdata.borderWidth = 1;
      rowdata.fill = false; // 不顯示底下的灰色區塊
      rowdata.data = linedata;

      setdatasets.push(rowdata);
      // 創建charts圖形的必要屬性
      this.chartData = Object.assign({}, this.chartData, {
        labels: labels,
        datasets: setdatasets
      });
      this.chartOptions = Object.assign({}, this.chartOptions, {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          fullWidth: false,
          align: "left",
          labels: { boxWidth: 20 }
        },
        title: {
          position: "left",
          display: true,
          text: this.TempRowList.title
        },
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
      });
    }
  },
  created() {
    this.setlinedata();
    // this.getvalue();
  },
  data() {
    return {
      Templinedata: [],
      chartData: null,
      chartOptions: null
    };
  }
};
</script>
