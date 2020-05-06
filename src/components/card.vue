<template>
    <div class="row" style=" justify-content: space-around; padding: 10px 30px;">
        <backlogs :backlogs="backlogs"></backlogs>
        <todos :todos="todos"></todos>
        <doing :doings="doings"></doing>
        <done :dones="dones"></done>
        <newTask></newTask>
    </div>
</template>

<script>
import backlogs from "./backlog";
import todos from "./todos";
import doing from "./doing";
import done from "./done";
import newTask from "./newTask/newTask";
export default {
    name : "card",
    components : {
        backlogs, todos, doing, done, newTask
    },
    props : [ "backlogs", "todos", "doings", "dones" ]
};
</script>

<style>

</style>