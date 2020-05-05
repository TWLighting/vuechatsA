<template>
  <nav class="d-flex justify-content-center">
    <ul class="pagination nostyle">
      <li class="pagination-btn first-btn"></li>
      <li class="pagination-btn previous-btn"></li>
      <li v-for="index of total">
        <span>{{index}}</span>
      </li>
      <li class="pagination-btn next-btn"></li>
      <li class="pagination-btn last-btn"></li>
    </ul>
  </nav>
</template>
<script>
export default {
  model: {
    prop: "currentPage",
    event: "click"
  },
  props: {
    currentPage: {
      type: Number,
      default: null
    },
    totalRows: {
      type: Number,
      default: null
    },
    perPage: {
      type: Number,
      default: null
    }
  },
  computed: {
    total: function() {
      let pages = Math.ceil(this.totalRows / this.perPage);
      let arr = [];
      for (let i = 1; i <= pages; i++) {
        arr.push(i);
      }
      return arr;
    }
  }
};
</script>
