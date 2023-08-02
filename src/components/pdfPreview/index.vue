<template>
  <div class="pdf-wp" v-if="pdfShow" :class="{ 'mobile-wp': isMobile() }">
    <div class="loading" v-show="pdfLoading">
      正在处理文件,请稍后..
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <pdf
      :src="pdfUrl"
      class="pdf-center"
      v-if="pdfShow"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      :page="currentPage"
      @loaded="loaded"
      @click.stop
    >
    </pdf>
    <div class="btn-wp">
      <div class="label" :title="fileName">{{ fileName }}</div>
      <div class="btn">
        <i
          class="el-icon-arrow-left"
          @click="changePdfPage(0)"
          :class="{ disabled: currentPage == 1 }"
        ></i>
        <i
          class="el-icon-arrow-right"
          @click="changePdfPage(1)"
          :class="{ disabled: currentPage == pageCount }"
        ></i>
      </div>
    </div>
    <div class="viewer-tool" @click="cancelHandler">
      <i class="el-icon-circle-close"></i>
    </div>
  </div>
</template>

<script>
import CMapReaderFactory from "./CMapReaderFactory.js";
import pdf from "vue-pdf";
export default {
  name: "PDFPreview",
  props: {
    pdfShow: Boolean,
    pdfLoading: Boolean,
    pdfSrc: String,
    fileName: String,
  },
  components: {
    pdf,
  },
  data() {
    return {
      pageCount: 0,
      currentPage: 1,
      numPages: 0,
      pdfUrl2: null,
    };
  },
  computed: {
    pdfUrl() {
      let url = "";
      if (this.$props.pdfSrc) {
        url = pdf.createLoadingTask({
            url: this.$props.pdfSrc,
            cMapUrl: 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/',
            cMapPacked: true,
        });
      }
      return url;
    },
  },
  mounted() {
    // console.log(this.$props.pdfSrc);
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    isMobile() {
      return "ontouchstart" in window;
    },
    loaded(val) {
      this.$emit("loaded", val);
    },
    cancelHandler() {
      this.$emit("cancelHandler");
    },
  },
};
</script>

<style lang="less" scoped>
.viewer-tool {
  position: absolute;
  font-size: 16px;
  width: 48px;
  height: 48px;
  border-radius: 48px;
  background: #5f6d7f;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  right: 40px;
  top: 40px;
  &:hover {
    background: #afb6c0;
  }
}
.pdf-wp {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  z-index: 20000;
  align-items: center;
  justify-content: center;
  .pdf-center {
    width: 60%;
    height: 98%;
    overflow-y: auto;
    padding: 11px 20px;
    background: #a0a0a0;
  }
}
.btn-wp {
  width: 200px;
  height: 62px;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  .label {
    flex: 1;
    line-height: 34px;
    width: 100%;
    color: #fff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    i {
      color: #fff;
      cursor: pointer;
      &:last-child {
        margin-left: 20px;
      }
    }
    i.disabled {
      color: #303d4e;
    }
  }
}
.mobile-wp {
  .pdf-center {
    width: 100vw;
    height: 100vh;
  }
}
.loading {
  width: 180px;
  height: 15px;
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: 999;
}
.loading span {
  margin-top: 20px;
  display: inline-block;
  width: 15px;
  height: 100%;
  margin-right: 5px;
  background: #ccc;
  -webkit-transform-origin: right bottom;
  -webkit-animation: load 1s ease infinite;
}
.loading span:last-child {
  margin-right: 0px;
}
@-webkit-keyframes load {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: rotate(90deg);
  }
}
.loading span:nth-child(1) {
  -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
  -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
  -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(4) {
  -webkit-animation-delay: 0.52s;
}
.loading span:nth-child(5) {
  -webkit-animation-delay: 0.65s;
}
</style>
