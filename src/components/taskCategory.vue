<template>
    <div class="w-25 border border-primary rounded m-3 p-3" style="background-color: white; max-width: 22%;">
        <H3>{{taskCategory.name}}</H3>
        <taskCard
            v-for="task in filterTasks" :key="task.id"
            :task="task"
            @changePage="changePage"
            @refetchAllTasks="refetchAllTasks"
            @setSelectedTaskId="setSelectedTaskId">
        </taskCard>
    </div>
</template>

<script>
import taskCard from './taskCard.vue'

export default {
    name: 'taskCategory',
    components:{
        taskCard
    },
    props: ['allTasks', 'taskCategory'],
    data(){
        return{
            everyTasks: {
                allBacklogTasks:[],
                allTodoTasks:[],
                allDoingTasks:[],
                allDoneTasks:[]
            }
        }
    },
    methods:{
        refetchAllTasks(){
            this.$emit('refetchAllTasks')
        },
        setSelectedTaskId(selectedTaskId){
            this.$emit( 'setSelectedTaskId', selectedTaskId )
        },
        changePage(page){
        this.$emit( 'changePage', page )
        },
        reassignTasks(){
            this.allBacklogTasks = []
            this.allTodoTasks = []
            this.allDoingTasks = []
            this.allDoneTasks = []
            console.log(this.allTasks)
            for (let i = 0; i < this.allTasks.length; i++) {
                if (this.allTasks[i].category === 'backlog'){
                   this.everyTasks.allBacklogTasks.push( this.allTasks[i] )
                } else if (allTasks[i].category === 'todo'){
                   this.everyTasks.allTodoTasks.push( this.allTasks[i] )
                } else if (allTasks[i].category === 'doing'){
                   this.everyTasks.allDoingTasks.push( this.allTasks[i] )
                } else if (allTasks[i].category === 'done'){
                   this.everyTasks.allDoneTasks.push( this.allTasks[i] )
                }
            }
        }
    },
    computed:{
        filterTasks(){ // ini sudah menjadi serupa variabel data, jadi bisa dipanggil di dalam template
            return this.allTasks.filter(task => task.category === this.taskCategory.name)
        }
    },
    created(){
        this.reassignTasks()
    }
 
}
</script>

<style>

</style>