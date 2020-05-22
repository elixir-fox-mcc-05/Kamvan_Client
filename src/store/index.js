import Vue from "vue";
import Vuex from "vuex";
import server from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    taskList: [],
    myNotif: "",
    myError: "",
    userLogin: {},
    taskOneId: ""
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    SET_TASKLIST(state, payload) {
      state.taskList = payload;
    },
    SET_TASKONE_ID(state, payload) {
      state.taskOneId = payload
      // console.log(state.taskOne, "<+++++++++++<")
    },
    CHANGE_MYNOTIF(state, payload) {
      state.myNotif = payload;
    },
    CHANGE_MYERROR(state, payload) {
      state.myError = payload;
    },
    CHANGE_USERLOGIN(state, payload) {
      state.userLogin = payload;
    }
  },
  actions: {
    fetchTaskList(context) {
      server({
        method: "get",
        url: "/tasks",
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          context.commit("SET_TASKLIST", response.data.task);
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  modules: {}
});
