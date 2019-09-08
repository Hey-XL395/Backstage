let time = new Date();
let Hello = "";
let time1 = time.getHours();
if (time1 >= 0 && time1 < 6) {
  Hello = "半夜好";
}
if (time1 >= 6 && time1 < 12) {
  Hello = "上午好";
}
if (time1 >= 12 && time1 < 14) {
  Hello = "中午好";
}
if (time1 >= 14 && time1 < 19) {
  Hello = "下午好";
}
if (time1 >= 19 && time1 <= 24) {
  Hello = "晚上好";
}
module.exports = {
  menu: {
    home: "首页",
    Welcome: "欢迎",
    to: "来到小爱同学后台管理系统",
    Dear: "亲爱的",
    hello: Hello
  },
  content: {
    home: "首页",
    Schedule: "日程管理",
    Maillist: "通讯录",
    Organizeemployees: "组织员工",
    form: "表单页",
    offer: "offer管理",
    peoplemessage: "人员信息",
      salarymanagement: "薪酬管理",
    Distributionform: "分布表单"
  }
};
