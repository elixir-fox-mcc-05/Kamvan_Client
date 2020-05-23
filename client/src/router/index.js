import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Missing from "../components/Missing.vue";
import Dashboard from "../views/Dashboard.vue";
import AddTask from "../components/AddTask.vue";
import DetailTask from "../components/DetailTask.vue"
import UpdateTask from "../components/UpdateTask.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/add-task",
    name: "AddTask",
    component: AddTask
  },
  {
    path: "/detail-task/:id",
    name: "DetailTask",
    component: DetailTask
  },
  {
    path: "/update-task/:id",
    name: "UpdateTask",
    component: UpdateTask
  },
  {
    path: "*",
    component: Missing
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;