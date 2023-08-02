<template>
  <div>
    <div v-for="item in list" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'pageB',
  data() {
    return {
      list: null,
    };
  },
  created() {
    console.log("created" + "pageB");
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
        { name: "pageB" + 1 },
        { name: "pageB" + 2 },
        { name: "pageB" + 3 },
        { name: "pageB" + 4 },
      ]
    }
  },
};
</script>
<style lang="less" scoped>
</style>
