<template>
    <div class="kanbanbox">
        <div class="taskTitle"> {{taskCard.title}} </div>
        <div class="taskAssigned">Assigned To: {{taskCard.assignedTo}} </div>
        <ButtonController :card='taskCard' @refetchTasks="refetchTasks"></ButtonController>
    </div>
</template>

<script>

import ButtonController from './ButtonController'

export default {
    name: 'KanbanBox',
    components: {
        ButtonController
    },
    props: ['taskCard'],
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