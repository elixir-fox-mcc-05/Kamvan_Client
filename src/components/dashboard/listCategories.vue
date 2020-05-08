<template>
    <div class="col-3" >
        <div class="card">
            <h6 class="card-header" v-bind:id="category.cssId" >{{ category.name }}</h6>
            <div class="card-body" id="tabel">
                <taskList 
                    v-for="task in category.value" :key="task"
                    :tasklist="task"
                    @fetchTaskList="fetchTaskList"
                >
                </taskList>
            </div>
        </div>
    </div>
</template>

<script>
import taskList from './taskList'
export default {
    name : 'lisCategory',
    components : {
        taskList
    },
    props : ['category'],
    methods : {
        fetchTaskList() {
            this.$emit('fetchTaskList')
        }
    }
}
</script>

<style>
#tabel {
    display: flex;
    max-height: 82vh;
    flex-direction: column;
    overflow-y: auto;
}
</style>