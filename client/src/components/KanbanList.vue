<template>
  <div class="KanbanPage">
    <div class="KanbanHead">
      <KanbanHead></KanbanHead>
    </div>
    <div class="KanbanList">
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      ></KanbanCard>
    </div>
  </div>
</template>

<script>
import KanbanHead from "./KanbanHead";
import KanbanCard from "./KanbanCard";

export default {
  name: "KanbanList",
  components: {
    KanbanHead,
    KanbanCard,
  },
  props: ["tasks"],
};
</script>

<style scoped>
.KanbanPage {
  padding: 140px 60px 0;
  margin: 0 10px 0;
}

.KanbanList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 50px;
}
</style>
