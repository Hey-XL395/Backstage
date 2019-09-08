let time = new Date();
let Hello = "";
let time1 = time.getHours();
if (time1 >= 0 && time1 < 6) {
  Hello = "Good midnight";
}
if (time1 >= 6 && time1 < 12) {
  Hello = "Good morning";
}
if (time1 >= 12 && time1 < 14) {
  Hello = "Good noon";
}
if (time1 >= 14 && time1 < 19) {
  Hello = "Good afternoon";
}
if (time1 >= 19 && time1 <= 24) {
  Hello = "Good evening";
}
module.exports = {
  menu: {
    home: "home",
    Welcome: "Welcome",
    to: "to Xiaoai Backstage Management System",
    Dear: "Dear",
    hello: Hello
  },
  content: {
    home: "Home",
    Schedule: "Schedule management",
    Maillist: "Maillist",
    Organizeemployees: "Organize employees",
    form: "from",
    offer: "offer management",
    peoplemessage: "people message",
    salarymanagement: "salary management",
    Distributionform: "Distribution form"
  }
};
