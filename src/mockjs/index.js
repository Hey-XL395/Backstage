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
      "num|1-100": 100, //随机数字
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
      askname: "@cword(4,5)", //问卷描述
      olddate: "@date()", //随机时间
      newdate: "@date()",
      "topic|1": ["未发布", "已发布", "已截止"],
      "websiteName|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});
//通讯录
Mock.mock("api/maillist", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      id: "'@increment", //id从0-200
      name: "@cname()", //2到4的姓名
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, //电话
      telphone: /\d{3}-\d{8}|\d{4}-\d{7}/, //座机
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/, //邮箱
      qq: /^[1-9][0-9]{4,10}$/, //qq
      tag: {
        tag: ["@cword(0,3)", "@cword(0,3)", "@cword(0,3)"],
        color: ["@color()", "@color()", "@color()"]
      }, //生成文字标签
      "position|1": ["经理", "主管", "员工", "实习生"], //职位
      color: "@color()", //头像图片随机颜色
      cardid: "@id()", //身份证
      "sex|1": ["男，女"], //性别
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ] //部门
    }
  ]
});
//生成offer信息OfferAdministration
Mock.mock("api/OfferAdministration", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cname()", //随机姓名
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/, //电话
      telphone: /\d{3}-\d{8}|\d{4}-\d{7}/, //座机
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/, //邮箱
      qq: /^[1-9][0-9]{4,10}$/, //qq
      id: "'@increment", //id从0-200
      cardid: "@increment", //身份证号码
      cardidtype: "@cword(2,4)", //证件类型随机几个字
      "num|1-10000": 10000, //工号
      birth: "@date()", //随机时间出生
      Entrytime:"@date()",//入职时间
      "age|18-60": 60, //随机数字年龄
      city: "@city()", //随机城市工作
      Nation:"@cword(2,4)",//民族
      Nativeplace:"@county(true)",//出生城市
      "Approval|1":["待发offer", "已发", "已接受", "已拒绝", "已入职"],//审批状态
      "study|1": ["初中", "高中", "大专", "本科", "硕士", "博士", "博士以上"], //学历
      "marriagetype|1": ["已婚","未婚"], //婚姻状况
      "position|1": ["经理", "主管", "员工", "实习生"], //职位
      "sex|1": ["男","女"], //性别
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ] //部门
    }
  ]
});
//生成人员信息
Mock.mock("api/PersonnelInformation", "get", {
  code: 200,
  msg: "success",
  "data|200": [
    {
      name: "@cname()", //随机姓名
      flag:"@boolean",
      startdate: "@date()", //随机开始时间
      enddate: "@date()", //随机结束时间
      maxdepartment:"区域中心",//机构
      "position|1": ["经理", "主管", "员工", "实习生"], //职位
      "id|1000-9999": 9999, //工号
      "type|1": ["审核未通过", "审核中", "审核通过"],
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ] //部门
    }
  ]
});
//生成薪酬数据
Mock.mock("api/Salary", "get", {
  code: 200,
  msg: "success",
  "data|3": [
    {
      Salary: "@cword(2,5)", //薪资构成
      "expenditure|0-1000000": 1000000, //计划支出
      "Actual|0-1000000": 1000000,//实际支出
      "Lastmonth|0-1000000": 1000000, //上月支出
      "LastmonthActual|0-1000000": 1000000, //上月支出

    }
  ]
});
