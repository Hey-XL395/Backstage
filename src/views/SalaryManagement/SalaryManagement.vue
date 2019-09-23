<template>
  <div class="SalaryManagement">
    <header>
      <div>
        <img src="../../assets/钱.png" alt="" class="imgstyle" />薪酬管理
      </div>
    </header>
    <el-card class="box-card">
      <div slot="header">
        <div class="toptitle">
          <span class="title"
            >{{ this.$moment(this.value2).format("YYYY年MM月") }} 薪酬预算</span
          >
          <div class="block">
            <el-date-picker v-model="value2" type="month" placeholder="选择月">
            </el-date-picker>
          </div>
        </div>
        <div class="crm">
          <span class="text"
            >如有更多的渠道请自行添加，所有添加的渠道会显示在CRM系统中</span
          >
        </div>
      </div>

      <div>
        <el-table
          :data="Salary"
          style="width: 100%"
          fit
          @cell-click="tabclick"
          show-summary
        >
          <el-table-column
            prop="Salary"
            label="薪资构成"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope" class="el_border_none">
              <el-input
                v-show="!scope.row.flag2"
                size="small"
                @blur="changeshow2(scope)"
                @keydown.enter.native="scope.row.flag2 = !scope.row.flag2"
                v-model="scope.row.Salary"
                style="width:200px"
              ></el-input>
              <span v-show="scope.row.flag2">{{ scope.row.Salary }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="expenditure"
            label="计划支出"
            header-align="center"
            align="center"
          >
            <!--            <template slot-scope="scope" class="el_border_none">-->
            <!--              <el-input-->
            <!--                v-model="scope.row.expenditure"-->
            <!--                placeholder="请输入内容"-->
            <!--                class="el-inp"-->
            <!--              ></el-input>-->
            <!--            </template>-->
            <template scope="scope">
              <el-input
                v-show="!scope.row.flag"
                size="small"
                @blur="changeshow1(scope)"
                @keydown.enter.native="scope.row.flag = !scope.row.flag"
                v-model="scope.row.expenditure"
                style="width:200px"
              ></el-input>
              <span
                v-show="scope.row.flag"
                @click="scope.row.flag = !scope.row.flag"
                >{{ scope.row.expenditure }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="Actual"
            label="实际支出"
            header-align="center"
            align="center"
          >
            <template scope="scope">
              <el-input
                v-show="!scope.row.flag1"
                size="small"
                @blur="changeshow3(scope)"
                @keydown.enter.native="scope.row.flag1 = !scope.row.flag1"
                v-model="scope.row.Actual"
                style="width:200px"
              ></el-input>
              <span
                v-show="scope.row.flag1"
                @click="scope.row.flag1 = !scope.row.flag1"
                >{{ scope.row.Actual }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="Lastmonth"
            label="上月支出"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope" class="el_border_none">
              <div>
                <el-link disabled>{{ scope.row.LastmonthActual }}</el-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="LastmonthActual"
            label="上月实际"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope" class="el_border_none">
              <div>
                <el-link disabled>{{ scope.row.LastmonthActual }}</el-link>
              </div>
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            v-for="item in labelarr"-->
          <!--            :prop="item.prop"-->
          <!--            :label="item.label"-->
          <!--            header-align="center"-->
          <!--            align="center"-->
          <!--          >-->
          <!--            <template slot-scope="scope" class="el_border_none">-->
          <!--              <el-input-->
          <!--                v-model="scope.row.expenditure"-->
          <!--                placeholder="请输入内容"-->
          <!--                class="el-inp"-->
          <!--              ></el-input>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
      <div v-if="flag">
        <el-button type="primary" class="addbtn" @click="addbtn"
          >添加更多</el-button
        >
      </div>
      <div v-else class="addbtn">
        <el-button type="primary" @click="goadd">确认</el-button>
        <el-button type="primary" @click="backadd">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SalaryManagement",
  components: {},
  props: {},
  data() {
    return {
      value2: "",
      flag2: true,
      flag: true,
      Salary: [],
      labelarr: [
        // { prop: "Salary", label: "薪资管理" },
        { prop: "expenditure", label: "计划支出" },
        { prop: "Actual", label: "实际支出" },
        { prop: "Lastmonth", label: "上月支出" },
        { prop: "LastmonthActual", label: "上月实际" }
      ]
    };
  },
  methods: {
    tabclick(row, column, cell, event) {
      console.log(row);
    },
    changeshow1(scope){
      if (scope.row.expenditure !== ""){
        scope.row.flag = !scope.row.flag
      }
    },
    changeshow2(scope){
      if (scope.row.Salary !== ""){
        scope.row.flag2 = !scope.row.flag2
      }
    },
    changeshow3(scope){
      if (scope.row.Actual !== ""){
        scope.row.flag1 = !scope.row.flag1
      }
    },
    addbtn() {
      this.flag = false;
      this.Salary.push({
        Actual: "",
        Lastmonth: 0,
        LastmonthActual: 0,
        Salary: "",
        expenditure: "",
        flag: false,
        flag1: false,
        flag2: false
      });
    },
    backadd() {
      this.flag = true;
      this.Salary = this.Salary.splice(0,this.Salary.length-1);
    },
    goadd() {
      console.log();
      let arr = this.Salary[this.Salary.length - 1];
      if (
        arr.Actual.length > 0 &&
        arr.Salary.length > 0 &&
        arr.expenditure.length > 0
      ) {
        this.flag = true;
      } else {
          this.$message({
              message:"数据未完善",
              type:"error"
          })
      }
    }
  },
  mounted() {
    this.value2 = Date.now();
    this.$axios
      .req("api/Salary")
      .then(res => {
        console.log(res.data.data);
        this.Salary = res.data.data;
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    flag(val) {
      console.log(val);
      if (val) {
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  margin: 30px;
}
header div:first-child {
  font-size: 20px;
  font-weight: bold;
}
.imgstyle {
  vertical-align: middle;
}
.box-card {
  margin: 20px;
}
.title {
  display: inline-block;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
}
.crm {
  line-height: 50px;
  background-color: pink;
  margin: 10px -21px;
}
.toptitle {
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
}
.text {
  margin: 10px;
}
.addbtn {
  margin: 20px;
}
</style>
