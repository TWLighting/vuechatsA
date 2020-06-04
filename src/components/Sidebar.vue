<template>
  <b-row class="ssdsidebar"></b-row>
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
