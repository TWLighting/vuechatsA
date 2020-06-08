<template>
  <div>
    <b-row>
      <b-col>
        <h5>{{this.title}}</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row>
      <h5>Model Name:{{this.items.Model}}</h5>
    </b-row>
    <b-row>
      <h5>Firmware Version:{{this.items.FW}}</h5>
    </b-row>
    <b-row>
      <h5>Serial Number:{{this.items.SeiresNumber}}</h5>
    </b-row>
    <b-row class="d-flex">
      <div class="piereadgroup" v-for="(option,index) in ssdoptions" :key="index">
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
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    ssddetial: {
      type: Array
    }
  },
  components: { Piechart },
  computed: {},
  methods: {
    setPiecolor(sensorname) {
      let color = "";
      switch (sensorname) {
        case "Read":
          color = "#CEF54C";
          break;
        case "Write":
          color = "#FE97B4";
          break;
        case "WriteLength 2K":
          color = "#CDF54B";
          break;
        case "WriteLength 4K":
          color = "#FF96B4";
          break;
        case "WriteLength 8K":
          color = "#FFFF5F";
          break;
        case "WriteLength 16K":
          color = "#82BDFB";
          break;
        case "WriteLength 32K":
          color = "#C8A5FF";
          break;
        case "WriteLength 64K":
          color = "#E3474D";
          break;
        case "WriteLength 128K":
          color = "#F5EA13";
          break;
        case "WriteLength Other":
          color = "#4175DE";
          break;
        case "ReadLength 2K":
          color = "#CDF54B";
          break;
        case "ReadLength 4K":
          color = "#FF96B4";
          break;
        case "ReadLength 8K":
          color = "#FFFF5F";
          break;
        case "ReadLength 16K":
          color = "#82BDFB";
          break;
        case "ReadLength 32K":
          color = "#C8A5FF";
          break;
        case "ReadLength 64K":
          color = "#E3474D";
          break;
        case "ReadLength 128K":
          color = "#F5EA13";
          break;
        case "ReadLength Other":
          color = "#4175DE";
          break;
      }
      return color;
    },
    async getsensoridListdata(ssddata) {
      let beginTs = moment().format("YYYY-MM-DD 00:00:00.000");
      let endTs = moment().format("YYYY-MM-DD 23:59:59.000");
      let allsensordata = [];
      for (let sensor of this.sensorList) {
        let sensorId = "/Disk/" + ssddata.DiskName + "/" + sensor;
        await this.getHisData(
          ssddata.AgentId,
          "SSDStatus",
          sensorId,
          beginTs,
          endTs,
          "1"
        ).then(function(xhr) {
          allsensordata.push(xhr.data.itemList);
        });
      }
      return allsensordata;
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
    },
    async setpiedata() {
      for (let i = 0; i < this.sensorList.length; i++) {
        let labels = [];
        let backgroundColor = [];
        let borderColor = [];
        let data = [];
        // let sensordata = null;
        // await this.getsensoridListdata(this.allrowpiedata[i]).then(function(
        //   res
        // ) {
        //   sensordata = res;
        // });
        // for API的資料
        // for (let ssdrow of sensordata) {
        //   let barcolor = this.setPiecolor(ssdrow[0].n);
        //   labels.push(ssdrow[0].n);
        //   data.push(ssdrow[0].v);
        //   backgroundColor.push(barcolor);
        //   borderColor.push(barcolor);
        // }
        for (let ssdrow of this.sensorList[i].List) {
          let barcolor = this.setPiecolor(ssdrow);
          labels.push(ssdrow);
          data.push(this.getRandomIntInclusive(100, 600));
          backgroundColor.push(barcolor);
          borderColor.push(barcolor);
        }
        // 創建charts圖形的必要屬性
        this.$set(this.ssdoptions, i, {});
        this.ssdoptions[i].chartData = Object.assign(
          {},
          this.ssdoptions[i].chartData,
          {
            labels: labels,
            borderSkipped: "bottom",
            datasets: [
              {
                fill: true,
                label: labels,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                data: data
              }
            ]
          }
        );
        this.ssdoptions[i].chartOptions = Object.assign(
          {},
          this.ssdoptions[i].chartOptions,
          {
            title: {
              text: this.sensorList[i].title,
              display: true,
              position: "top"
            },
            legend: {
              display: false
            },
            rotation: -0.7 * Math.PI
          }
        );
      }
    }
  },
  created() {
    this.setpiedata();
  },
  data() {
    return {
      // 固定按照功能分配API
      ssdoptions: [],
      sensorList: [
        {
          title: "Total Command Read/Write",
          List: ["Write", "Read"]
        },
        {
          title: "Total Sequential & Random Read/Write",
          List: [
            "ReadLength 2K",
            "ReadLength 4K",
            "ReadLength 8K",
            "ReadLength 16K",
            "ReadLength 32K",
            "ReadLength 64K",
            "ReadLength 128K",
            "ReadLength Other"
          ]
        },
        {
          title: "Length of Read",
          List: [
            "ReadLength 2K",
            "ReadLength 4K",
            "ReadLength 8K",
            "ReadLength 16K",
            "ReadLength 32K",
            "ReadLength 64K",
            "ReadLength 128K",
            "ReadLength Other"
          ]
        },
        {
          title: "Total Sector Read/Write",
          List: ["Write", "Read"]
        },
        {
          title: "4K Alignment",
          List: [
            "WriteLength 2K",
            "WriteLength 4K",
            "WriteLength 8K",
            "WriteLength 16K",
            "WriteLength 32K",
            "WriteLength 64K",
            "WriteLength 128K",
            "WriteLength Other"
          ]
        },
        {
          title: "Length of Write",
          List: [
            "WriteLength 2K",
            "WriteLength 4K",
            "WriteLength 8K",
            "WriteLength 16K",
            "WriteLength 32K",
            "WriteLength 64K",
            "WriteLength 128K",
            "WriteLength Other"
          ]
        }
      ]
    };
  }
};
</script>
