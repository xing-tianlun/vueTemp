<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="btn">btn</button>

    <pdf-preview
      :pdfShow="pdfShow"
      :pdfLoading="pdfLoading"
      :pdfSrc="pdfSrc"
      @loaded="loaded"
      @cancelHandler="cancelHandler"
    ></pdf-preview>
    <button @click="preview(row)">预览</button>


    <el-tabs v-model="tabsValue" type="card" @tab-remove="removeTab" :closable="tabs.length > 1">
      <el-tab-pane
        v-for="item in tabs"
        :key="item"
        :label="item"
        :name="item"
      >
        {{ item === 'pageA' }}
        <div v-if="item === 'pageA'">
          <pageA/>
        </div>
        <div v-if="item === 'pageB'">
          <pageB/>
        </div>
        <div v-if="item === 'pageC'">
          <pageC/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import moment from "moment";
import uploads from "@/mixins/upload";

import pageA from './page/pageA.vue'
import pageB from './page/pageB.vue'
import pageC from './page/pageC.vue'

export default {
  name: "HomeView",
  mixins: [uploads],
  data() {
    return {
      a: "",
      row: {
        url: "https://account-dev.oss-cn-beijing.aliyuncs.com/invoice/20230526/%E5%AE%8C%E7%A8%8E%E8%AF%81%E6%98%8E%E2%80%94%E2%80%94%E6%98%8E%E7%BB%86%E6%B5%8B%E8%AF%95.pdf",
        name: "123.pdf"
      },
      tabs: [
        "pageA", "pageB", "pageC"
      ],
      tabsValue: "pageA"
    };
  },
  methods: {
    btn() {
      this.a = moment(new Date()).format("yyyy-MM-DD hh:mm:ss");
      var a = moment("2023-05-06");
      var b = moment("2023-04-04");
      let aaa = a.diff(b, "days"); // 1
      console.log(aaa);
    },
    preview(row) {
      this.toPreview(row);
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.tabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab;
            }
          }
        });
      }
      this.tabsValue = activeName;
      this.tabs = tabs.filter(tab => tab !== targetName);
    },
  },
  components: {
    HelloWorld, pageA, pageB, pageC
  },
};
</script>
