<template>
    <div class="contCategory">
        <div class="category">{{CategoryName}}</div>
        <KanbanBox v-for="task in list" :taskCard='task' :key="task.id" @refetchTasks="refetchTasks"></KanbanBox>
    </div>
</template>

<script>

import axios from 'axios'
import KanbanBox from '../components/KanbanBox'

export default {
    name: 'Category',
    components: {
        KanbanBox
    },
    props: ['CategoryName', 'list'],
    methods: {
        refetchTasks(){
            this.$emit('refetchTasks')
        }
    },
    created(){
        this.refetchTasks()  
    }

}
</script>

<style>

</style>