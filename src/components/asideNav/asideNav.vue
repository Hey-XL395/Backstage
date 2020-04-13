<template>
  <div class="asideNav">
    <el-menu
      :default-active="String(nowactive)"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      :collapse="isCollapsecode"
      @select="handleSelect"
      text-color="black"
      active-text-color="skyblue"
      background-color="pink"
    >
      <el-menu-item
        v-for="(item, index) in bigclass"
        :index="String(index + 1)"
        :key="index"
        v-if="!item.smallclass"
      >
	  <!-- @click="dialogVisible = item.shownew" 不提示新消息-->
        <i :class="item.icon"></i
        >
		<!-- <img
          src="../../assets/圆点.png"
          alt=""
          v-if="item.shownew === true && isCollapsecode === true"
          class="picclass"
        /> -->
        <span
          >{{ item.title
          }}<!-- <span v-if="item.shownew === true" class="newstyl">new</span> -->
		  </span
        >
      </el-menu-item>
      <!--再次循环-->
      <el-submenu
        v-for="(item, index) in bigclass"
        :key="index"
        :index="String(index + 4)"
        v-if="item.smallclass"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#344055"
      >
        <template slot="title">
          <i :class="item.icon"></i
          >
<!-- 		  <img
            src="../../assets/圆点.png"
            alt=""
            v-if="item.shownew === true && isCollapsecode === true"
            class="picclass"
          /> -->
          <span slot="title"
            >{{ item.title
            }}
<!-- 			<span v-if="item.shownew === true" class="newstyl"
              >new</span
            >-->
			</span
          >
        </template>
		<!-- @click="dialogVisible = item.shownew" 不提示新消息-->
        <el-menu-item
          v-for="(item1, index1) in item.smallclass.title"
          :key="index1"
          :index="String(index + 3 - index1)"
          v-if="item.smallclass"
          >{{ item1 }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
    <el-dialog title="通知" :visible.sync="dialogVisible" width="30%">
      <span>{{ text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
export default {
  name: "Left",
  components: {},
  props: {},
  data() {
    return {
      nowactive: 1, //当前默认侧边选项
      dialogVisible: false,
      keyindex: 0, //第几段有new显示话
      text: "",
      arr: [], //生成的话
      bigclass: [
        {
          title: "首页",
          icon: "el-icon-menu"
        },
        // {
        //   title: "日程管理",
        //   icon: "el-icon-video-pause"
        // },
        {
          title: "通讯录",
          icon: "el-icon-c-scale-to-original"
        },
        {
          title: "组织员工",
          icon: "el-icon-brush",
          smallclass: {
            title: ["offer管理", "人员信息", "薪酬管理"]
          }
        },
        {
          title: "表单页",
          icon: "el-icon-paperclip",
          smallclass: {
            title: ["分布表单"]
          }
        }
      ]
    };
  },
  methods: {
    // 弹出
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    // 获取当前点击的下标element自带事件
    handleSelect(key) {
      this.keyindex = key;
      this.text = this.arr[this.keyindex - 1];
      if (Number(key) === 1) {
        localStorage.setItem("nowactive", "1");
        this.$router.push("/");
      }
      // if (Number(key) === 2) {
      //   localStorage.setItem("nowactive", "2");
      //   this.$router.push("/scheduleManagement");
      // }
      if (Number(key) === 2) {
        localStorage.setItem("nowactive", "2");
        this.$router.push("/Maillist");
      }
      if (Number(key) === 3) {
        localStorage.setItem("nowactive", "3");
        this.$router.push("/SalaryManagement/Organizationalpersonnel");
      }
      if (Number(key) === 4) {
        localStorage.setItem("nowactive", "4");
        this.$router.push("/PersonnelInformation/Organizationalpersonnel");
      }
      if (Number(key) === 5) {
        localStorage.setItem("nowactive", "5");
        this.$router.push("/OfferAdministration/Organizationalpersonnel");
      }
      if (Number(key) === 6) {
        localStorage.setItem("nowactive", "6");
        this.$router.push("/Classificationform/From");
      }
    },
    handleOpen(key, keyPath) {
      // //console.log(key, keyPath);
    }
  },
  mounted() {
    if (!localStorage.getItem("nowactive")) {
      localStorage.setItem("nowactive", "1");
    }
    this.nowactive = localStorage.getItem("nowactive");
    //console.log(this.nowactive);
    // 获取是否新增
    this.$axios
      .req("api/getnew")
      .then(res => {
        this.bigclass.map((item, index) => {
          this.$set(item, "shownew", res.data.data[index].shownew);
        });
        res.data.data.map(item => {
          this.arr.push(item.text);
        });
      })
      .catch(e => {
        //console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    isCollapsecode() {
      return this.$store.state.showlable;
    },
    // // ...mapState(["lablecode", "widthcode"])
    // languagedata() {
    //   return this.$i18n.locale;
    // }
  },
  watch: {
    // languagedata(val, oldval) {
    //   // //console.log(val);
    //   // //console.log(oldval);
    //   this.bigclass[0].title = this.$t("content.home");
    //   this.bigclass[1].title = this.$t("content.Schedule");
    //   this.bigclass[2].title = this.$t("content.Maillist");
    //   this.bigclass[3].title = this.$t("content.Organizeemployees");
    //   this.bigclass[4].title = this.$t("content.form");
    //   this.bigclass[3].smallclass.title[0] = this.$t("content.offer");
    //   this.bigclass[3].smallclass.title[1] = this.$t("content.peoplemessage");
    //   this.bigclass[3].smallclass.title[2] = this.$t(
    //     "content.salarymanagement"
    //   );
    //   this.bigclass[4].smallclass.title[0] = this.$t(
    //     "content.Distributionform"
    //   );
    // }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.asideNav {
  position: relative;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
  height: 100vh;
}
/*收缩后右边框*/
.el-menu {
  border-right: 0;
}
.newstyl {
  color: red;
  margin-left: 13px;
  vertical-align: bottom;
}
.showClose {
  /*position: absolute;*/
  /*top: 30px;*/
  /*z-index: 99999999 !important;*/
  /*right: 10px;*/
  position: absolute;
}
.picclass {
  margin-left: 3px;
  width: 15px;
  height: 15px;
}
</style>
