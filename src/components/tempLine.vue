<template>
  <div>
    <b-row>
      <b-col>
        <h5>{{this.TempRowList.title}}</h5>
        <h6>{{ this.TempRowList.lists.SSDName}}</h6>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="2" md="2">
        <b-form-group label="Select date" label-for="choesedate">
          <b-form-select
            id="choesedate"
            v-model="dateform.value"
            :options="dateform.options"
            text-field="name"
            @change="pickdateperiod"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="2" md="2" v-if="dateform.value==1 && dayform!=null">
        <b-form-group label="Select date" label-for="choesedate">
          <b-form-select
            id="choesedate"
            v-model="dayform.value"
            :options="dayform.options"
            text-field="name"
            @change="pickday"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col>
        <Linechart :chartData="chartData" :options="chartOptions"></Linechart>
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
    setWeekvalue(days) {
      let weekvalues = [];
      for (let st = days; st >= 1; st--) {
        weekvalues.push(this.getRandomIntInclusive(-45, 100));
      }
      return weekvalues;
    },
    setWeekdate(days, times, startday) {
      let week = [];
      for (let st = days; st >= 1; st--) {
        week.push(startday.subtract(st, times).format("MM-DD HH"));
      }
      return week;
    },
    pickday() {
      let pickday = this.dayform.options.filter(
        x => x.value == this.dayform.value
      );
      let year = dayjs()
        .startOf("year")
        .format("YYYY");
      let day = dayjs(year + "-" + pickday[0].name)
        .add(1, "day")
        .startOf("day");
      this.setlinedata(24, "hour", day);
    },
    setdayoption() {
      let period = 7;
      let option = [];
      let day = dayjs(new Date());
      option.push({ value: null, name: "請選擇" });
      for (let st = 1; st <= period; st++) {
        option.push({
          value: st,
          name: day.subtract(st, "day").format("MM-DD")
        });
      }

      this.dayform = Object.assign({}, this.dayform, {
        value: null,
        options: option
      });
    },
    setlinedata(period, time, startday) {
      let setdatasets = [];
      let labels = [];
      let rowdata = {};
      let linedata = [];
      labels = this.setWeekdate(period, time, startday);
      linedata = this.setWeekvalue(period);

      // console.log(this.TempRowList);
      // 設定每個線段樣式
      rowdata.label = "Temperature";
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
          display: false
        },
        title: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(0,0,0,0.5)",
                fontStyle: "bold",
                maxTicksLimit: 5,
                padding: 5
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
    },
    pickdateperiod() {
      if (this.dateform.value === 1) {
        this.setdayoption();
      } else {
        this.setlinedata(168, "hour", dayjs(new Date()));
      }
    }
  },
  created() {
    this.setlinedata(168, "hour", dayjs(new Date()));
  },
  data() {
    return {
      Templinedata: [],
      chartData: null,
      chartOptions: null,
      dayform: null,
      dateform: {
        value: 0,
        options: [
          { value: 0, name: "week" },
          { value: 1, name: "days" }
        ]
      }
    };
  }
};
</script>
