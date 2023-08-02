<template>
  <div>
    <div v-for="item in list" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'pageA',
  data() {
    return {
      list: null,
    };
  },
  created() {
    console.log("created" + "pageA");
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
        { name: "pageA" + 1 },
        { name: "pageA" + 2 },
        { name: "pageA" + 3 },
        { name: "pageA" + 4 },
      ]
    }
  },
};
</script>
<style lang="less" scoped>
</style>
