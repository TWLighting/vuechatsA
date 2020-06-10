<template>
  <div class="alertbox">
    <b-row class="b-flex">
      <div class="more-content" :style="{width:alertWidth}">
        <b-row class="justify-content-center">
          <template v-if="alertWidth=='55%'">
            <b-col xl="9" md="12" sm="12">
              <slot></slot>
            </b-col>
          </template>
          <template v-else>
            <b-col xl="12" md="12" sm="12">
              <slot></slot>
            </b-col>
          </template>
        </b-row>
        <b-icon @click="closeAlert" class="setright icon" icon="x-circle-fill" font-scale="2.2"></b-icon>
      </div>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    alertWidth: {
      type: String,
      default: "55%"
    }
  },
  methods: {
    closeAlert: function() {
      this.$emit("close-alert");
    }
  },
  data() {
    return {};
  }
};
</script>
