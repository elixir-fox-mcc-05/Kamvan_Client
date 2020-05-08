<template>
    <div v-if="loggedIn" class="row" style=" justify-content: space-around; padding: 10px 30px;">
        <backlogs :backlogs="backlogs"
                :message="message"
                @edit="edit"
                @deleteData="deleteData"
                @changeCategory="changeCategory"
        ></backlogs>
        <todos :todos="todos"
                @edit="edit"
                @deleteData="deleteData"
                @changeCategory="changeCategory"
        ></todos>
        <doing :doings="doings"
                @edit="edit"
                @deleteData="deleteData"
                @changeCategory="changeCategory"
        ></doing>
        <done :dones="dones"
                @edit="edit"
                @deleteData="deleteData"
        ></done>
    </div>
</template>

<script>
import backlogs from "./CardComponents/backlog";
import todos from "./CardComponents/todos";
import doing from "./CardComponents/doing";
import done from "./CardComponents/done";
export default {
    name : "card",
    components : {
        backlogs, todos, doing, done
    },
    props : [ "backlogs", "todos", "doings", "dones", "loggedIn", "message"],
    methods : {
        edit(data){
            this.$emit("edit", data)
        },
        deleteData(data){
            this.$emit("deleteData", data)
        },
        changeCategory(data){
            this.$emit("changeCategory", data)
        }
    }
};
</script>

<style>

</style>