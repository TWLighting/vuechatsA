<!--J-NOTE 使用echart的gauge-->
<template>
  <div>
    <b-row cols-sm="2" cols-md="5" class="d-flex">
      <b-col sm="12" md="12">
        <div>
          <h5>{{ this.title }}</h5>
          <hr size="1" width="100%" color="#ffffff" />
        </div>
      </b-col>
      <template v-if="items.length">
        <b-col v-for="item in Temperature" :key="item.id">
          <egauge
            :style="{ width: '250px', height: '300px' }"
            :tempvalue="item.Temp"
            :name="item.DeviceName"
          ></egauge>
        </b-col>
      </template>
    </b-row>
  </div>
</template>
<script>
import egauge from "./charts/egauge";

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
  components: { egauge },
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
  computed: {
    Temperature: function() {
      return this.items.slice().sort((a, b) => b.Temp - a.Temp);
    }
  },
  data() {
    return {
      triangleTop: true,
      triangleBottom: false
    };
  }
};
</script>
