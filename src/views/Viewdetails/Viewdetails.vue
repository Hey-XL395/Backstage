<template>
  <div class="Viewdetails">
    <div class="tabledv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账单详情</span>
        </div>
        <div class="page dialogCare">
          <div>付款账户：{{ msg.account }}</div>
          <div>收款账户：{{ msg.Accountname }}</div>
          <div>收款人姓名：{{ msg.name }}</div>
          <div>
            收款金额：<span>{{ msg.money }}</span
            >元
          </div>
        </div>
          <el-button type="primary" @click="backhome">返回首页</el-button>
          <el-button type="primary" @click="Printing">打印</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Viewdetails",
  components: {},
  props: {},
  data() {
    return {
      msg: {}
    };
  },
  methods: {
      backhome(){
          let routeData = this.$router.resolve({ path: '/'});
          window.open(routeData.href, '_blank');
      },
      Printing(){
          let newstr = document.getElementsByClassName('dialogCare')[0].innerHTML;
          console.log(newstr)
          window.document.body.innerHTML = newstr;
          let oldstr = window.document.body.innerHTML;
          window.print();
          window.location.reload();   //解决打印之后按钮失效的问题
          window.document.body.innerHTML = oldstr;
          return false;
      },

  },
  mounted() {
    this.msg = this.$route.query;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.tabledv {
  width: 20%;
  margin: 300px auto;
  padding: 20px;
}
.page div{
  padding: 10px;
}
</style>
