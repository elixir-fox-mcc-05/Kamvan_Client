<template>
  <div class="container">
    <div class="head">
      <div :style="{ 'background-color': colorTheme }" class="circle"></div>
      <h1 class="title">{{ category }}</h1>
    </div>
    <div class="KanbanAdd">
      <i class="fas fa-plus"></i>
    </div>
    <div class="KanbanList">
      <KanbanCard
        v-for="(task, i) in taskList"
        :key="i"
        :task="task"
        :category="category"
      ></KanbanCard>
    </div>
  </div>
  
</template>

<script>
import KanbanCard from './KanbanCard';

export default {
  name: 'KanbanList',
  components: {
    KanbanCard,
  },
  computed: {
    taskList() {
      let data = [];
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].category == this.category) {
          data.push(this.tasks[i]);
        }
      }
      return data;
    },
    colorTheme() {
      switch (this.category) {
        case 'Back-Log':
          return '#ff6161';
        case 'Todo':
          return '#a6b4ff';
        case 'Doing':
          return '#efde44';
        case 'Done':
          return '#52ef44';
      }
    },
  },
  props: ['category', 'tasks'],
};
</script>

<style scoped>

.head {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px 20px;
}

.circle {
  margin-right: 10px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.title {
  font-weight: bold;
  font-size: 30px;
  color: #424242;
}

.KanbanAdd {
  background: white;
  width: 22vw;
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  padding: 15px 0 15px;
  color: #424242;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.068);
}

.KanbanList {
/* display: flex; */
/* flex-wrap: wrap; */
/* justify-content: flex-start; */
/* padding-bottom: 50px; */
/* flex-direction: column; */
/* background: crimson; */
}
</style>
