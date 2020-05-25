import Vue from "vue";
import VueRouter from "vue-router";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
// import Missing from "../components/Missing.vue";
import Dashboard from "../views/Dashboard.vue";
// // dashboard children
import AddTask from "../components/AddTask.vue";
import DetailTask from "../components/DetailTask.vue";
import UpdateTask from "../components/UpdateTask.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/addtask",
    name: "AddTask",
    component: AddTask,
  },
  {
    path: "/detail-task/:id",
    name: "DetailTask",
    component: DetailTask,
  },
  {
    path: "/update-task/:id",
    name: "UpdateTask",
    component: UpdateTask
  }
//   {
//     path: "*",
//     component: Missing,
//   },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
