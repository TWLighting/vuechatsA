<template>
  <b-row class="ssdsidebar">
    <b-col>Level 2: cols="8" sm="6"</b-col>
    <b-col>Level 2: cols="4" sm="6"</b-col>
  </b-row>
</template>
<script>
export default {
  props: {
    testp: {
      type: Boolean,
      default: null
    }
  },
  watch: {
    testp: function(data) {
      console.log(data);
    }
  },
  data() {
    return {};
  }
};
</script>
