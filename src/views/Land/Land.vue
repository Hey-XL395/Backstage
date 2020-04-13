<template>
  <div class="Land dv_dv_dv1">
    <el-card class="Land1">
      <div slot="header" class="clearfix"><!--      清除浮动-->
        <span class="please">请登录</span>
      </div>
      <div class="middle1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          @submit.native.prevent
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <div></div>
          <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="ruleForm.name" @keydown.enter.native="Land"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          @submit.native.prevent
          label-width="130px"
          class="demo-ruleForm-Verification"
          label-position="left"
        >
          <el-form-item label="请输入密码" prop="password">
            <!--            隐藏密码-->
            <div class="passwordnone">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                @keydown.enter.native="Land"
              ></el-input
              >
<!--              <el-button-->
<!--                type="primary"-->
<!--                class="passwordnone1"-->
<!--                @click="getpassword"-->
<!--                >忘记密码</el-button-->
<!--              >-->
            </div>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          @submit.native.prevent
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm-Verification"
          label-position="left"
        >
          <el-form-item label="请输入验证码" prop="Verification">
            <el-input v-model="ruleForm.Verification" @keydown.enter.native="Land"></el-input
            ><span v-html="Captcha" @click="PIG"></span>
          </el-form-item>
        </el-form>
        <div class="foot1">
          <el-row>
            <el-button
              class="btn"
              type="primary"
              @click="Land"
              :plain="true"
              >登陆</el-button
            >
<!--            <div class="github">-->
<!--              <a href="api/users/githubLogin" @click="gethubuser"-->
<!--                ><img src="../../assets/github.png" alt=""-->
<!--              /></a>-->
<!--            </div>-->
            <el-button class="btn" type="primary" @click="Add" :plain="true"
              >注册</el-button
            >
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Land",
  components: {},
  props: {},
  data() {
    return {
      date: "",
      flag: true,
      Captcha: "",
      msg: "",
      msg1: "",
      ruleForm: {
        name: "",
        password: "",
        Verification: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        Verification: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Land() {
      if (this.ruleForm.name === "" || this.ruleForm.password === "") {
        this.$message({
          message: "请输入账号密码",
          type: "warning"
        });
      }
      if (this.ruleForm.Verification === "") {
        this.$message({
          message: "请输入验证码",
          type: "warning"
        });
        this.getCaptcha();
      } else {
        // 转换成小写
        this.ruleForm.Verification = this.ruleForm.Verification.toLowerCase();
      }
      if (
        this.ruleForm.name !== "" &&
        this.ruleForm.password !== "" &&
        this.ruleForm.Verification !== ""
      ) {
        // this.postLogin()
        this.$axios
          .req("/api/users/login", {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
            Verification: this.ruleForm.Verification
          })
          .then(res => {
            if (res) {
              //console.log(res.data);
              this.msg = res.data;
              if (this.msg.code === 500) {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
                this.getCaptcha();
              }
              if (this.msg.code === 200) {
                // 保存到本地
                localStorage.setItem("user", this.ruleForm.name);
                localStorage.setItem(
                  "usermsg",
                  JSON.stringify(this.msg.data.user)
                );
                this.$store.state.user = this.ruleForm.name;
                // 在跳转，不然第一次进不去
                this.$router.push("/");
                this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                this.date = new Date();
                let date1 = this.$moment(this.date).format(
                  "YYYY年MM月DD日HH点mm分ss秒"
                );
                localStorage.setItem("date", date1);
              }
            }
          })
          .catch(e => {
            //console.log(e);
          });
      }
    },
    getpassword() {
      this.$router.push("../Getpassword");
    },
    Add() {
      this.$router.push("../Registrazione");
    },
    PIG() {
      this.getCaptcha();
    },
    getCaptcha() {
      this.$axios
        .req("api/users/captcha")
        .then(req => {
          this.Captcha = req.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    gethubuser() {
      this.$axios
        .req("api/users/githubUser")
        .then(res => {
          //console.log(res);
          if (res.data.code === 200) {
              localStorage.setItem("user",res.data.data.login)
              localStorage.setItem("usermsg",JSON.stringify(res.data.data))
          }
        })
        .catch(e => {
          //console.log(e);
        });
    }
  },
  mounted() {
    this.getCaptcha();
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Land {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: url("../../assets/天氣之子.jpg");
  /*background-image: url("../../assets/猪.jpg");*/
}
.Land1 {
  width: 700px;
  height: 500px;
  background-color: white;
  margin: 200px auto;
}
.Land1 p {
  font-size: 20px;
  display: inline-block;
  width: 100%;
  margin: 0 auto;
  border-bottom: skyblue solid 2px;
  text-align: center;
  padding: 10px;
}
.passwordnone {
  display: flex;
  width: 310px;
}
.passwordnone1 {
  margin-left: 10px;
}
.please {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 20px;
}
.middle1 {
  width: 500px;
  height: 400px;
  margin: 30px auto;
}
.demo-ruleForm-Verification {
  width: 330px;
  position: relative;
}
.demo-ruleForm-Verification span {
  position: absolute;
  right: -170px;
}

.foot1 {
  width: 300px;
  height: 100px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
}
.btn {
  margin-top: 20px;
  width: 110px;
  height: 50px;
}
.github {
  display: inline-block;
  margin: 10px;
  vertical-align: middle;
}
</style>
