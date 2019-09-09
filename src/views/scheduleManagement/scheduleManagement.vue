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
        参与人：{{ username }}
        <el-popover placement="bottom" width="200" v-model="visible">
          <el-input v-model="inputname" placeholder="请输入参与人姓名"></el-input>
          <div style="text-align: right; margin: 0">
              <br>
            <el-button type="primary" size="mini" @click="visible = false"
              >确定</el-button
            >
          </div>
          <i class="el-icon-circle-plus-outline" slot="reference"></i>
        </el-popover>
      </div>
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
import { LunarFullCalendar } from "vue-lunar-full-calendar";
export default {
  name: "scheduleManagement",
  components: {
    LunarFullCalendar
  },
  props: {},
  data() {
    return {
      input: "",
      username: "",
      startTime: "",
      visible: false, //小对话框
      inputname: "",//小对话框内容
      endTime: "", //时间
      dialogVisible: false,
      events: [
        {
          title: "事件内容1", // 事件内容
          start: "2019-09-11 09:00:00", // 事件开始时间
          end: "2019-09-11 12:00:00", // 事件结束时间
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
    // 点击事件
    eventClick(event, jsEvent, pos) {
      console.log("eventClick", event, jsEvent, pos);
    },
    // 点击当天
    dayClick(day, jsEvent) {
      // console.log(jsEvent);
      console.log(day);
      let oldday = this.$moment(day._i).format("YYYYMMDD");
      let nowday = this.$moment(Date().now).format("YYYYMMDD");
      if (oldday < nowday) {
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
    this.username = localStorage.getItem("user");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
