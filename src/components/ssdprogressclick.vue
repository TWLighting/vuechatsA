<template>
  <div>
    <h5>{{ this.title }}</h5>
    <hr size="1" width="100%" color="#ffffff" />
    <b-row class="justify-content-between">
      <slot></slot>
    </b-row>
    <b-row class="mb-1" v-for="rowdata in Loadsort" :key="rowdata.id">
      <b-col md="4">{{ rowdata.DeviceName }}:</b-col>
      <b-col md="8">
        <!--J-DONE  更換長條圖背景顏色-->
        <div class="myProgress">
          <div class="mybar" :style="settingbar(rowdata.Status,rowdata[btype])">{{rowdata[btype]}}</div>
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
    title: {
      type: String,
      default: null
    },
    btype: {
      type: String,
      default: null
    }
  },

  methods: {
    getpiedata(data) {
      this.$emit("bepiedata", data);
    },
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
