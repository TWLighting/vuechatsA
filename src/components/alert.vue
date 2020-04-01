<template>
  <div class="alertbox">
    <b-row class="b-flex ">
      <div class="more-content">
        <b-row class="justify-content-center">
          <b-col xl="8" md="12" sm="12">
            <slot></slot>
          </b-col>
        </b-row>

        <b-icon
          @click="closeAlert"
          class="setright icon"
          icon="x-circle-fill"
          font-scale="2.2"
        ></b-icon>
      </div>
    </b-row>
  </div>
</template>
<script>
export default {
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
