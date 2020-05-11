<template>
    <div style="width:100%; display:flex; flex-direction:row; justify-content:space-around;">
        <div class="card" v-for="data in Tasks" :key="data.id" style="width : 20%;">
            <div :class="data.name">
                <p class="title-card">{{data.name}}</p>
            </div>
            <div v-if="data.Tasks">
                <div v-for="item in data.Tasks" :key="item.id">
                    <innerCard :item="item" :message="message"
                                @edit="edit"
                                @deleteData="deleteData"
                                @changeCategory="changeCategory"
                                :category="data.name"
                    ></innerCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import innerCard from "./innerCard";
export default {
    name : "card",
    components : {
        innerCard
    },
    data(){
        return {
            id : 0,
            title : "",
            descriptions : "",
            point : "",
            assigned : "",
            nextCategory : ""
        }
    },
    props : ["message", "Tasks"],
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
    .Backlogs {
        background-color: black;
        font-size: 18px;
        color: white;
        font-weight: bolder;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .Todos {
        background-color: yellow;
        font-size: 18px;
        color: red;
        font-weight: bolder;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
    .Doings {
        background-color: orange;
        font-size: 18px;
        color: blue;
        font-weight: bolder;
        font-family: cursive;
    }
    .Dones {
        background-color: green;
        font-size: 18px;
        color: grey;
        font-family: fantasy;
    }
</style>