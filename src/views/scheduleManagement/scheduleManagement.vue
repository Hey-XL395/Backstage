<template
  ><div class="scheduleManagement">
    <lunar-full-calendar
      :events="events"
      :config="config"
    ></lunar-full-calendar>
    <el-dialog title="日程" :visible.sync="dialogVisible" width="50%">
      <!--        :before-close="handleClose"-->
      <div>
        <el-input v-model="input" placeholder="准备做点什么..."></el-input>
      </div>
      <br />
      <div>
        时间：
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
        >
        </el-time-select
        >~
        <el-time-select
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
        >
        </el-time-select>
      </div>
      <br />
      <div>
        参与人：<span v-for="item in username"> {{ item }} </span>
        <el-popover placement="bottom" width="200" v-model="visible">
          <el-input
            v-model="inputname"
            placeholder="请输入参与人姓名"
          ></el-input>
          <div style="text-align: right; margin: 0">
            <br />
            <el-button type="primary" size="mini" @click="visible = false"
              >确定</el-button
            >
          </div>
          <i class="el-icon-circle-plus-outline" slot="reference"></i>
        </el-popover>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addschedule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { LunarFullCalendar } from "vue-lunar-full-calendar";
export default {
  name: "scheduleManagement",
  components: {
    LunarFullCalendar
  },
  props: {},
  data() {
    return {
      input: "", //日程内容
      clickday: "", //用户选中的时间
      nowday: "", //当前时间
      username: [], //相关人
      startTime: "", //开始时间
      visible: false, //小对话框
      inputname: "", //小对话框内容
      endTime: "", //结束时间
      dialogVisible: false,
      events: [
        {
          title: "事件内容", // 事件内容
          start: "2019-09-11 09:00", // 事件开始时间
          end: "2019-09-11 12:00", // 事件结束时间
          color: "rgba(9, 9, 9, 0.2)" // 事件的显示颜色
        }
      ],
      config: {
        buttonText: { today: "今天", month: "月", week: "周", day: "日" },
        locale: "zh-cn",
        editable: false, //是否允许修改事件
        selectable: false,
        eventLimit: 4, //事件个数
        allDaySlot: false, //是否显示allDay
        defaultView: "month", //显示默认视图
        eventClick: this.eventClick, //点击事件
        dayClick: this.dayClick //点击日程表上面某一天
      }
    };
  },
  methods: {
    addname() {
      this.visible = true;
    },
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    //添加日程
    addschedule() {
      if (this.startTime === "" || this.startTime === "" || this.input === "") {
        this.$message({
          message: "数据未填完",
          type: "warning"
        });
      } else {
        this.dialogVisible = false;
        this.clickday = this.$moment(this.clickday).format("YYYY-MM-DD"); // 获得点中日期，处理拼接，时间选择器无日期
        // 添加空格
        let startTime = this.clickday+' '+this.startTime
        let endTime = this.clickday+' '+this.endTime
        //发布日程
        this.$axios
          .req("api/calendar", {
            users: this.username,
            startTime: startTime,
            endTime: endTime,
            schedule: this.input
          })
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    // 点击当天
    dayClick(day, jsEvent) {
      // console.log(jsEvent);
      console.log(day);
      //处理成纯数字好比较大小，排除时分秒干扰
      this.clickday = this.$moment(day._i).format("YYYYMMDD");
      this.nowday = this.$moment(Date().now).format("YYYYMMDD");
      if (this.clickday < this.nowday) {
        this.$message({
          message: "今天之前日程无法添加",
          type: "warning"
        });
      } else {
        this.dialogVisible = true;
      }
    }
  },
  mounted() {
    this.username.push(localStorage.getItem("user"));
    //获取全部日程
    this.$axios
      .req("api/calendar")
      .then(res => {
        console.log(res);
        res.data.data.map(item=>{
          this.$set(item,"color","rgba(9, 9, 9, 0.2)")
          this.$set(item,"title",item.schedule)
          this.$set(item,"start",this.$moment(item.startTime).format("YYYY-MM-DD hh:mm"))
          this.$set(item,"end",this.$moment(item.endTime).format("YYYY-MM-DD hh:mm"))
        })
        this.events = res.data.data
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

<style scoped lang="scss"></style>
