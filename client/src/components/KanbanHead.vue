<template>
  <div class="headContainer">
    <div class="head1">
      <div class="KanbanTitle">
        <p class="title">Back-Log</p>
      </div>
      <div class="KanbanAdd KanbanAdd1">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="head2">
      <div class="KanbanTitle">
        <p class="title">Todo</p>
      </div>
      <div class="KanbanAdd KanbanAdd2">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="head3">
      <div class="KanbanTitle">
        <p class="title">Doing</p>
      </div>
      <div class="KanbanAdd KanbanAdd3">
        <i class="fas fa-plus"></i>
      </div>
    </div>
    <div class="head4">
      <div class="KanbanTitle">
        <p class="title">Done</p>
      </div>
      <div class="KanbanAdd KanbanAdd4">
        <i class="fas fa-plus"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KanbanHead',
};
</script>

<style>
.headContainer {
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0;
}

/* title */
.KanbanTitle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 40px;
  color: #424242;
}

/* add */
.KanbanAdd {
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



.KanbanAdd2 {
  background-color: #a6b4ff;
}
.KanbanAdd2:hover {
  background-color: #909ce2;
}

.KanbanAdd3 {
  background-color: #efde44;
}

.KanbanAdd3:hover {
  background-color: #daca3e;
}

.KanbanAdd4 {
  background-color: #52ef44;
}

.KanbanAdd4:hover {
  background-color: #52ef44;
}
</style>
