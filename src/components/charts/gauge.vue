<template>
  <div>
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
  </div>
</template>
<script src="/static/addins/SampleAddin/libs/vue-svg-gauge.min.js"></script>
<script>
import { VueSvgGauge } from "vue-svg-gauge";
export default {
  props: {
    props: {
      type: Object,
      default: null
    }
  },
  components: { VueSvgGauge },
  methods: {},
  mounted() {},
  data() {
    return { gaugevalue: 70, innerValue: "Online/Total SSD" };
  }
};
</script>
