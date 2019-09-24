<template>
  <div class="citynav">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="spansize">利润（万）</span>
      </div>
      <div class="chartData">
        <ve-wordcloud
          :data="chartData"
          :settings="chartSettings"
        ></ve-wordcloud>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="spansize">个人动态</span>
        <el-button
          style="float: right; "
          size="mini"
          type="primary"
          @click="dialogVisible = true"
          >添加动态</el-button
        >
        <el-dialog title="添加动态" :visible.sync="dialogVisible" width="60%">
          <span
            ><el-form
              ref="form"
              :model="form"
              label-width="90px"
              label-position="left"
            >
              <el-form-item label="动态类型">
                <el-select v-model="form.type" placeholder="请选择动态类型">
                  <el-option
                    v-for="item in type"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="相关汇报人" v-if="form.type === '工作汇报'">
                <el-select
                  v-model="form.name"
                  multiple
                  placeholder="请选择汇报人"
                >
                  <el-option
                    v-for="item in name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详情内容">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item> </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="adddynamic">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value2"
          align="right"
          @change="datechange"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <br />
      <div v-if="smallDynamic.length === 0" class="none">暂无数据</div>
      <div class="hovercolor">
        <div
          v-for="(item, index) in smallDynamic"
          class="hovercolor1"
          :class="{
            hovercolor2: index % 2 === 0,
            hovercolor3: index % 2 !== 0
          }"
        >
          <div class="contentdv">
            <div>{{ item.classification }}</div>
            <div>{{ item.username }}</div>
          </div>
          <div
            v-if="item.reportUsers[0]"
            class="contentdv1"
            :title="item.reportUsers"
          >
            汇报人:
            <div v-for="item1 in item.reportUsers" class="contentdv1">
              {{ item1 }}
            </div>
          </div>
          <div class="contentdv">
            <div>动态：{{ item.dynamic }}</div>
            <div>发布于{{ item.time }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "citynav",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      sizeMin: 12,
      sizeMax: 19,
      shape: "diamond",
      color: []
    };
    return {
      type: ["个人心情", "工作汇报", "公司相关", "其他事物"], //汇报类型
      form: {
        name: "",
        region: "",
        delivery: false,
        type: [],
        desc: ""
      },
      dialogVisible: false,
      chartData: {
        columns: ["city", "num"],
        rows: []
      },
      name: [],
      city: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      allDynamic: [], //所有动态
      smallDynamic: [] //精简过滤动态
    };
  },
  methods: {
    //时间改变触发
    datechange(val) {
      val = this.$moment(val).format("YYYY年MM月DD日");
      //console.log(val);
      this.smallDynamic = [];
      this.allDynamic.map(item => {
        if (item.time === val) {
          this.smallDynamic.push(item);
        }
      });
    },
    handleClose() {},
    //添加动态确认按钮
    adddynamic() {
      this.dialogVisible = false;
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
      //添加
      let name = localStorage.getItem("user");
      this.$axios
        .req("api/addDynamic", {
          username: name,
          dynamic: this.form.desc,
          classification: this.form.type,
          reportUsers: this.form.name
        })
        .then(res => {
          this.$message({
            message: "发布成功",
            type: "success"
          });
          (this.form.type = ""),
            (this.form.region = ""),
            (this.form.desc = ""),
            (this.form.name = "");
        })
        .catch(e => {
          //console.log(e);
          this.$message({
            message: "发布失败",
            type: "warning"
          });
          (this.form.type = []),
            (this.form.region = ""),
            (this.form.desc = ""),
            (this.form.name = "");
        });
      this.getall();
    },
    // 获取所有动态
    getall() {
      let dateval = this.$moment(this.value2).format("YYYY年MM月DD日");
      this.$axios
        .req("api/getDynamic")
        .then(res => {
          this.smallDynamic = [];
          this.allDynamic = res.data.data;
          this.allDynamic.map(item => {
            this.$set(
              item,
              "time",
              this.$moment(item.date).format("YYYY年MM月DD日")
            );
            if (item.time === dateval) {
              this.smallDynamic.push(item);
            }
          });
        })
        .catch(e => {
          //console.log(e);
        });
    }
  },
  mounted() {
    //初始时间选择器时间
    this.value2 = Date.now(); //今天
    this.getall();
    //获取姓名
    this.$axios
      .req("api/name")
      .then(res => {
        this.name = res.data.data;
      })
      .catch(e => {
        //console.log(e);
      });
    // 获取城市
    this.$axios
      .req("api/city")
      .then(res => {
        this.city = res.data.data;
        res.data.data.map(item => {
          this.chartSettings.color.push(item.color);
        });
        this.chartData.rows = res.data.data;
      })
      .catch(e => {
        //console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    flagtype() {
      return this.dialogVisible;
    }
  },
  watch: {
    flagtype(vla, oldval) {
      if (oldval === false) {
        this.form.desc = "";
        this.form.type = "";
        this.form.name = [];
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-select {
  width: 100%;
}
.box-card {
  width: 48%;
  height: 520px;
  overflow: auto;
  margin: 20px auto;
}
.citynav {
  display: flex;
}
.cityrotate {
  border: 1px saddlebrown solid;
  position: static;
}
.chartData {
  width: 500px;
  margin: 0 auto;
}
.contentdv {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
.spansize {
  line-height: 28px;
  font-size: 14px;
}
.contentdv1 {
  display: inline-block;
  margin: 0 10px;
}
.hovercolor :hover {
  background-color: pink;
}
.hovercolor2 {
  background: skyblue;
}
.hovercolor3 {
  background: yellowgreen;
}
.none {
  margin-left: 20px;
}
.hovercolor1 {
  padding: 10px;
  margin: 10px;
}
/*滚动条样式*/
::-webkit-scrollbar {
  width: 14px;
  height: 14px;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  border-radius: 999px;
  border: 5px solid transparent;
}

::-webkit-scrollbar-track {
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-clip: content-box;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
}

::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
