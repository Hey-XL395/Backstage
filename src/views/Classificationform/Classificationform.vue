<template>
  <div class="Classificationform">
    <div class="txt">
      <div class="txt1">请填写您的转账信息</div>
      <div class="txt2">请务必是你本人操作，确认转账金额及收款人信息</div>
    </div>
    <el-card class="box-card">
      <div class="body__">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
      </div>
      <div class="body_" v-if="active === 1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          label-position="left"
          class="demo-ruleForm"
        >
          <el-form-item label="付款账户：" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="收款账户：" prop="pay">
            <div class="flexsize">
              <el-select v-model="ruleForm.pay" placeholder="请选择">
                <el-option label="支付宝" value="zhifubao"></el-option>
                <el-option label="银行卡" value="yinhangka"></el-option>
              </el-select>
              <el-input v-model="ruleForm.Accountname"></el-input>
            </div>
          </el-form-item>
          <el-form-item> </el-form-item>
          <el-form-item label="付款人姓名：" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="收款金额：" prop="money">
            <el-input
              v-model="ruleForm.money"
              prefix-icon="el-icon-money"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >下一步</el-button
        >
      </div>
      <div class="body_" v-if="active === 2">
        <el-alert title="消息提示的文案" type="info" show-icon> </el-alert>
        <div class="pagetwo">
          <div>付款账户：{{ ruleForm.account }}</div>
          <div>收款账户：{{ ruleForm.Accountname }}</div>
          <div>收款人姓名：{{ ruleForm.name }}</div>
          <div>
            收款金额：<span>{{ ruleForm.money }}</span
            >元
          </div>
        </div>
        <el-divider></el-divider>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next">提交</el-button>
        <el-button type="primary" @click="back">上一步</el-button>
      </div>
      <div class="body_" v-if="active === 3">
        <img src="../../assets/对.png" alt="" />
        <br />
        <div>操作成功</div>
        <div>预计两小时到账</div>
        <div class="pagethree">
          <div>付款账户：{{ ruleForm.account }}</div>
          <div>收款账户：{{ ruleForm.Accountname }}</div>
          <div>收款人姓名：{{ ruleForm.name }}</div>
          <div>
            收款金额：<span>{{ ruleForm.money }}</span
            >元
          </div>
        </div>
        <el-button type="primary" @click="again">再转一笔</el-button>
        <!--        <router-link-->
        <!--          target="_blank"-->
        <!--          :to="{ path: '/Transferaccounts', query: { name: ruleForm.name } }"-->
        <!--        >-->
<!--        <el-button class="routerSpan" @click="newpage">查看详情</el-button>-->
        <!--        </router-link>-->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Classificationform",
  components: {},
  props: {},
  data() {
    return {
      active: 1,
      ruleForm: {
        name: "何婧毓",
        account: "何婧毓",
        pay: "", //支付方式
        money: 9999999,
        Accountname: "6222629530004624590",
        password: "123456"
      },
      rules: {
        account: [
          { required: true, message: "请输入付款账户", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入付款人姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "只能为六个字符",
            trigger: "blur"
          }
        ],
        money: [
          { required: true, message: "请输入收款金额", trigger: "blur" },
        ],
        pay: [{ required: true, message: "请选择收款账户", trigger: "change" }]
      }
    };
  },
  methods: {
    next() {
      if (this.ruleForm.password.length === 6) {
        this.active++;
      } else {
        this.$message({
          message: "请输入六位密码",
          type: "error"
        });
      }
    },
    again() {
      this.active = 1;
    },
    back() {
      this.active--;
    },
    newpage() {
      // this.$router.push({path:"/",query})
      let routeData = this.$router.resolve({
        path: "/Viewdetails",
        query: {
          name: this.ruleForm.name,
          account: this.ruleForm.account,
          Accountname: this.ruleForm.Accountname,
          money: this.ruleForm.money
        }
      });
      window.open(routeData.href, "_blank");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.active++ > 2) this.active = 1;
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.txt {
  margin: 20px;
  background-color: white;
}
.txt1 {
  margin: 20px;
  font-size: 20px;
}
.txt2 {
  margin: 20px;
  color: #c0c0c0;
}
.box-card {
  margin: 20px;
}
.body__ {
  width: 70%;
  margin: 0 auto;
}
.body_ {
  width: 50%;
  text-align: center;
  margin: 0 auto;
}
.flexsize {
  display: flex;
  justify-content: space-around;
}
.pagethree {
  margin: 20px auto;
  background-color: silver;
  width: 500px;
  text-align: left;
}
.pagethree div {
  padding: 10px;
}
.pagetwo div {
  padding: 10px;
}
.pagetwo {
  text-align: left;
}
.pagetwo div span {
  font-size: 20px;
  font-weight: bold;
}
</style>
