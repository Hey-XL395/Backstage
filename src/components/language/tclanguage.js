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
    home: "首頁",
    Welcome: "歡迎",
    to: "來到小愛同學後臺管理系統",
    Dear: "親愛的",
    hello: Hello
  },
  content: {
    home: "首頁",
    Schedule: "日程管理",
    Maillist: "通訊錄",
    Organizeemployees: "組織員工",
    form: "表單頁",
    offer: "offer管理",
    peoplemessage: "人員信息",
    salarymanagement: "薪酬管理",
    Distributionform: "分布表單"
  }
};
