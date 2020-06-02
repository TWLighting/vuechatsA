<!--J-NOTE 使用echart的gauge-->
<template>
  <div id="temp" class="tabs">
    <div class="container">
      <div class="row">
        <div class="col-xl-2">
          <ul class="nav nav-pills nav-stacked flex-column">
            <li class="active">
              <a href="#tab_a" data-toggle="pill">TAB 1</a>
            </li>
            <li>
              <a href="#tab_b" data-toggle="pill">TAB 2</a>
            </li>
            <li>
              <a href="#tab_c" data-toggle="pill">TAB 3</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array,
      default: null
    },
    TemperaturRange: {
      type: Object,
      default: null
    },
    controltri: {
      type: Boolean
    }
  },
  components: "",
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
    },
    changeTriangle() {
      this.triangleTop = !this.triangleTop;
      this.triangleBottom = !this.triangleBottom;
      this.$emit("changeTriangle", !this.controltri);
    }
  },
  computed: {},
  data() {
    return {
      triangleTop: true,
      triangleBottom: false
    };
  }
};
</script>
