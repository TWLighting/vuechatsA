<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <Piechart :chartData="chartData" :options="chartOptions"></Piechart>
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
    piedata: {
      type: Object
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
    setbardata() {
      console.log(this.piedata);
      let labels = [];
      let backgroundColor = [];
      let borderColor = [];
      let data = [];

      for (let ssdrow of this.items) {
        let barcolor = this.statucolor(ssdrow.Status);
        labels.push(ssdrow.DeviceName);
        data.push(ssdrow[this.pietype]);
        backgroundColor.push(barcolor);
        borderColor.push(barcolor);
      }
      // 創建charts圖形的必要屬性
      this.chartData = Object.assign({}, this.chartData, {
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
    }
  },

  created() {
    this.setbardata();
  },

  data() {
    return {
      chartData: null,
      chartOptions: {
        title: {
          display: true,
          text: "TEST",
          position: "top"
        },
        rotation: -0.7 * Math.PI
      }
    };
  }
};
</script>
