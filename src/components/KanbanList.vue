<template>
  <div>
    <div class="container">
      <div
        class="allCard"
        v-for="(category, i) in categoryList"
        :key="i"
      >
        <div class="head">
          <h1 :style="{ background: category[1] }" class="title">{{ category[0] }}</h1>
        </div>
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
  data() {
    return {
      categoryList: [
        ["Back-Log", "#FF0000"],
        ["To-Do", "#FFA500"],
        ["Doing", "#0000FF"],
        ["Done", "#008000"]
      ]
    };
  }
};
</script>

<style></style>
