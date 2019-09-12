<template>
  <div class="SalaryManagement">
    <header>
      <div>
        <img src="../../assets/钱.png" alt="" class="imgstyle" />offer管理
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
          </el-table-column>
          <el-table-column
            v-for="item in labelarr"
            :prop="item.prop"
            :label="item.label"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <input v-model="scope.row.expenditure"  class="el-input">
            </template>
          </el-table-column>
        </el-table>
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
      Salary: [],
      labelarr: [
        { prop: "expenditure", label: "计划支出" },
        { prop: "Actual", label: "实际支出" },
        { prop: "Lastmonth", label: "上月支出" },
        { prop: "LastmonthActual", label: "上月实际" }
      ]
    };
  },
  methods: {
    tabclick(row, column, cell, event) {
      console.log(cell);
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
  watch: {},
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
  .el-input {
    border: 0;
    text-align: center;
    margin: 10px;
    padding: 10px 0;
  }
</style>
