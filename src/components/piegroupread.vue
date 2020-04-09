<template>
  <div>
    <b-row class="d-flex">
      <div class="piereadgroup" v-for="(option,index) in ssdoptions" :key="index">
        <!--
       <h5>{{option.name}}</h5>
        <hr size="1" width="100%" color="#ffffff" />
        -->
        <Piechart :chartData="option.chartData" :options="option.chartOptions"></Piechart>
      </div>
    </b-row>
  </div>
</template>

<script>
import Piechart from "./charts/peichart";

export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    pietype: {
      type: String
    }
  },
  components: { Piechart },
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
    ssdoptionapi(sessorid) {
      let api = "";
      switch (sessorid) {
        case "1":
          api = "";
          break;
        case "2":
          api = "";
          break;
        case "3":
          api = "";
          break;
        case "4":
          api = "";
          break;
        case "5":
          api = "";
          break;
        case "6":
          api = "";
          break;
      }
      return api;
    },
    setpiedata() {
      for (let option of this.ssdoptions) {
        let labels = [];
        let backgroundColor = [];
        let borderColor = [];
        let data = [];
        let api = this.ssdoptionapi(option.name);
        // for API的資料
        for (let ssdrow of this.items) {
          let barcolor = this.statucolor(ssdrow.Status);
          labels.push(ssdrow.DeviceName);
          data.push(ssdrow[this.pietype]);
          backgroundColor.push(barcolor);
          borderColor.push(barcolor);
        }
        // 創建charts圖形的必要屬性
        option.chartData = Object.assign({}, option.chartData, {
          labels: labels,
          borderSkipped: "bottom",
          datasets: [
            {
              fill: true,
              label: this.title,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              data: data
            }
          ]
        });
        option.chartOptions = Object.assign({}, option.chartOptions, {
          title: {
            text: option.name,
            display: true,
            position: "top"
          },
          legend: {
            display: false
          },
          rotation: -0.7 * Math.PI
        });
      }
    }
  },
  created() {
    this.setpiedata();
  },
  data() {
    return {
      // 固定按照功能分配API
      ssdoptions: [
        { name: "fn1", chartData: null, chartOptions: null },
        { name: "fn2", chartData: null, chartOptions: null },
        { name: "fn3", chartData: null, chartOptions: null },
        { name: "fn4", chartData: null, chartOptions: null },
        { name: "fn5", chartData: null, chartOptions: null },
        { name: "fn6", chartData: null, chartOptions: null }
      ]
    };
  }
};
</script>
