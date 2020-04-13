<template>
  <div class="OfferAdministration">
    <header>
      <div>
        <img src="../../assets/文件.png" alt="" class="imgstyle" />offer管理
      </div>
      <div>
<!--        <el-button type="primary">新建offer</el-button-->
<!--        ><el-button type="primary">转移状态</el-button-->
<!--        >-->
<!--        <el-button type="primary">导出</el-button>-->
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
            fit
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column
              v-for="item in leftfields"
              :prop="item.prop"
              :label="item.label"
              :width="width"
              header-align="center"
              align="center"
            >
            </el-table-column>
            <el-table-column header-align="center" align="center">
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
                        width="100"
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
                            v-model="item.flag"
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
                        width="100"
                        trigger="click"
                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
                        v-model="visible1"
                      >
                        <div v-for="(item, index) in leftfields" :key="item.id">
                          <el-checkbox
                            :label="item.label"
                            @change="checktype1(item, index)"
                            v-model="item.flag"
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
                      <span v-for="(item,index) in size" :class="{color:index === index1}" @click="sizewidth(index)">{{ item }}</span>
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
      size: ["紧凑", "适中", "宽松"],
      index1:0,//动态class
      width:180,
      visible: false, //右侧的两个pop
      visible1: false,
      val: 1,
      val1: 30,
      Allfields: [
        { prop: "name", label: "姓名", flag: false },
        { prop: "email", label: "个人邮箱", flag: false },
        { prop: "cardidtype", label: "证件类型", flag: false },
        { prop: "cardid", label: "证件号码", flag: false },
        { prop: "sex", label: "性别", flag: false },
        { prop: "position", label: "职位", flag: false },
        { prop: "Nativeplace", label: "籍贯", flag: false },
        { prop: "qq", label: "qq", flag: false },
        { prop: "Entrytime", label: "入职时间", flag: false },
        { prop: "Approval", label: "offer状态", flag: false },
        { prop: "birth", label: "出生日期", flag: false },
        { prop: "Nation", label: "民族", flag: false },
        { prop: "telphone", label: "电话", flag: false },
        { prop: "study", label: "学历", flag: false },
        { prop: "phone", label: "手机", flag: false },
        { prop: "city", label: "工作地点", flag: false },
        { prop: "department", label: "部门", flag: false },
        { prop: "marriagetype", label: "婚姻状况", flag: false }
      ],
      leftfields: [], //左侧标题数量数据以及最右侧pop
      arr: [], //同上中间数组
      rigthfields: [], //右侧pop标题数量数据
      currentPage: 1,
      Offerlist: [],
      maxOfferlist: [], //大的
      cardtitle: [
        { name: "待发offer", num: 0 },
        { name: "已发", num: 0 },
        { name: "已接受", num: 0 },
        { name: "已拒绝", num: 0 },
        { name: "已入职", num: 0 }
      ], //卡片头
      num: 2, //上述对应有几个
      num1: 9 //默认显示9个标题
    };
  },
  methods: {
    sizewidth(index){
      this.index1 = index
      //console.log(index);
      if (index === 0) this.width = 180
      if (index === 1) this.width = 190
      if (index === 2) this.width = 210
      //console.log(this.width);
    },
    //处理左右数据，该显示什么确定按钮
    showtable() {
      this.visible = false;
      // this.leftfields = this.leftfields.concat(this.arr)
      this.arr.map(item => {
        this.leftfields.push(item);
        // 过滤掉当前已添加的
        this.rigthfields = this.rigthfields.filter(item1 => {
          return JSON.stringify(item1) !== JSON.stringify(item);
        });
      });
    },
    // pop的选择框右侧确定
    showtable1() {
      this.visible1 = false;
      // this.rigthfields = this.rigthfields.concat(this.arr)
      this.arr.map(item => {
        this.rigthfields.push(item);
        this.leftfields = this.leftfields.filter(item1 => {
          return JSON.stringify(item1) !== JSON.stringify(item);
        });
      });
    },
    // pop的选择框左侧
    checktype(item, index) {
      // //console.log(item);
      if (item.flag) {
        this.arr.push(item);
      } else {
        this.arr = this.arr.filter(item1 => {
          return JSON.stringify(item1) !== JSON.stringify(item);
        });
      }
      //console.log(this.arr);
    },
    // pop的选择框右侧
    checktype1(item, index) {
      // //console.log(item);
      if (item.flag) {
        this.arr.push(item);
      } else {
        this.arr = this.arr.filter(item1 => {
          return JSON.stringify(item1) !== JSON.stringify(item);
        });
      }
      // //console.log(this.arr);
    },
    //设置按钮
    // couponClick(index, row) {
    //   //console.log(row);
    // },
    handleSelectionChange() {},
    //头部过滤
    filtertype(item1) {
      // //console.log(item1.name);
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
        // //console.log(res);
        this.Offerlist = res.data.data;
        this.maxOfferlist = res.data.data;
        let group = _.groupBy(this.maxOfferlist, "Approval");
        this.cardtitle[0].num = group["待发offer"].length;
        this.cardtitle[1].num = group["已发"].length;
        this.cardtitle[2].num = group["已接受"].length;
        this.cardtitle[3].num = group["已拒绝"].length;
        this.cardtitle[4].num = group["已入职"].length;
        this.leftfields = this.Allfields.slice(0, 9);
        this.rigthfields = this.Allfields.slice(9, this.Allfields.length);
        // localStorage.setItem("Allfields",this.cardtitle)
      })
      .catch(e => {
        //console.log(e);
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
        // 显示pop将所有对勾去掉
        this.leftfields.map(item => {
          item.flag = false;
        });
        this.rigthfields.map(item => {
          item.flag = false;
        });
        this.arr = [];
      }
    },
    visibletype1(val, oldval) {
      if (oldval === false) {
        this.visible = false;
        this.rigthfields.map(item => {
          item.flag = false;
        });
        this.leftfields.map(item => {
          item.flag = false;
        });
        this.arr = [];
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
  .color {
    color: #1a83e2;
  }
</style>
