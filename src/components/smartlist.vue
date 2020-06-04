<template>
  <div>
    <b-row>
      <b-col>
        <h5>S.M.A.R.T</h5>
        <hr size="1" width="100%" color="#ffffff" />
      </b-col>
    </b-row>
    <b-row>
      <b-table id="ssd-tb" responsive dark hover :fields="fields" :items="smartlist"></b-table>
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
    return {
      smartlist: [
        { id: 9, attributeName: "Power on Hours", rawData: 269 },
        { id: 12, attributeName: "Power Cycle Count", rawData: 104 },
        { id: 163, attributeName: "Maximum Erase Count", rawData: 1 },
        { id: 164, attributeName: "Average Erase Count", rawData: 1 },
        { id: 166, attributeName: "Total Later BadBlock Count", rawData: 0 },
        { id: 167, attributeName: "SSD Protect Mode", rawData: 269 }
      ],
      fields: [
        {
          label: "ID",
          key: "id",
          sortable: false
        },
        {
          label: "Attribute Name",
          key: "attributeName",
          sortable: false
        },
        {
          label: "Raw Data",
          key: "rawData",
          sortable: false
        }
      ]
    };
  }
};
</script>
