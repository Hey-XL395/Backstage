const Mock = require("mockjs");
// 生成侧边栏新通知
Mock.mock("api/getnew", "get", {
  code: 200,
  msg: "success",
  "data|8": [
    {
      shownew: "@boolean",
      text: "@cparagraph(2)"
    }
  ]
});
//生成头部数量
Mock.mock("api/price", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      id: "@increment(1)",
      price: "@integer(1000, 1000000)",
      value: "@integer(0, 100)"
    }
  ]
});
//生成城市
Mock.mock("api/city", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      city: "@city()", //随即城市
      "num|100-1000": 1000, //随机数字
      color: "@color()" //随机颜色
    }
  ]
});
//生成姓名
Mock.mock("api/name", "get", {
  code: 200,
  msg: "success",
  "data|14": [
    {
      name: "@cname()" //随机姓名
    }
  ]
});
//生成表格数据
Mock.mock("api/frommsg", "get", {
  code: 200,
  msg: "success",
  "data|30": [
    {
      name: "@cname()", //随机姓名
      askname:"@cword(5)",//问卷描述
      olddate: "@date()", //随机时间
      newdate: "@date()",
      "topic|1": ["未发布", "已发布", "已截止"],
      "websiteName|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});
// 输出结果
