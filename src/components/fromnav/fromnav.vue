<template>
  <div class="fromnav">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网站问卷调查</span>
      </div>
      <div>
        <el-table ref="filterTable" :data="frommsg" style="width: 100%">
          <el-table-column
            prop="name"
            label="问卷名称"
            width="270"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="askname"
            label="问卷调查"
            width="270"
            header-align="center"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="olddate"
            label="创建时间"
            sortable
            header-align="center"
            align="center"
            width="270"
            column-key="olddate"
            :filters="timedate"
            :filter-method="filterHandler"
          >
          </el-table-column>
          <el-table-column
            prop="newdate"
            label="截止时间"
            sortable
            header-align="center"
            align="center"
            width="270"
            column-key="newdate"
            :filters="timedate1"
            :filter-method="filterHandler"
          >
          </el-table-column>

          <el-table-column
            prop="topic"
            label="问卷主题"
            width="270"
            header-align="center"
            align="center"
            :filters="[
              { text: '已截至', value: '已截至' },
              { text: '未发布', value: '未发布' },
              { text: '已发布', value: '已发布' }
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type === '未发布' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.topic }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="websiteName"
            label="网站名称"
            width="270"
            header-align="center"
            align="center"
            :filters="[
              { text: 'Github', value: 'Github' },
              { text: '掘金', value: '掘金' },
              { text: '百度', value: '百度' },
              { text: '豆瓣', value: '豆瓣' }
            ]"
            :filter-method="filterTag1"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
<!--              //自定义属性-->
              <el-tag :type="scope.row.type" disable-transitions>{{
                scope.row.websiteName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="270"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <el-button type="primary" @click="getmsg(scope)"
                >查看网站详情</el-button
              >
            </template></el-table-column
          >
        </el-table>
      </div>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="42%"
      :before-close="handleClose"
    >
      <span
        ><div class="topinp">
          <el-input v-model="input"></el-input>
          <button class="tag-read" :data-clipboard-text="input" @click="copy">
            复制地址
          </button>
        </div>
        <div class="textstyle">
          如无法使用上方复制按钮，请选中内容后，使用ctrl+c复制。也可扫描下方二维码或右键保存二维码进行访问。
        </div>
        <div class="code" v-show="dialogVisible"><QRCode :code="input"></QRCode></div
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "../../components/QRCode";
import Clipboard from "clipboard";
export default {
  name: "fromnav",
  components: {
    QRCode
  },
  props: {},
  data() {
    return {
      frommsg: [],
      timedate: [],
      timedate1: [],
      input: "",
      dialogVisible: false
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    copy() {
      var clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功",
          type: "success"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$message({
          message: "该浏览器不支持自动复制",
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    handleClose() {},
    getmsg(val) {
      this.dialogVisible = true;
      if (val.row.websiteName === "百度") {
        this.input = "https://www.baidu.com/";
      }
      if (val.row.websiteName === "豆瓣") {
        this.input = "https://www.douban.com/";
      }
      if (val.row.websiteName === "掘金") {
        this.input = "https://juejin.im/";
      }
      if (val.row.websiteName === "Github") {
        this.input = "https://github.com/";
      }
      // console.log(val.row);
    },
    filterTag(value, row) {
      return row.topic === value;
    },
    filterTag1(value, row) {
      return row.websiteName === value;
    },
    filterHandler(value, row, column) {
      // console.log(column);
      const property = column["property"];
      return row[property] === value;
    }
  },
  mounted() {
    this.$axios
      .req("api/frommsg")
      .then(res => {
        // console.log(res);
        this.frommsg = res.data.data;
        this.frommsg.map(item => {
          if (item.websiteName === "百度") {
            this.$set(item, "type", "success");
          }
          if (item.websiteName === "豆瓣") {
            this.$set(item, "type", "");
          }
          if (item.websiteName === "掘金") {
            this.$set(item, "type", "warning");
          }
          if (item.websiteName === "Github") {
            this.$set(item, "type", "danger");
          }
          //处理时间
          let one = JSON.parse(
            `{"text":"${item.olddate}","value":"${item.olddate}"}`
          );
          this.timedate.push(one);
          let two = JSON.parse(
            `{"text":"${item.newdate}","value":"${item.newdate}"}`
          );
          this.timedate1.push(two);
          // let result = old(开始时间装成数组).map((text,i) => ({text, value: old[i]}))
          // console.log(result);
        });
        console.log(this.timedate);
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
.box-card {
  width: 98%;
  margin: 0 auto;
  font-size: 20px;
}
.el-tabl {
  font-size: 20px;
}
.tag-read {
  width: 110px;
  background: #ff5309;
  border-radius: 3px;
  color: white;
  border: 0;
  padding: 10px;
  margin: 0 20px;
}
.topinp {
  display: flex;
  margin-left: 20px;
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
.textstyle {
  padding: 20px;
  background: #eeeeee;
  margin: 20px;
}
.code {
  margin: 0 auto;
  text-align: center;
}
</style>
