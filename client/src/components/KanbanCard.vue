<template>
  <div class="CardContainer">
    <div class="KanbanCard">
      <div class="title-card">{{ task.title }}</div>
      <p>{{ task.desc }}</p>
      <div class="buttonGroup">
        <button :style="{ 'background-color': colorTheme }" @click="detailBtn">
          Show Detail
        </button>
        <button @click.prevent="updateBtn" class="update">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'KanbanCard',
  methods: {
    detailBtn() {
      axios({
        method: 'get',
        url: `http://localhost:3000/tasks/${this.task.id}`,
      })
        .then(({ data }) => {
          this.$emit('detailBtn', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateBtn() {
      this.$emit('updateBtn');
    },
  },
  props: ['task', 'category', 'colorTheme'],
};
</script>

<style scoped>
.KanbanCard {
  background-color: white;
  height: 350px;
  width: 22vw;
  margin-top: 20px;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
  margin-bottom: 10px;
}

.title-card {
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  color: #424242;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 30px;
}

p {
  margin: 10px 0 10px;
  font-size: 20px;
}

.buttonGroup{
  display: flex;
  justify-content: space-between;
}

button {
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin-top: 110px;
  color: #313236;
  font-size: 20px;
  cursor: pointer;
  z-index: 100;
  position: inherit;
}

button:focus {
  outline: none;
}

.update{
  background: white;
  color: #313236;
  border: 1px solid #313236;;
}
</style>
