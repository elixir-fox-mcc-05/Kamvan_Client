<template>
  <div class="container">
    <Navbar :statusLogin="statusLogin"></Navbar>
    <LoginPage :statusLogin="statusLogin"></LoginPage>
    <AddTaskForm
      :formToogle="formToogle"
      @addTask="addTask"
      @addBtn="addBtn"
    ></AddTaskForm>
    <UpdateTask :updateToogle="updateToogle"></UpdateTask>
    <DetailTask
      :detailToogle="detailToogle"
      @detailBtn="detailBtn"
      :detailData="detailData"
      @fetchTasks="fetchTasks"
    >
    </DetailTask>
    <div class="listContainer">
      <KanbanList
        v-for="(category, i) in categories"
        :key="i"
        :category="category"
        :tasks="tasks"
        @addBtn="addBtn"
        @detailBtn="detailBtn"
        @updateBtn="updateBtn"
      ></KanbanList>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import AddTaskForm from './components/AddTaskForm';
import KanbanList from './components/KanbanList';
import DetailTask from './components/DetailTask';
import UpdateTask from './components/UpdateTask';
import LoginPage from './components/LoginPage';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      // isLogin: '',
      statusLogin: false,
      tasks: [],
      categories: ['Back-Log', 'Todo', 'Doing', 'Done'],
      formToogle: false,
      detailToogle: false,
      updateToogle: false,
      detailData: {},
    };
  },
  components: {
    Navbar,
    AddTaskForm,
    KanbanList,
    DetailTask,
    UpdateTask,
    LoginPage,
  },
  methods: {
    showLogin() {
      this.statusPage = 'logout';
    },
    showRegister() {
      this.statusPage = 'register';
    },
    logout() {
      localStorage.clear();
      // this.isLogin = false;
      this.statusPage = 'logout';
    },
    // changeLogin(input) {
    //   this.isLogin = input;
    //   this.fetchTask();
    //   this.statusPage = 'kanbanList';
    //   this.checkLogin();
    // },
    filterTheTask(data) {
      this.filterTask = data;
    },
    fetchTasks() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/tasks',
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTask(taskData) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/tasks',
        data: {
          id: taskData.id,
          category: taskData.category,
          title: taskData.title,
          desc: taskData.desc,
          UserId: taskData.UserId,
        },
      })
        .then(({ data }) => {
          this.tasks.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addBtn() {
      this.formToogle = !this.formToogle;
    },
    detailBtn(data) {
      this.detailToogle = !this.detailToogle;
      this.detailData = data;
    },
    updateBtn() {
      this.updateToogle = !this.updateToogle;
    },
    loginBtn(){
      this.statusPage = 'login'
    }
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.addFormContainer {
  padding: 140px 0 0;
  display: flex;
  justify-content: center;
}
.listContainer {
  padding: 150px 70px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
