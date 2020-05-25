import Vue from "vue";
import Vuex from "vuex";
import server from "../api/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignin: false,
    taskList: [],
    userLogin: {
      id: ""
    },
  },
  mutations: {
    SET_SIGNIN(state, payload) {
      state.isSignin = payload;
    },
    SET_TASKLIST(state, payload) {
      state.taskList = payload;
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
        .then((response) => {
          context.commit("SET_TASKLIST", response.data.tasks);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {},
});
