<template>
  <div class="headerNav">
    <p>{{ $t("menu.Welcome") }} {{ user }} {{ $t("menu.to") }}</p>
    <p>
      <img
        src="../../assets/中文语言.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'zh'"
      />
      <img
        src="../../assets/繁体.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'tc'"
      />
      <img
        src="../../assets/英文语言.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'en'"
      />
              <img
                      :src="uploaddata.avatar"
                      alt=""
                      class="userpig"
                      v-if="uploaddata.avatar"
              />
      <img :src="uploaddata.avatar_url" alt="" class="userpig" v-if="uploaddata.avatar_url && uploaddata.avatar === undefined">
      <img src="../../assets/用户.png" alt="" class="userpig" v-if="uploaddata.avatar_url === undefined && uploaddata.avatar === undefined" />
      {{ $t("menu.hello") }} {{ $t("menu.Dear") }} {{ user }}
      <el-popover placement="bottom" trigger="click">
        <div class="popdv">
          <div>
            <!--            <el-upload-->
            <!--              action="http://localhost:3000/upload"-->
            <!--              :http-request="uploadImg"-->
            <!--              :show-file-list="Boolean(false)"-->
            <!--            ><el-link :underline="false">上传头像</el-link>-->
            <!--            </el-upload>-->
            <!--            //跨域问题-->
            <el-upload
              class="upload-demo"
              action="api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-link :underline="false">上传头像</el-link>
            </el-upload>
          </div>
          <div @click="changemessage">
            <el-link :underline="false">修改密码</el-link>
          </div>
          <div @click="signout">
            <el-link :underline="false">退出系统</el-link>
          </div>
        </div>
        <i class="el-icon-caret-bottom" slot="reference"></i>
      </el-popover>
    </p>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="Boolean(false)"
    >
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
          label-position="left"
        >
          <el-form-item label="请输入原密码" prop="oldpassword">
            <el-input
              v-model="ruleForm.oldpassword"
              type="password"
              show-password
            ></el-input> </el-form-item
          ><el-form-item label="请输入新密码" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
            ></el-input> </el-form-item
          ><el-form-item label="请再次输入密码" prop="password">
            <el-input
              v-model="ruleForm.password1"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "headerNav",
  components: {},
  props: {},
  data() {
    return {
      uploaddata: {},
      ruleForm: {
        oldpassword: "",
        password: "",
        password1: ""
      },
      user: "",
      // value: localStorage.getItem("language") || "en", //初始化时候获取上次存的值，并在处于选中状态。
      Hello: "",
      // timedata:'',
      time: "",
      dialogVisible: false,
      rules: {
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        oldpassword: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //上传头像
    handleAvatarSuccess(res, file) {
      // //console.log(file);
      if (file.response.code === 500) {
        this.$message("上传失败");
      } else {
        // 不用调接口了
        // this.$axios
        //   .req("api/upload", {
        //     id: this.uploaddata._id,
        //     url: file.response.url
        //   })
        //   .then(res => {
        //     //console.log(res);
        //   })
        //   .catch(e => {
        //     //console.log(e);
        //   });
        this.$message({
            type:"success",
            message:"上传成功"
        });
        this.dialogVisible = false
        this.$set(this.uploaddata,"avatar",file.response.url)
        // this.uploaddata.avatar = file.response.url;
        // let arr = JSON.parse(localStorage.getItem("usermsg"));
        // arr.avatar = file.response.url;
        localStorage.setItem("usermsg", JSON.stringify(this.uploaddata));
      }
    },
    beforeAvatarUpload(file) {
      var isJPG = false;
      switch (file.type) {
        case "image/png":
          isJPG = true;
          break;
        case "image/jpeg":
          isJPG = true;
          break;
        default:
          isJPG = false;
          break;
      }
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 3MB!");
      }
      return isJPG && isLt2M;
    },
    //zz
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.Determine();
        } else {
          // //console.log("error submit!!");
          return false;
        }
      });
    },
    Determine() {
      if (
        this.ruleForm.oldpassword === "" ||
        this.ruleForm.password === "" ||
        this.ruleForm.password1 === ""
      ) {
        this.$message({
          type: "error",
          message: "信息不完善"
        });
      } else {
        if (this.ruleForm.password !== this.ruleForm.password1) {
          this.$message({
            type: "error",
            message: "两次新密码不一致"
          });
        } else {
          let usermsg = JSON.parse(localStorage.getItem("usermsg"));
          //console.log(usermsg);
          this.$axios
            .req("api/users/updatePwd", {
              username: usermsg.username,
              password: this.ruleForm.oldpassword,
              id: usermsg._id,
              newPwd: this.ruleForm.password
            })
            .then(res => {
              if (res.data.code === 200) {
                this.dialogVisible = false;
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              }
              if (res.data.code === 500) {
                this.$message({
                  type: "error",
                  message: res.data.msg
                });
              }
              ////console.log(res);
            })
            .catch(e => {
              ////console.log(e);
            });
        }
      }
    },
    // 退出
    signout() {
      this.$confirm("您确定要退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功"
          });
          this.$router.push("/Land");
          let name = "";
          let usermsg = {}
          localStorage.setItem("usermsg",JSON.stringify(usermsg))
          localStorage.setItem("user", name);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 修改密码
    changemessage() {
      this.dialogVisible = true;
    },
    //更换语言
    changelanguage() {
      //console.log(this.$i18n.locale);
      //改变element组件国际化
      // if (this.value === "en") {
      //   this.value = "zh";
      // } else {
      //   this.value = "en";
      // }
      // this.$i18n.locale = this.value; //在main.js里设置的i180我们在这里调用，并赋值
      // localStorage.setItem("language", this.value); //每次切换语言，本地存一下，防止刷新丢失。
      //改变element组件国际化
      if (this.$i18n.locale === "zh") {
        this.$i18n.locale = "tc";
      } else if (this.$i18n.locale === "tc") {
        this.$i18n.locale = "en";
      } else if (this.$i18n.locale === "en") {
        this.$i18n.locale = "zh";
      }
      //console.log(this.$i18n.locale);
    }
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.uploaddata = JSON.parse(localStorage.getItem("usermsg"));
    //console.log(this.uploaddata);
    this.$i18n.locale = "zh";
  },
  created() {},
  filters: {},
  computed: {
    flag() {
      return this.dialogVisible;
    }
  },
  watch: {
    flag(val) {
      if (val === false) {
        this.ruleForm.oldpassword = "";
        this.ruleForm.password = "";
        this.ruleForm.password1 = "";
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.headerNav {
  display: flex;
  justify-content: space-between;
  /*注意*/
  /*position: fixed;*/
  /*z-index: 1;*/
  /*top: 10px;*/
  background-color: #FEDCD3;
}
p {
  color: black;
  font-family:"gloucester mt extra condensed";
  font-weight: 500;
  font-size: 17px;
  line-height: 60px;
  margin: 0px 20px;
}
.userpig {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}
.imgtext {
  vertical-align: middle;
  margin-right: 20px;
  align-items: center;
}
.el-popover div {
  width: 100%;
  text-align: center;
  margin: 10px 0;
}
.el-popover {
  text-align: center;
  margin: 0 auto;
}
.popdv {
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
</style>
