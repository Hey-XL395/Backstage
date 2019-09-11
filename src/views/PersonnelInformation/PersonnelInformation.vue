<template>
  <div class="PersonnelInformation">
    <header>
      <div>
        <img src="../../assets/人员.png" alt="" class="imgstyle" />人员信息
      </div>
      <div>
        <el-button type="primary" v-if="flag" @click="show"
          >批量转正申请</el-button
        >
        <el-button type="primary" v-if="!flag" @click="confirmConverted"
          >确认</el-button
        ><el-button type="primary" v-if="!flag" @click="cancelshow"
          >取消</el-button
        ><el-button type="primary">导出</el-button>
      </div>
    </header>
    <nav>
      <div>
        <el-button type="primary" plain @click="allpeople">全部员工</el-button
        ><el-button type="primary" plain @click="Examination"
          >考核中员工</el-button
        ><el-button type="primary" plain @click="Converted"
          >已转正员工</el-button
        >
      </div>
      <br />
      <div>
        <el-card class="box-card">
          <div>
            <el-table
              ref="filterTable"
              :data="frommsg.slice((val - 1) * val1, val1 * val)"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="225"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="id"
                label="工号"
                sortable
                header-align="center"
                align="center"
                width="225"
                column-key="olddate"
              >
              </el-table-column>
              <el-table-column
                prop="maxdepartment"
                label="机构"
                width="225"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="department"
                label="部门"
                width="225"
                header-align="center"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="startdate"
                label="试用期开始日期"
                sortable
                header-align="center"
                align="center"
                width="225"
                column-key="newdate"
              >
              </el-table-column>
              <el-table-column
                prop="enddate"
                label="试用期结束日期"
                sortable
                header-align="center"
                align="center"
                width="225"
                column-key="newdate"
              >
              </el-table-column>
              <el-table-column
                prop="type"
                label="转正审批状态"
                width="225"
                header-align="center"
                align="center"
                :filters="[
                  { text: '审核通过', value: '审核通过' },
                  { text: '审核中', value: '审核中' },
                  { text: '审核未通过', value: '审核未通过' }
                ]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                width="225"
                header-align="center"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button type="primary" @click="getmsg(scope)"
                    >编辑试用期</el-button
                  >
                </template></el-table-column
              >
            </el-table>
          </div>
        </el-card>
      </div>
    </nav>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[30, 60, 90, 120]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="frommsg.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonnelInformation",
  components: {},
  props: {},
  data() {
    return {
      flag: true,
      frommsg: [],
      maxfrommsg: [],
      val: 1,
      val1: 30,
      currentPage: 1,
      checktype: []
    };
  },
  methods: {
    //点击多选框
    handleSelectionChange(val) {
      console.log(val);
      this.checktype = val;
      // this.checktype.map(item=>{
      //   item.type = "审核通过"
      // })
    },
    // 批量转正申请
    show() {
      this.flag = false;
      this.frommsg = [];
      this.maxfrommsg.map(item => {
        if (item.type === "审核中") {
          this.frommsg.push(item);
        }
      });
    },
    // 确认
    confirmConverted() {
      console.log(1);
      if (this.checktype.length === 0){
        this.$message({
          message:"一条数据都没有",
          type:"error"
        })
      } else {
        this.checktype.map(item => {
          item.type = "审核通过";
        });
        this.flag = true
      }

    },
    cancelshow() {
      this.flag = true;
    },
    filterTag(value, row) {
      return row.type === value;
    },
    getmsg() {},
    // 全部员工再次赋值
    allpeople() {
      this.frommsg = this.maxfrommsg;
      this.flag = true;
    },
    //考核中员工
    Examination() {
      this.frommsg = [];
      this.maxfrommsg.map(item => {
        if (item.type === "审核中") {
          this.frommsg.push(item);
        }
      });
    },
    //转正员工
    Converted() {
      this.frommsg = [];
      this.flag = true;
      this.maxfrommsg.map(item => {
        if (item.type === "审核通过") {
          this.frommsg.push(item);
        }
      });
    },
    filterHandler(value, row, column) {
      // console.log(column);
      const property = column["property"];
      return row[property] === value;
    },
    handleSizeChange(val) {
      this.val1 = val;
    },
    handleCurrentChange(val) {
      this.val = val;
    }
  },
  mounted() {
    this.$axios
      .req("api/PersonnelInformation")
      .then(res => {
        this.frommsg = res.data.data;
        this.maxfrommsg = res.data.data;
        console.log(res);
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
  margin: 30px;
}
header div:first-child {
  font-size: 20px;
  font-weight: bold;
}
nav {
  margin: 30px;
}
.imgstyle {
  vertical-align: middle;
  padding-right: 10px;
}
.block {
  margin: 20px;
}
</style>
