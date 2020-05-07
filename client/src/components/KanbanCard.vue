<template>
  <div class="CardContainer">
    <div class="KanbanCard">
      <div class="title-card">{{ task.title }}</div>
      <p>{{ task.desc }}</p>
      <button :style="{ 'background-color': colorTheme }">
        See Detail
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KanbanCard',
  props: ['task', 'category'],
  computed: {
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

button {
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 20px;
  margin-top: 90px;
  color: #313236;
  font-size: 20px;
  cursor: pointer;
  /* position: fixed; */
  z-index: 100;
}

button:hover {
  background-color: white;
  border: 2px solid #64b5f6;
  color: #64b5f6;
}
</style>
