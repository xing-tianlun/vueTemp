<template>
  <div style="display: flex;justify-content: center;">
    <el-table ref="mainTable" class="t1" :data="tableData" style="width: 50%" row-key="id" border stripe>
      <el-table-column prop="id" label="id"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "SortTableView",
  data() {
    return {
      tableData: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
      ],
    };
  },
  mounted() {
    //调用拖拽行方法
    this.rowDrop();
  },
  methods: {
    //拖拽行方法
    rowDrop() {
      const tbody = document.querySelector(".t1 tbody");
      Sortable.create(tbody, {
        disabled: false, // 是否开启拖拽
        ghostClass: "sortable-ghost", //拖拽样式
        animation: 150, // 拖拽延时，效果更好看
        group: {
          // 是否开启跨表拖拽
          pull: false,
          put: false,
        },
        onEnd: (e) => {
          // 这里主要进行数据的处理，拖拽实际并不会改变绑定数据的顺序，这里需要自己做数据的顺序更改
          let arr = JSON.parse(JSON.stringify(this.tableData)); // 获取表数据
          arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]); // 数据处理
          this.$nextTick(function () {
            this.tableData = arr;
            this.$refs.mainTable.doLayout();
          });
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
  /deep/ .sortable-ghost {
    opacity: 0.4;
    background: #00a7d0;
  }
</style>
