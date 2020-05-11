<template>
    <div v-if="loggedIn" class="row" style=" justify-content: space-around; padding: 10px 30px;">
        <card :Tasks="Tasks"
            @edit="edit"
            @deleteData="deleteData"
            @changeCategory="changeCategory"
        ></card>
    </div>
</template>

<script>
import card from "./CardComponents/card";
export default {
    name : "dashboard",
    components : {
        card
    },
    props : [ "Tasks", "loggedIn", "message"],
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