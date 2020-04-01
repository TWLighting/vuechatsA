<!--J-NOTE 使用vue-svg-gauge的gauge-->
<template>
  <div>
    <b-row class="d-flex">
      <b-col sm="12" md="12">
        <div>
          <slot name="header"></slot>
        </div>
      </b-col>
      <template v-if="items.length">
        <b-col sm="1" md="1"></b-col>
        <b-col sm="2" md="2" v-for="item in Temperature" :key="item.id">
          <vue-svg-gauge
            :start-angle="-130"
            :end-angle="130"
            :value="fixtemp(item.Temp)"
            :separator-step="0"
            :min="0"
            :max="140"
            :gauge-color="[
              { offset: 0, color: '#F24444' },
              { offset: 28, color: '#F24444' },
              { offset: 28, color: '#00B2A9' },
              { offset: 80, color: '#00B2A9' },
              { offset: 80, color: '#F24444' },
              { offset: 100, color: '#F24444' }
            ]"
            :scale-interval="10"
            :inner-radius="70"
          />
          <div class="inner-text">
            <p>{{ item.Temp }}°C</p>
          </div>
          <div class="inner-text">
            <span>{{ item.DeviceName }}:{{ item.Temp }}°C</span>
          </div>
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script>
import { VueSvgGauge } from "vue-svg-gauge";
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    TemperaturRange: {
      type: Object,
      default: null
    }
  },
  components: { VueSvgGauge },
  methods: {
    fixtemp(temp) {
      return temp + 40;
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
    toColor(Status) {
      this.$emit("chiesecolor", Status);
    }
  },
  computed: {
    Temperature: function() {
      return this.items.slice().sort((a, b) => b.Temp - a.Temp);
    }
  },
  data() {
    return {};
  }
};
</script>
