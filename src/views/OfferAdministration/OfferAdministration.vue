<template>
  <div class="OfferAdministration">
    <header>
      <div>offer管理</div>
      <div>
        <el-button type="primary">新建offer</el-button
        ><el-button type="primary">转移状态</el-button
        ><el-button type="primary">导出</el-button>
      </div>
    </header>
    <!--    <nav>-->
    <!--      <el-button type="primary" plain>全部员工</el-button-->
    <!--      ><el-button type="primary" plain>考核中员工</el-button-->
    <!--      ><el-button type="primary" plain>已转正员工</el-button>-->
    <!--    </nav>-->
  </div>
</template>

<script>
export default {
  name: "OfferAdministration",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.$axios
      .req("api/OfferAdministration")
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  margin: 30px;
}
header div:first-child {
  font-size: 20px;
  font-weight: bold;
}
</style>
