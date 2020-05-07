<template>
  <div class="container">
    <Navbar></Navbar>
    <!-- <LoginPage></LoginPage> -->
    <div class="listContainer">
      <KanbanList
        v-for="(category, i) in categories"
        :key="i"
        :category="category"
        :tasks="tasks"
      ></KanbanList>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import KanbanList from './components/KanbanList';
import LoginPage from './components/LoginPage';
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      tasks: [],
      categories: ['Back-Log', 'Todo', 'Doing', 'Done'],
    };
  },
  components: {
    Navbar,
    KanbanList,
    LoginPage,
  },
  methods: {
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
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.listContainer {
  padding: 150px 70px 100px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>
