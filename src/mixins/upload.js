import pdfPreview from "@/components/pdfPreview/index.vue";
export default {
  components: { pdfPreview },
  data() {
    return {
      templateLoading: false,
      images: [],
      pdfSrc: "",
      pdfShow: false,
      pdfLoading: false,
      fileName: "",
    };
  },
  methods: {
    async toPreview(row, api) {
      console.log(row);
      const type = row.name.split(".").pop();
      this.fileName = row.name;
      const isPDF = type.toUpperCase() === "PDF";
      if (isPDF) {
        this.pdfShow = true;
        this.pdfLoading = true;
      }
      if (isPDF) {
        this.pdfSrc = row.url;
      } else {
        this.images = res.map((item) => item.url);
        this.showImgs(this.images);
      }
    },
    bytesToSize(size) {
      if (size < 1024) {
        return size + "B";
      } else if (size >= 1024 && size < Math.pow(1024, 2)) {
        return parseFloat(size / 1024).toFixed(2) + "KB";
      } else if (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3)) {
        return parseFloat(size / Math.pow(1024, 2)).toFixed(2) + "MB";
      } else if (size > Math.pow(1024, 3)) {
        return parseFloat(size / Math.pow(1024, 3)).toFixed(2) + "GB";
      } else {
        return 0 + "B";
      }
    },
    loaded() {
      this.pdfLoading = false;
    },
    cancelHandler() {
      this.pdfSrc = "";
      this.pdfShow = false;
    },
  },
};
