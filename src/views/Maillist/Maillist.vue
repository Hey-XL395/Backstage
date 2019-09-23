<template>
  <div>
    <div class="Maillist">
      <div class="leftmsg">
        <el-tree
          :data="asidelist"
          :props="defaultProps"
          @node-click="handleNodeClick"
          class="_style_i"
        ></el-tree>
      </div>
      <div class="rightmsg">
        <div
          v-for="(item, index) in maillist.slice((val1 - 1) * val, val * val1)"
          :key="item.id"
          class="box-div"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div>
                <div :style="{ background: item.color }" class="topbac">
                  <div class="topbacname">{{ item.name }}</div>
                </div>
              </div>
              <div class="rigthtag">
                <div>{{ item.name }}</div>
                <div>{{ item.department }}/{{ item.position }}</div>
                <span v-for="(item1, index1) in item.tag.tag" class="tagstyl"
                  ><span
                    class="texttext"
                    :style="{ background: item.tag.color[index1] }"
                    v-if="item1"
                    >{{ item1 }}</span
                  ></span
                >
                <span
                  v-if="
                    item.tag.tag[0] === '' &&
                      item.tag.tag[1] === '' &&
                      item.tag.tag[2] === ''
                  "
                  >什么标签都没有，快去给他添加一个吧</span
                >
              </div>
            </div>
            <div class="msgmsg">
              <div>邮箱：{{ item.email }}</div>
              <div>办公电话：{{ item.telphone }}</div>
              <div>手机号码：{{ item.phone }}</div>
              <div>性别：{{ item.sex }}</div>
              <div>qq：{{ item.qq }}</div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 60]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="maillist.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import asidelist from "../../mockjs/tree";
export default {
  name: "Maillist",
  components: {},
  props: {},
  data() {
    return {
      val: 10,
      val1: 1,
      currentPage: 1,
      asidelist: asidelist.data,
      maillist: [],
      alllist: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      if (!data.children) {
        this.maillist = this.alllist.filter(item => {
          return item.department === data.label;
        });
      }
      if (data.label === "区域中心") {
        this.maillist = this.alllist;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.val = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.val1 = val;
    }
  },
  mounted() {
    this.$axios
      .req("api/maillist")
      .then(res => {
        this.maillist = res.data.data;
        this.alllist = res.data.data;
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
.Maillist {
  display: flex;
  justify-content: space-around;
  align-items:flex-start;
}
.leftmsg {
  width: 20%;
  font-size: 20px;
  margin: 10px 0;
}

.rightmsg {
  width: 80%;
  background: #f0f2f5;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  display: flex;
  align-items: center;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
.rightmsg {
  display: flex;
  flex-wrap: wrap;
}
.box-div {
  width: 32%;
  margin: 10px;
}
.topbac {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}
.rigthtag {
  margin-left: 20px;
}
.rigthtag div:first-child {
  font-size: 20px;
}
.rigthtag div {
  line-height: 30px;
}
.topbacname {
  width: 60px;
  position: absolute;
  text-align: center;
  left: 50%;
  line-height: 80px;
  transform: translateX(-50%);
}
.msgmsg {
  margin: 10px 20px;
}
.tagstyl {
  margin-right: 10px;
}
.texttext {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 50px;
  color: white;
}
.block {
  margin-left: 20%;
}
</style>
