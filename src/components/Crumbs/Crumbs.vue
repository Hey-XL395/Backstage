<template>
  <div class="Crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        ><span class="oldimg" :class="{ imrow: flag === false }"
          ><i class="el-icon-back" @click="showlable"></i></span
        ><span @click="tohome">首页</span></el-breadcrumb-item
      >
      <el-breadcrumb-item v-if="maxmsg">{{ maxmsg }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="msg !== '首页'">{{ msg }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Crumbs",
  components: {},
  props: {},
  data() {
    return {
      msg: "",
      maxmsg: "",
      flag: false
    };
  },
  methods: {
    showlable() {
      let flag = Boolean(this.$store.state.showlable);
      this.$store.state.showlable = !flag;
      this.flag = !flag;
    },
    tohome() {
      this.$router.push("/");
    }
  },
  mounted() {
    // if (!this.$store.state.lablecode) {
    //   this.$store.state.lablecode = true;
    // }
    // //console.log(this.$store.state.lablecode);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    $route(val) {
      this.maxmsg = val.meta.maxtitle;
      this.msg = val.meta.title
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.Crumbs {
  margin: 20px;
  padding-top: 40px;
}
.oldimg {
  transition: all 0.5s;
}
.imrow {
  display: inline-block;
  transform: rotate(180deg);
}
</style>
