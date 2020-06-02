<template>
  <div>
    <b-row>
      <b-col>
        <h5>Status</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row cols="3">
      <b-col></b-col>
    </b-row>
  </div>
</template>
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
