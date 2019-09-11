import Vue from "vue";
import Router from "vue-router";
import Content from "./views/Content/Content";
import Home from "./views/Home/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Content,
      children: [
        {
          path: "",
          component: Home,
          meta: {
            title: "首页"
          }
        }
      ]
    },
    {
      path: "/Land",
      name: "Land",
      component: () => import("./views/Land/Land.vue"),
      meta: {
        title: "登陆"
      }
    },
    {
      path: "/Registrazione",
      name: "Registrazione",
      component: () => import("./views/Registrazione/Registrazione.vue"),
      meta: {
        title: "注册"
      }
    },
    {
      path: "/Getpassword",
      name: "Getpassword",
      component: () => import("./views/Getpassword/Getpassword.vue"),
      meta: {
        title: "找回密码"
      }
    },
    {
      path: "/scheduleManagement",
      name: "scheduleManagement",
      component: Content,
      children: [
        {
          path: "",
          component: () =>
            import("./views/scheduleManagement/scheduleManagement.vue"),
          meta: {
            title: "日程管理"
          }
        }
      ]
    },
    {
      path: "/Maillist",
      name: "Maillist",
      component: Content,
      children: [
        {
          path: "",
          component: () => import("./views/Maillist/Maillist.vue"),
          meta: {
            title: "通讯录"
          }
        }
      ]
    },
    {
      path: "/OfferAdministration",
      name: "OfferAdministration",
      component: Content,
      children: [
        {
          path: "Organizationalpersonnel",
          component: () =>
            import("./views/OfferAdministration/OfferAdministration.vue"),
          meta: {
            title: "offer管理",
            maxtitle:"组织员工"
          }
        }
      ]
    },
    {
      path: "/PersonnelInformation",
      name: "PersonnelInformation",
      component: Content,
      children: [
        {
          path: "Organizationalpersonnel",
          component: () =>
            import("./views/PersonnelInformation/PersonnelInformation.vue"),
          meta: {
            title: "人员信息",
            maxtitle:"组织员工"
          }
        }
      ]
    },
    {
      path: "/Classificationform",
      name: "Classificationform",
      component: Content,
      children: [
        {
          path: "From",
          component: () =>
            import("./views/Classificationform/Classificationform.vue"),
          meta: {
            title: "分布表单",
            maxtitle:"表单页"
          }
        }
      ]
    },
    {
      path: "/SalaryManagement",
      name: "SalaryManagement",
      component: Content,
      children: [
        {
          path: "Organizationalpersonnel",
          component: () =>
            import("./views/SalaryManagement/SalaryManagement.vue"),
          meta: {
            title: "薪酬管理",
            maxtitle:"组织员工"
          }
        }
      ]
    }
  ]
});
export default router;
