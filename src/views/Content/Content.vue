<template>
  <div class="Content">
    <router-view
      v-if="$route.path === '/Land' || $route.path === '/Registrazione'"
    ></router-view>
    <el-container v-else>
      <el-header><headerNav></headerNav></el-header>
      <el-container>
        <el-aside :width="widthlength"><asideNav></asideNav></el-aside>
        <el-container>
          <el-main><Crumbs></Crumbs><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Crumbs from "../../components/Crumbs/Crumbs";
import headerNav from "../../components/headerNav/headerNav";
import asideNav from "../../components/asideNav/asideNav";
export default {
  name: "Content",
  components: {
    headerNav,
    Crumbs,
    asideNav
  },
  props: {},
  data() {
    return {
      widthlength:""
    };
  },
  methods: {},
  mounted() {
    // if (this.$store.state.widthcode) {
    //   this.widthlength = "200px";
    // }
  },
  created() {},
  filters: {},
  computed: {
  },
  watch: {
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.el-header {
  background-color: #2e5e85;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  top: 0px;
}
.el-aside {
  background-color: #344055;
  /*background-color: #f0f2f5;*/
  /*position: fixed;*/
  /*top: 60px;*/
  /*left: 0;*/
  margin-top: 60px;
  /*height: 100vh;*/
}
.el-main {
  background-color: #f0f2f5;
  margin-top: 50px;
  height: 100vh;
}
</style>
