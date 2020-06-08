<template>
  <div>
    <b-row class="mb-1" v-for="(rowdata,index) in Loadsort" :key="index">
      <b-col md="12">
        <h6 class="set-title">{{ rowdata.DeviceName }}:</h6>
        <div class="myProgress">
          <template v-if="index==0">
            <div class="mybar" :style="settingbar(rowdata.Status,rowdata[btype])">{{rowdata[btype]}}</div>
          </template>
          <template v-else>
            <div
              class="mybar-right"
              :style="settingbar(rowdata.Status,rowdata[btype])"
            >{{rowdata[btype]}}</div>
          </template>
        </div>
      </b-col>
      <hr class="mb-1 mt-1" size="1" width="80%" color="#ffffff" />
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    btype: {
      type: String,
      default: null
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
    // J-NOTE 注意最大值
    settingbar: function(Status, value) {
      return {
        background: this.statucolor(Status),
        width: String((value / 1000) * 100) + "%"
      };
    },
    picktype(type) {
      let api = "";
      switch (type) {
        case "Read":
          api = "readClick";
          break;
        case "Write":
          api = "writeClick";
          break;
      }
      return api;
    }
  },
  computed: {
    Loadsort: function() {
      let type = this.btype;
      return this.items.slice().sort((a, b) => b[type] - a[type]);
    }
  },
  data() {
    return {};
  }
};
</script>
