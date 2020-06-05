<!--J-NOTE 使用echart的gauge-->
<template>
  <div id="temp" class="tabs">
    <b-row>
      <b-col>
        <h5>{{ this.title }}</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row sm="12" md="12">
      <b-col sm="2" md="2">
        <b-row>
          <b-col class="offset-md-3 offset-sm-3">
            <ul
              v-for="(rank,index) in temperatureRange"
              class="nav nav-pills nav-stacked flex-column"
              :key="index"
            >
              <template v-if="rank.TestNumber==0">
                <li :style="{backgroundColor:rank.backgroundColor}">
                  {{rank.sum}}
                  <div class="temprange">
                    <span>{{rank.temp}}</span>
                  </div>
                </li>
              </template>
              <template v-else>
                <a @click="showTempList(rank.TestNumber,rank.title)" disabled>
                  <li :style="{backgroundColor:rank.backgroundColor}">
                    {{rank.sum}}
                    <div class="temprange">
                      <span>{{rank.temp}}</span>
                    </div>
                  </li>
                </a>
              </template>
            </ul>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="scrollbarshow">
        <div class="tab-content">
          <div class="tab-pane active">
            <h5>{{this.tempRangeList.title}}</h5>
            <b-table-simple hover small caption-top responsive>
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>SSDName</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(item,index) in tempRangeList.lists" :key="index">
                  <b-td
                    class="point"
                    @click="showLineChart(tempRangeList.title,item)"
                  >{{item.SSDName}}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
    TemperaturRange: {
      type: Object,
      default: null
    },
    controltri: {
      type: Boolean
    }
  },
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
    toColor(Status) {
      this.$emit("chiesecolor", Status);
    },
    changeTriangle() {
      this.triangleTop = !this.triangleTop;
      this.triangleBottom = !this.triangleBottom;
      this.$emit("changeTriangle", !this.controltri);
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; // 含最大值，含最小值
    },
    settingTemp() {
      for (let st = 0; st <= this.temperatureRange.length; st++) {
        this.$set(
          this.temperatureRange[st],
          "sum",
          this.getRandomIntInclusive(1, 500)
        );
      }
    },
    showTempList(TestNumber, title) {
      let count = 0;
      let list = [];
      while (TestNumber > count) {
        list.push({ SSDName: "DESKTOP-ggfgfgf-DISK2" });
        count++;
      }
      this.$set(this.tempRangeList, "lists", list);
      this.$set(this.tempRangeList, "title", title);
    },
    showLineChart(title, list) {
      // 傳送API資料回父元件
      this.$emit("changeTempRow", { title: title, lists: list });
    }
  },
  created() {
    this.showTempList(50, "80 above");
    this.settingTemp();
  },
  computed: {},
  data() {
    return {
      triangleTop: true,
      triangleBottom: false,
      temperatureRange: [
        {
          temp: "80°C",
          backgroundColor: "#ff0000",
          TestNumber: 50,
          title: "80 above",
          sum: 0
        },
        {
          temp: "70°C",
          backgroundColor: "#ffc000",
          TestNumber: 20,
          title: "70°C~80°C of SSDs",
          sum: 0
        },
        {
          temp: "60°C",
          backgroundColor: "#ffff00",
          TestNumber: 5,
          title: "60°C~70°C of SSDs",
          sum: 0
        },
        {
          temp: "0°C",
          backgroundColor: "#a6a6a6",
          TestNumber: 0,
          title: "0°C~60°C of SSDs",
          sum: 0
        },
        {
          temp: "-25°C",
          backgroundColor: "#ffc000",
          TestNumber: 4,
          title: "-25°C~0°C of SSDs",
          sum: 0
        },
        {
          temp: "-40°C",
          backgroundColor: "#ff0000",
          TestNumber: 9,
          title: "-40°C~-25°C of SSDs",
          sum: 0
        }
      ],
      tempRangeList: {
        title: "80 above",
        lists: []
      }
    };
  }
};
</script>
