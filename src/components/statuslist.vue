<template>
  <div>
    <b-row>
      <b-col>
        <h5>List of {{this.clickStatusList.status}} SSD</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th class="text-left">SSDName</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item,index) in ShowList" :key="index">
            <b-td class="text-left">{{item.SSDName}}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-row>
  </div>
</template>
<script>
export default {
  methods: {
    getList() {
      let count = 0;
      let list = [];
      while (this.clickStatusList.value > count) {
        list.push({ SSDName: "DESKTOP-TRETT-DISK2" });
        count++;
      }
      this.$set(this, "ShowList", list);
    }
  },
  props: {
    items: {
      type: Array,
      default: null
    },
    clickStatusList: {
      type: Object,
      default: null
    }
  },
  created() {
    this.getList();
  },
  data() {
    return {
      ShowList: []
    };
  }
};
</script>
