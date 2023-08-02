<template>
  <div>
    <div v-for="item in list" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'pageC',
  data() {
    return {
      list: null,
    };
  },
  created() {
    console.log("created" + "pageC");
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      this.list = [
        { name: "pageC" + 1 },
        { name: "pageC" + 2 },
        { name: "pageC" + 3 },
        { name: "pageC" + 4 },
      ]
    }
  },
};
</script>
<style lang="less" scoped>
</style>
