<template>
  <div class="OfferAdministration">
    <header>
      <div>
        <img src="../../assets/文件.png" alt="" class="imgstyle" />offer管理
      </div>
      <div>
        <el-button type="primary">新建offer</el-button
        ><el-button type="primary">转移状态</el-button
        ><el-button type="primary">导出</el-button>
      </div>
    </header>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span
          ><el-button
            type="primary"
            size="mini"
            plain
            round
            autofocus
            v-for="item in cardtitle"
            @click="filtertype(item)"
            >{{ item.name }}（{{ item.num }}）</el-button
          ></span
        >
        <!--        <i style="float: right; padding: 3px 0" class="el-icon-setting"></i>-->
      </div>
      <div>
        <div>
          <el-table
            ref="filterTable"
            :data="Offerlist.slice((val - 1) * val1, val1 * val)"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" fit> </el-table-column>
            <el-table-column
              v-for="item in leftfields"
              :prop="item.prop"
              :label="item.label"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column width="225" header-align="center" align="center">
              <template slot="header" slot-scope="scope">
                <el-popover
                  ref="popover3"
                  placement="right"
                  width="300"
                  trigger="click"
                >
                  <div>
                    <div class="el-button_">
                      <el-popover
                        placement="left"
                        width="180"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                        v-model="visible"
                      >
                        <div
                          v-for="(item, index) in rigthfields"
                          :key="item.id"
                        >
                          <el-checkbox
                            :label="item.label"
                            @change="checktype(item, index)"
                          ></el-checkbox>
                        </div>
                        <div style="text-align: right; margin: 0">
                          <el-button
                            type="primary"
                            size="mini"
                            @click="showtable"
                            >确定</el-button
                          >
                        </div>
                        <el-button slot="reference" type="text"
                          >添加显示字段</el-button
                        >
                      </el-popover>
                      <el-popover
                        placement="right"
                        width="180"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                        v-model="visible1"
                      >
                        <div v-for="(item, index) in leftfields" :key="item.id">
                          <el-checkbox
                            :label="item.label"
                            @change="checktype1(item, index)"
                          ></el-checkbox>
                        </div>
                        <div style="text-align: right; margin: 0">
                          <el-button
                            type="primary"
                            size="mini"
                            @click="showtable1"
                            >确定</el-button
                          >
                        </div>
                        <el-button slot="reference" type="text"
                          >删除显示字段</el-button
                        >
                      </el-popover>
                    </div>
                    <el-divider></el-divider>
                    <div>选择间距类型</div>
                    <div class="el-button_">
                      <el-button type="text">紧凑</el-button
                      ><el-button type="text" autofocus>适中</el-button
                      ><el-button type="text">宽松</el-button>
                    </div>
                  </div>
                  <span slot="reference"><i class="el-icon-setting"></i></span>
                  <!--                  @click="couponClick(scope.$index, scope.row)"-->
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[30, 60, 90, 120]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Offerlist.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "OfferAdministration",
  components: {},
  props: {},
  data() {
    return {
      visible: false, //右侧的两个pop
      visible1: false,
      val: 1,
      val1: 30,
      Allfields: [
        { prop: "name", label: "姓名" },
        { prop: "email", label: "个人邮箱" },
        { prop: "cardidtype", label: "证件类型" },
        { prop: "cardid", label: "证件号码" },
        { prop: "sex", label: "性别" },
        { prop: "position", label: "职位" },
        { prop: "Nativeplace", label: "籍贯" },
        { prop: "qq", label: "qq" },
        { prop: "Entrytime", label: "入职时间" },
        { prop: "Approval", label: "offer状态" },
        { prop: "birth", label: "出生日期" },
        { prop: "Nation", label: "民族" },
        { prop: "telphone", label: "电话" },
        { prop: "study", label: "学历" },
        { prop: "phone", label: "手机" },
        { prop: "city", label: "工作地点" },
        { prop: "department", label: "部门" },
        { prop: "marriagetype", label: "婚姻状况" }
      ],
      leftfields: [], //左侧标题数量数据
      list: [], //同上中间数组
      rigthfields: [], //右侧pop标题数量数据
      currentPage: 1,
      Offerlist: [],
      maxOfferlist: [], //大的
      cardtitle: [
        { name: "待发offer", num: 0 },
        { name: "已发", num: 2 },
        { name: "已接受", num: 2 },
        { name: "已拒绝", num: 2 },
        { name: "已入职", num: 2 }
      ], //卡片头
      num: 2, //上述对应有几个
      num1: 9 //默认显示9个标题
    };
  },
  methods: {
    //处理左右数据，该显示什么确定按钮
    showtable() {
      let i = 0;
      this.list.map(item => {
        this.leftfields.push(this.Allfields[item + this.num1]);
        this.rigthfields.splice(item,1)
        i++;
      });
      this.num1 += i;
      this.list =[]
      this.visible = false;
    },
    // pop的选择框右侧确定
    showtable1() {
      this.list.map(item => {
        this.leftfields.splice(item, 1);
        this.rigthfields.push(this.Allfields[item])
      });
      console.log(this.leftfields);
      this.list =[]
      this.visible1 = false;
    },
    // pop的选择框左侧
    checktype(item, index) {
      console.log(item);
      console.log(index);
      if (this.list.indexOf(index) === -1) {
        this.list.push(index);
      } else {
        this.list = this.list.filter(item1 => {
          return item1 !== index;
        });
      }
      console.log(this.list);
      // if (JSON.stringify(this.list).indexOf(JSON.stringify(item)) === -1){
      //   item.index = index
      //   this.list.push(item)
      // }else {
      //   this.list = this.list.slice(0,1)
      // }
      // console.log(this.list);
    },
    // pop的选择框右侧
    checktype1(item, index) {
      console.log(item);
      if (this.list.indexOf(index) === -1) {
        this.list.push(index);
      } else {
        this.list = this.list.filter(item1 => {
          return item1 !== index;
        });
      }
      console.log(this.list);
    },
    //设置按钮
    // couponClick(index, row) {
    //   console.log(row);
    // },
    handleSelectionChange() {},
    //头部过滤
    filtertype(item1) {
      console.log(item1.name);
      this.Offerlist = this.maxOfferlist.filter(item => {
        return JSON.stringify(item).indexOf(item1.name) !== -1;
      });
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
      .req("api/OfferAdministration")
      .then(res => {
        console.log(res);
        this.Offerlist = res.data.data;
        this.maxOfferlist = res.data.data;
        //应该有更方便的做法
        // let group = _.groupBy(this.maxOfferlist, "已发");
        // console.log(group);
        let i = 0;
        this.maxOfferlist.map(item => {
          if (item.Approval === "待发offer") {
            i++;
          }
        });
        this.cardtitle[0].num = i;
        this.leftfields = this.Allfields.slice(0, 9);
        this.rigthfields = this.Allfields.slice(9, this.Allfields.length);
        // localStorage.setItem("Allfields",this.cardtitle)
      })
      .catch(e => {
        console.log(e);
      });
  },
  created() {},
  filters: {},
  computed: {
    //控制左右不同时显示
    visibletype() {
      return this.visible;
    },
    visibletype1() {
      return this.visible1;
    }
  },
  watch: {
    visibletype(val, oldval) {
      if (oldval === false) {
        this.visible1 = false;
      }
    },
    visibletype1(val, oldval) {
      if (oldval === false) {
        this.visible = false;
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
  margin: 30px;
}
header div:first-child {
  font-size: 20px;
  font-weight: bold;
}
.imgstyle {
  vertical-align: middle;
}
.el-button_ {
  display: flex;
  justify-content: space-around;
}
</style>
