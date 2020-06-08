<template>
  <div>
    <b-row>
      <b-col>
        <h5>SSD INFO.</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <h5>Total Capacity:55.90GB</h5>
    </b-row>
    <b-row class="mb-4">
      <h5>Capacity Usage:Used: 55.37GB / Free: 19.16GB</h5>
    </b-row>
    <b-row class="mb-4">
      <h5>Temperature:40°C/104°F</h5>
    </b-row>
    <b-row class="mb-4">
      <h5>Write Workload:</h5>
    </b-row>
    <b-row cols="4">
      <b-col class="border-right border-secondary">
        <h5>Today</h5>
        <h5>7GB</h5>
      </b-col>
      <b-col class="border-right border-secondary">
        <h5>Daily</h5>
        <h5>7GB</h5>
      </b-col>
      <b-col class="border-right border-secondary">
        <h5>Weekly</h5>
        <h5>49GB</h5>
      </b-col>
      <b-col>
        <h5>Total</h5>
        <h5>49GB</h5>
      </b-col>
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
    }
  },
  data() {
    return {};
  }
};
</script>
