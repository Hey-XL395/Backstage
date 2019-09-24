<template>
  <div class="Land dv_dv_dv1">
    <el-card class="Land1">
      <div slot="header">
        <span class="please">请注册账号</span>
      </div>
      <div class="middle1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm-Verification"
          label-position="left"
        >
          <el-form-item label="请再次输入密码" prop="password">
            <el-input
              v-model="ruleForm.password2"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入电话" prop="phone">
            <el-input
              v-model="ruleForm.phone"
              type="phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入邮箱" prop="mail">
            <el-input
              v-model="ruleForm.mail"
              type="phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <br />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="140px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入验证码" prop="verifica">
            <div class="verifica">
              <el-input
                v-model="ruleForm.verifica"
                type="phone"
                autocomplete="off"
              ></el-input>
              <el-button
                type="primary"
                class="verificabtn"
                @click="getverifica"
                :disabled="flag3"
                >获取验证码<span v-if="flag1">({{ num }})</span></el-button
              >
            </div>
          </el-form-item>
        </el-form>
        <div class="foot1">
          <el-row>
            <el-button class="btn" type="primary" @click="Land">登陆</el-button>
            <el-button class="btn" type="primary" @click="Add">注册</el-button>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "registrazione",
  components: {},
  props: {},
  data() {
    return {
      num: 60, //短信验证码倒计时
      flag1: false, //控制短信验证码倒计时
      input: "",
      input1: "",
      input2: "",
      input3: "",
      flag: true,
      flag3: false, //按钮是否禁用
      Captcha: "",
      ruleForm: {
        name: "jack",
        password: "123",
        password2: "123",
        phone: "18782234583",
        msg: "",
        mail: "271305636@qq.com",
        verifica: ""
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
        password2: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 6, max: 11, message: "长度在 6 到 11 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        verifica: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Land() {
      this.$router.push("/Land");
    },
    getverifica() {
      let phone = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/);
      if (!this.ruleForm.phone.match(phone)) {
        this.$message({
          type: "warning",
          message: "请输入正确的电话"
        });
        this.ruleForm.phone = "";
      } else {
        this.$axios
          .req("api/users/sendMsg", {
            phone: this.ruleForm.phone
          })
          .then(res => {
            this.flag1 = true;
            this.flag3 = true;
            //console.log(res);
            this.$message({
              type: "success",
              message: res.data.msg
            });
            clearInterval(timeId);
            let timeId = setInterval(() => {
              this.num--;
              if (this.num === 0) {
                clearInterval(timeId);
                this.flag1 = false;
                this.num = 60;
                this.flag3 = false;
              }
              //console.log(this.num);
            }, 1000);
          })
          .catch(e => {
            //console.log(e);
          });
      }
    },
    Add() {
      let reg = new RegExp(/[\u4e00-\u9fa5]/);
      if (this.ruleForm.name.match(reg)) {
        this.$message({
          type: "warning",
          message: "用户名不能为中文"
        });
        this.ruleForm.name = "";
      }
      let phone = new RegExp(/^(?:(?:\+|00)86)?1\d{10}$/);
      if (!this.ruleForm.phone.match(phone) && this.ruleForm.phone) {
        this.$message({
          type: "warning",
          message: "请输入正确的电话"
        });
        this.ruleForm.phone = "";
      }
      let mail = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
      if (!this.ruleForm.mail.match(mail) && this.ruleForm.mail) {
        this.$message({
          type: "warning",
          message: "请输入正确的邮箱"
        });
        this.ruleForm.mail = "";
      }
      if (
        this.ruleForm.password.length > 2 &&
        this.ruleForm.password2.length > 2 &&
        this.ruleForm.name.length > 2
      ) {
        if (this.ruleForm.password !== this.ruleForm.password2) {
          this.$message({
            message: "密码不一致",
            type: "warning"
          });
          return;
        }
        this.$axios
          .req("/api/users/register", {
            username: this.ruleForm.name,
            password: this.ruleForm.password,
            code: this.ruleForm.verifica,
            mail: this.ruleForm.mail,
            phone: this.ruleForm.phone
          })
          .then(req => {
            this.msg = req.data;
            //console.log(this.msg);
            if (this.msg.code === 500) {
              this.$message({
                message: this.msg.msg,
                type: "error"
              });
            } else {
              this.$router.push("/Land");
              this.$message({
                message: this.msg.msg,
                type: "success"
              });
            }
          })
          .catch(e => {
            //console.log(e);
          });
      }
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
.Land {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: skyblue;
  background-image: url("../../assets/海贼.jpg");
}
.Land1 {
  width: 700px;
  height: 700px;
  background-color: white;
  margin: 100px auto;
}
.please {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 20px;
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
.verifica {
  display: flex;
  width: 420px;
}
.verificabtn {
  margin-left: 10px;
}
.middle1 {
  width: 500px;
  height: 400px;
  margin: 30px auto;
}
.foot1 {
  width: 300px;
  height: 100px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
}
.btn {
  margin-top: 5px;
  width: 110px;
  height: 50px;
}
</style>
