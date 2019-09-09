<template>
  <div id="qrCode">
    <div id="code"></div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<style></style>
<script>
import QRCode from "qrcode";
export default {
  props: {
    code: {
      type: String
    }
  },
  data() {
    return {
      msg: "hello vue",
      codes: ""
    };
  },
  components: {
    QRCode: QRCode
  },

  methods: {
    useqrcode() {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.code, function(error) {
        if (error) console.error(error);
        // console.log("QRCode success!");
      });
    }
  },

  mounted() {
    // console.log(this.code);
    this.useqrcode();
  },
  computed: {
    codedata() {
      return this.code;
    }
  },
  watch: {
    codedata(val, oldval) {
      // console.log(val);
      // console.log(oldval);
      this.useqrcode();
    }
  }
};
</script>
