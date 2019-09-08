<template>
  <div class="Land dv_dv_dv1">
    <el-card class="box-card ">
      <!--      <div v-for="o in 4" :key="o" class="text item">-->
      <!--      </div>-->
    </el-card>
    <el-card class="Land1">
      <p>请登录</p>
      <div class="middle1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
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
                  label-width="130px"
                  class="demo-ruleForm"
                  label-position="left"
          >
              <el-form-item label="请输入邮箱" prop="mail">
                  <el-input v-model="ruleForm.mail"></el-input>
              </el-form-item>
          </el-form>
          <br />
        <div class="foot1">
          <el-row>
            <el-button
              class="btn"
              type="primary"
              @click="Land"
              @keydown.enter="Land"
              :plain="true"
              >登陆</el-button
            >
            <el-button
              class="btn"
              type="primary"
              @click="getpassword"
              :plain="true"
              >找回密码</el-button
            >
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Getpassword",
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
        mail: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    Land() {
      this.$router.push("/Land");
    },
    getpassword() {
      this.$axios.req('api/users/getpassword',{
        username:this.ruleForm.name,
        mail:this.ruleForm.mail
      }).then(res=>{
        console.log(res);
      }).catch(e=>{
        console.log(e);
      })
    }
  },
  mounted() {},
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
  background-image: url("../../assets/背景图片.jpg");
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
.middle1 {
  width: 500px;
  height: 400px;
  margin: 30px auto;
}
.demo-ruleForm-Verification {
  width: 300px;
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
</style>
