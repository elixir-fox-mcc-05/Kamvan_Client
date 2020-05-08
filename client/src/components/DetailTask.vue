<template>
  <div class="detailTaskPage" v-if="detailToogle">
    <div class="detailTaskGroup">
      <h3 class="closeDetail" @click="detailBtn">close</h3>
      <h1>Detail Task</h1>
      <div class="detailData">
        <p>Id Task: {{ detailData.id }}</p>
        <p>Status: {{ detailData.category }}</p>
        <p>Title: {{ detailData.title }}</p>
        <p>
          {{ detailData.desc }}
        </p>
      </div>
      <div class="buttonGroup">
        <button @click.prevent="deleteTask" class="delete">Delete</button>
        <button class="pindah">Pindah</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'detail',
  methods: {
    detailBtn() {
      this.$emit('detailBtn', this.taskId);
    },
    deleteTask() {
      axios({
        method: 'delete',
        url: `http://localhost:3000/tasks/${this.detailData.id}`,
      })
        .then(({ data }) => {
          this.$emit('fetchTasks');
          this.$emit('detailBtn');
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  props: ['detailToogle', 'tasks', 'detailData'],
};
</script>

<style scoped>
.detailTaskPage {
  height: 100vh;
  width: 100vw;
  padding: 25vh 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  background: rgba(54, 53, 75, 0.315);
  z-index: 120;
}

.closeDetail {
  display: flex;
  padding-left: 28vw;
  font-size: 22px;
  position: absolute;
  cursor: pointer;
  color: #313236b0;
}

.detailTaskGroup {
  width: 35vw;
  height: 55vh;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

h1 {
  color: #313236;
}

.detailData {
  display: block;
  width: 100%;
  padding: 0 20px 0;
  margin: 25px auto 0;
  text-align: center;
}

p {
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  color: #313236;
  margin-bottom: 20px;
  font-weight: bold;
}

.buttonGroup {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 130px;
  position: relative;
}

button {
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: #313236;
  font-size: 20px;
  cursor: pointer;
  z-index: 100;
}

.delete {
  background: #ff6161;
}

.update {
  background: #52ef44;
}

.pindah {
  background: #efde44;
}

button:focus {
  border: none;
  outline: none;
}
</style>
