<template>
  <div class="container">
    <div
      class="allCard"
      v-for="(category, i) in categoryList"
      :key="i"
      :category="category"
    >
      <div class="head">
        <div :style="{ background: category[1] }" class="circle"></div>
        <h1 class="title">{{ category[0] }}</h1>
      </div>
      <router-link to="/add-task">
        <div class="KanbanAdd">
          <i class="fas fa-plus"></i>
        </div>
      </router-link>
      <div class="KanbanList">
        <KanbanCard :category="category"></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from "../components/KanbanCard";
export default {
  name: "KanbanList",
  components: {
    KanbanCard
  },
  methods: {
    detailBtn() {
      this.$emit("detailBtn");
    }
  },
  data() {
    return {
      categoryList: [
        ["Back-Log", "#FCB4C0"],
        ["To-Do", "#ADE3F8"],
        ["Doing", "#FFEE56"],
        ["Done", "#52ef44"]
      ]
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  padding: 20px;
  justify-content: space-between;
}
.allCard {
  display: flex;
  flex-direction: column;
}
.head {
  display: flex;
  justify-content: center;
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
  font-size: 20px;
  color: #424242;
}
.KanbanAdd {
  background: white;
  width: 22vw;
  padding: 4px 0;
  color: #424242;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.068);
}
</style>
