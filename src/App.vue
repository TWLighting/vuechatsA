<template>
  <div id="app">
    <b-navbar v-bind:style="{ marginBottom: '10px' }" type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item right>
          <b-icon icon="bell" font-scale="2"></b-icon>
        </b-nav-item>
        <b-nav-item right>
          <b-icon icon="wifi" font-scale="2"></b-icon>
        </b-nav-item>
        <b-nav-item right>
          <b-icon icon="person" font-scale="2"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col sm="2" md="2">
          <Sidebar :testp="testproparr"></Sidebar>
        </b-col>
        <b-col sm="10" md="10">
          <!-- first floor -->
          <b-row cols="2">
            <b-col class="ssdcube">
              <Chartcube :title="titlegroup[0]" :items="items" v-if="items.length>0"></Chartcube>
            </b-col>
            <b-col class="ssdcube">
              <a class="point" @click="changeLine">
                <Chartcube :title="titlegroup[3]" :items="items"></Chartcube>
              </a>
            </b-col>
          </b-row>
          <!-- secord floor -->
          <b-row>
            <b-col class="temperaturelist justify-content-center">
              <!--J-NOTE 是否要使用切換功能-->
              <!-- <Temperaturegauge
                :items="items"
                :TemperaturRange="TemperaturRange"
                @chiesecolor="statucolor"
              >
                <template v-slot:header>
                  <div>
                    <h5>{{ titlegroup[5] }}</h5>
                    <hr size="1" width="100%" color="#ffffff" />
                  </div>
                </template>
              </Temperaturegauge>-->
              <!--J-NOTE echarts-->
              <!-- <title-row
                :title="titlegroup[5]"
                :showtri="true"
                v-model="istriforTemp"
                @changeTriangle="controlTriangle"
              ></title-row>
              <component
                :is="Tempercontrol"
                :title="titlegroup[5]"
                :items="items"
                :TemperaturRange="TemperaturRange"
                @chiesecolor="statucolor"
              ></component>-->
              <a class="point" @click="changeLine">
                <Temperaturegauge2
                  :title="titlegroup[5]"
                  :items="items"
                  :controltri="istriforTemp"
                  :TemperaturRange="TemperaturRange"
                  @chiesecolor="statucolor"
                  @changeTriangle="controlTriangle"
                ></Temperaturegauge2>
              </a>
            </b-col>
          </b-row>
          <!-- third floor -->
          <b-row cols="3">
            <b-col class="ssdcube">
              <a class="point" @click="changePieRead">
                <Ssdprogress :title="titlegroup[1]" :items="items" :btype="'Read'">
                  <b-col>
                    <h5>Read(MB/s)</h5>
                  </b-col>
                </Ssdprogress>
              </a>
            </b-col>
            <b-col class="ssdcube">
              <Ssdprogressclick :title="titlegroup[2]" :items="items" @bepiedata="settingclickpie">
                <b-col>
                  <h5>Write(MB/s)</h5>
                </b-col>
              </Ssdprogressclick>
            </b-col>
            <b-col class="ssdcube">
              <Totalgauge :title="titlegroup[4]" :items="items"></Totalgauge>
            </b-col>
          </b-row>
          <!-- table floor -->
          <b-row>
            <b-col class="detailtable">
              <b-form :style="{ color: '#00b2a9' }">
                <b-row>
                  <b-col sm="2" md="2">
                    <b-form-group label="Select Groups" label-for="acountList">
                      <b-form-select
                        id="Select"
                        v-model="tableFrom.groups.value"
                        :options="tableFrom.groups.groupsOptions"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="2" md="2">
                    <b-form-group label="Select Status" label-for="Status">
                      <b-form-select
                        id="Status"
                        v-model="tableFrom.status.value"
                        :options="tableFrom.status.statusOptions"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                  <b-col sm="2" md="2">
                    <b-form-group label="Keyword Search" label-for="Keyword">
                      <b-form-input
                        id="Keyword"
                        v-model="tableFrom.keyword.value"
                        placeholder="ALL"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form>
              <!--J-NOTE 在t-head中的其中一個欄位加入2個列下面的塞2欄 完成-->
              <b-table
                id="ssd-tb"
                responsive
                striped
                hover
                :fields="fields"
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                class="ssdtable"
              >
                <template v-slot:thead-top="data">
                  <b-tr rowspan="2">
                    <b-th class="ssdseeting" colspan="6"></b-th>
                    <b-th class="ssdseeting" colspan="2">Weekly Workload(GB)</b-th>
                    <b-th class="ssdseeting" colspan="4"></b-th>
                  </b-tr>
                </template>

                <template v-slot:cell(Status)="data">
                  <b-row class="text-center" style="font-size: 24px;">
                    <b-col class="py-2 mb-1">
                      <!--J-DONE：處理圓點燈號顏色-->
                      <b-icon icon="circle-fill" :style="{ color: statucolor(data.value) }"></b-icon>
                    </b-col>
                  </b-row>
                </template>
                <!--J-TODO 表單小工具按鈕Coreanalyzer-->
                <template v-slot:cell(Coreanalyzer)="data">
                  <b-row class="text-center" style="font-size: 24px;">
                    <b-col class="py-2 mb-1">
                      <a class="point" @click="changeCoreanalyzer">
                        <b-icon icon="alert-circle" class="Coreanalyzericon"></b-icon>
                      </a>
                    </b-col>
                  </b-row>
                </template>
                <!--J-TODO 表單小工具按鈕Upgrade-->
                <template v-slot:cell(Upgrade)="data">
                  <b-row class="text-center" style="font-size: 24px;">
                    <b-col class="py-2 mb-1">
                      <a class="point" @click="changePieRead">
                        <b-icon icon="alert-circle" class="Recoveryicon"></b-icon>
                      </a>
                    </b-col>
                  </b-row>
                </template>
                <!--J-TODO 表單小工具按鈕Recovery-->
                <template v-slot:cell(Recovery)="data">
                  <b-row class="text-center" style="font-size:24px;">
                    <b-col class="py-2 mb-1">
                      <a class="point" @click="changePieRead">
                        <b-icon icon="arrow-repeat" class="Recoveryicon"></b-icon>
                      </a>
                    </b-col>
                  </b-row>
                </template>
              </b-table>
              <!--J-NOTE 完成基本分頁功能 看是否要自訂頁數功能-->
              <b-pagination
                pills
                size="sm"
                align="center"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="ssd-tb"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!--J-NOTE 彈出組件的內容要依照點進去的內容顯示資料 完成-->
    <!--alertcompount-->
    <!-- <component :is="alertcompount" v-if="alertwindow.isBar" v-on:close-alert="changealert">
      <Chartcube :title="titlegroup[0]" :items="items" :height="'500px'" :ifAlert="true"></Chartcube>
    </component>-->
    <!--Linecompount-->
    <component :is="alertcompount" v-if="alertwindow.isLine" v-on:close-alert="changeLine">
      <Linecube :title="titlegroup[3]" :items="items"></Linecube>
    </component>
    <!--TempLinecompount-->
    <component :is="alertcompount" v-if="alertwindow.isTempLine" v-on:close-alert="changeTempLine">
      <TempLine :title="titlegroup[5]" :items="items" @chiesecolor="statucolor"></TempLine>
    </component>

    <component :is="alertcompount" v-if="alertwindow.isLine" v-on:close-alert="changeLine">
      <Linecube :title="titlegroup[3]" :items="items"></Linecube>
    </component>
    <!--J-TODO Read圓餅圖6種分析-->
    <component :is="alertcompount" v-if="alertwindow.isPieRead" v-on:close-alert="changePieRead">
      <!-- <Piecube :title="titlegroup[1]" :items="items" :pietype="'Read'"></Piecube>-->
      <Piegroupread :title="titlegroup[1]" :items="items" :pietype="'Read'"></Piegroupread>
    </component>
    <!--piecompount-->
    <!--J-NOTE Write圓餅圖未完成-->
    <component :is="alertcompount" v-if="alertwindow.isPieWrite" v-on:close-alert="changePieWrite">
      <!-- <Piecube :title="titlegroup[2]" :items="items" :pietype="'Write'"></Piecube>-->
      <Onepiecube :title="titlegroup[2]" :piedata="piedata"></Onepiecube>
    </component>
    <!--widgetCoreanalyzer-->
    <component
      :is="alertcompount"
      v-if="alertwindow.isCoreanalyzer"
      v-on:close-alert="changeCoreanalyzer"
    >
      <widgetCoreanalyzer :title="titlegroup[2]" :items="items" :pietype="'Write'"></widgetCoreanalyzer>
    </component>
  </div>
</template>
<script src="https://lib.baomitu.com/dayjs/1.8.13/dayjs.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-svg-gauge@1.2.1/dist/vue-svg-gauge.min.js"></script>
<script>
import Sidebar from "./components/Sidebar";
import Chartcube from "./components/chartcube";
import Gauge from "./components/charts/gauge";
import Temperaturegauge from "./components/temperaturegauge";
import Temperaturegauge2 from "./components/temperaturegauge2";
import TempLine from "./components/tempLine";
import Testalert from "./components/alert";
import Linecube from "./components/linecube";
import Piecube from "./components/piecube";
import Onepiecube from "./components/onepiecube";
import Ssdprogress from "./components/ssdprogress";
import Ssdprogressclick from "./components/ssdprogressclick";
import Totalgauge from "./components/charts/totalgauge";
import Piegroupread from "./components/piegroupread";
import Piechart from "./components/charts/peichart";

const Testvuegauge = {
  props: {
    props: {
      type: Object,
      default: null
    }
  },
  template: `<div>
    <div>
      <slot name="header"></slot>
    </div>
    <b-row class="justify-content-center">
      <b-col md="6">
        <vue-svg-gauge
          :start-angle="-130"
          :end-angle="130"
          :value="gaugevalue"
          :separator-step="0"
          :min="0"
          :max="100"
          gauge-color="#00B2A9"
          :scale-interval="10"
          :inner-radius="70"
        />
        <slot></slot>
      </b-col>
    </b-row>
  </div>`,
  methods: {},
  mounted() {},
  data() {
    return { gaugevalue: 70 };
  }
};
const widgetCoreanalyzer = {
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
          ㄋ;
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
  template: `<div>
    <b-row class="d-flex">
      <div class="piereadgroup" v-for="(option,index) in ssdoptions" :key="index">
        <!--
       <h5>{{option.name}}</h5>
        <hr size="1" width="100%" color="#ffffff" />
        -->
        <Piechart :chartData="option.chartData" :options="option.chartOptions"></Piechart>
      </div>
    </b-row>
  </div>`,
  data() {
    return {
      // 固定按照功能分配API
      ssdoptions: [
        { name: "Coreanalyzer1", chartData: null, chartOptions: null },
        { name: "Coreanalyzer2", chartData: null, chartOptions: null },
        { name: "Coreanalyzer3", chartData: null, chartOptions: null },
        { name: "Coreanalyzer4", chartData: null, chartOptions: null },
        { name: "Coreanalyzer5", chartData: null, chartOptions: null },
        { name: "Coreanalyzer6", chartData: null, chartOptions: null }
      ]
    };
  }
};
const widgetRecovery = {};
const widgetUpgrade = {};
export default {
  components: {
    Sidebar,
    Chartcube,
    Gauge,
    Temperaturegauge,
    Temperaturegauge2,
    TempLine,
    Linecube,
    Piecube,
    Ssdprogress,
    Totalgauge,
    Testvuegauge,
    Piegroupread,
    widgetCoreanalyzer,
    Onepiecube,
    Ssdprogressclick
  },
  beforeMount() {},
  mounted() {
    this.testpush();
  },
  methods: {
    setItem() {
      this.$set(this, "items", [
        {
          statusLight: 2,
          Status: 23,
          DeviceName: "DESKTOP-NIFFRRK-DISK1",
          Capacity: "30GB",
          Usage: "10%",
          Temp: 100,
          UnexpectedPowerCycleCount: 98,
          WeeklyWorkload: 520,
          GroupName: "HQ",
          Coreanalyzer: null,
          Upgrade: null,
          Recovery: null,
          Read: 520,
          Write: 236
        },
        {
          statusLight: 1,
          Status: 60,
          DeviceName: "DESKTOP-NIFFRRK-DISK2",
          Capacity: "30GB",
          Usage: "60%",
          Temp: 80,
          UnexpectedPowerCycleCount: 98,
          WeeklyWorkload: 520,
          GroupName: "HQ",
          Coreanalyzer: null,
          Upgrade: null,
          Recovery: null,
          Read: 200,
          Write: 800
        },
        {
          statusLight: 1,
          Status: 85,
          DeviceName: "DESKTOP-FVGFV-DISK2",
          Capacity: "30GB",
          Usage: "85%",
          Temp: 30,
          UnexpectedPowerCycleCount: 98,
          WeeklyWorkload: 520,
          GroupName: "HQ",
          Coreanalyzer: null,
          Upgrade: null,
          Recovery: null,
          Read: 300,
          Write: 400
        },
        {
          statusLight: 0,
          Status: 60,
          DeviceName: "DESKTOP-FVGFV-DISK1",
          Capacity: "30GB",
          Usage: "60%",
          Temp: -30,
          UnexpectedPowerCycleCount: 98,
          WeeklyWorkload: 520,
          GroupName: "HQ",
          Coreanalyzer: null,
          Upgrade: null,
          Recovery: null,
          Read: 520,
          Write: 130
        },
        {
          statusLight: 2,
          Status: 20,
          DeviceName: "DESKTOP-ggfgfgf-DISK2",
          Capacity: "30GB",
          Usage: "20%",
          Temp: 20,
          UnexpectedPowerCycleCount: 98,
          WeeklyWorkload: 520,
          GroupName: "HQ",
          Coreanalyzer: null,
          Upgrade: null,
          Recovery: 10,
          Read: 400,
          Write: 200
        }
      ]);
    },
    changeLine() {
      this.alertwindow.isLine = !this.alertwindow.isLine;
    },
    changeTempLine() {
      this.isTempLine = !this.isTempLine;
    },
    changePieRead() {
      this.alertwindow.isPieRead = !this.alertwindow.isPieRead;
    },
    changePieWrite() {
      this.alertwindow.isPieWrite = !this.alertwindow.isPieWrite;
    },
    changeCoreanalyzer() {
      this.alertwindow.isCoreanalyzer = !this.alertwindow.isCoreanalyzer;
    },
    changeUpgrade() {
      this.alertwindow.isUpgrade = !this.alertwindow.isUpgrade;
    },
    changeRecovery() {
      this.alertwindow.isRecovery = !this.alertwindow.isRecovery;
    },
    settingpiedata(data) {
      let setting = { a: "ddd", b: "cccc" };
      this.$set(this, "piedata", data);
    },
    settingclickpie(data) {
      this.settingpiedata(data);
      this.changePieWrite();
    },
    //J-NOTE 可能要放進混入MIXIN之中
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
    controlTriangle(control) {
      console.log(control);
      this.istriforTemp = control;
    },
    testpromise(getval) {
      return new Promise(function(reslove, reject) {
        if (getval == 1) {
          return reslove("scuess");
        } else {
          return reject();
        }
      });
    },
    //J-TESTpromise迴圈測試結果
    //在then的趁列會重複
    testscope() {
      var testarr = [];

      for (let k = 0; k <= 1; k++) {
        this.testpromise(1).then(reslove => {
          for (let i = 0; i < 5; i++) {
            this.scopearr.push(i);
            console.log(this.scopearr);
          }
          this.$set(this, "scopearr", testarr);
        });
      }
      for (let item of this.scopearr) {
        console.log(item);
      }
      // console.table(vm.scopearr);
    },
    //J-TEST測試this.$set與push差異 搭配使用效果
    testpush() {
      let namearr = ["TEMP", "ssd", "gree"];
      for (let name of namearr) {
        this.$set(this.testitems, name, []);
        this.testitems[name].push({ a: "11", b: "12" });
      }
      // this.$set(this.testitems[name], 0, { a: "11", b: "12" });
      // this.testpush[name].push({a:'11',b:'12'})
      console.log(this.testitems);
    },
    //測試子元件watch能否
    testprops() {
      this.$set(this, "testproparr", !this.testproparr);
    }
  },
  created() {
    self = this;
    // setInterval(function() {
    //   self.testprops();
    // }, 2000);
    this.testscope();
    this.setItem();
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  data() {
    return {
      piedata: {},
      testproparr: false,
      scopearr: [],
      perPage: 5,
      currentPage: 1,
      Linecompount: Linecube,
      alertcompount: Testalert,
      Piecompount: Piecube,
      Tempercontrol: TempLine,
      istriforTemp: true,
      alertwindow: {
        isBar: false,
        isLine: false,
        isPieRead: false,
        isPieWrite: false,
        isTempLine: false,
        isCoreanalyzer: false,
        isUpgrade: false,
        isRecovery: false
      },
      titlegroup: [
        "5 Riskiest SSDs",
        "5 SSDs With Heavy Read Workloads",
        "5 SSDs With Heavy Write Workloads",
        "5 SSDs With Unexpected Power",
        "Online/Total SSDs",
        "5 SSDs With Temperature Abnormalities"
      ],
      tableFrom: {
        acount: {
          value: null,
          acountOptions: [
            { value: null, text: "ALL" },
            { value: "jim", text: "JIM" },
            { value: "grace", text: "GRACE" },
            { value: "tom", text: "TOM" }
          ]
        },
        groups: {
          value: null,
          groupsOptions: [
            { value: null, text: "ALL" },
            { value: "1", text: "第一組" },
            { value: "2", text: "第二組" },
            { value: "3", text: "第三組" }
          ]
        },
        status: {
          value: null,
          statusOptions: [
            { value: null, text: "ALL" },
            { value: "1", text: "正常" },
            { value: "2", text: "故障" }
          ]
        },
        keyword: {
          value: null
        }
      },
      fields: [
        {
          labels: "Status",
          key: "Status",
          sortable: true,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Device Name",
          key: "DeviceName",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseetingDeviceName", "ssdtd"]
        },
        {
          labels: "Capacity",
          key: "Capacity",
          sortable: true,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Usage",
          key: "Usage",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Temp.",
          key: "Temp",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Unexpected Power Cycle Count",
          key: "UnexpectedPowerCycleCount",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        // {
        //   labels: "Weekly Workload (GB)",
        //   key: "UnexpectedPowerCycleCount",
        //   sortable: false,
        //   thClass: ["ssdseeting"],
        //   tdClass: ["ssdseeting", "ssdtd"]
        // },
        {
          labels: "Read",
          key: "Read",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Write",
          key: "Write",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Group Name",
          key: "GroupName",
          sortable: true,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "Coreanalyzer",
          key: "Coreanalyzer",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "F/W Upgrade",
          key: "Upgrade",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        },
        {
          labels: "OS Recovery",
          key: "Recovery",
          sortable: false,
          thClass: ["ssdseeting"],
          tdClass: ["ssdseeting", "ssdtd"]
        }
      ],
      TemperaturRange: {
        MAX: 100,
        MIN: -45
      },
      items: [],
      testitems: []
    };
  }
};
/*J-MEMO 待完成事項
1.取得 前5顆SSD 一周不正常斷電次數API
2.取得 前最高溫度5顆SSD 一周溫度變化API
3.取得 前5顆SSD workload 讀跟寫的餅圖資料API
4.取得 表格得到SSD資料API 與小工具連動
*/
</script>

<style lang="scss">
@import "./assets/sass/app.scss";
</style>
