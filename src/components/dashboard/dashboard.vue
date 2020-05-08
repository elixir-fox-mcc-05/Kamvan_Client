<template>
  <div>
        <navbar 
            @fetchTaskList="fetchTaskList"
        ></navbar>
        <modalAddTask
            @fetchTaskList="fetchTaskList"
        ></modalAddTask>
        <div class="row">
            <listCategory 
                v-for="table in taskTabel" :key="table.name"
                :category="table"
                class="table"
                @fetchTaskList="fetchTaskList"
            >
            </listCategory>
        </div>
  </div>
</template>

<script>
import navbar from './navbar'
import listCategory from './listCategories'
import modalAddTask from './modalAddTask'
export default {
    name : "dashboard",
    components : {
        navbar,
        listCategory,
        modalAddTask
    },
    data() {
        return {
            baseUrl : 'http://localhost:3000',
            taskTabel: [
                { 
                    name : "Back-Log",
                    value : [],
                    cssId : 'backlog'
                },
                { 
                    name : "To Do",
                    value : [],
                    cssId : 'todo'
                },
                {
                    name : "Doing",
                    value : [],
                    cssId : 'doing'
                },
                {
                    name : "Done",
                    value : [],
                    cssId : 'done'
                },
            ]
        }
    },
    methods : {
         fetchTaskList() {
            axios({
                methods : 'get',
                url : this.baseUrl+'/task',
                headers : {
                    token : localStorage.getItem('kamvanToken')
                }
            })
            .then(result=>{
                let newTaskList = result.data.task
                this.taskTabel.forEach(el => {
                    el.value = []
                });
                newTaskList.forEach(element => {
                    if(element.status=='back-log') {
                        this.taskTabel[0].value.push(element)
                    } else if (element.status=='todo') {
                        this.taskTabel[1].value.push(element)
                    } else if (element.status=='doing') {
                        this.taskTabel[2].value.push(element)
                    } else if (element.status=='done') {
                        this.taskTabel[3].value.push(element)
                    } else { }
                });
            })
            .catch(err=>{
                console.log(err)
            })
        },
    },
    created(){
        let token = localStorage.getItem('kamvanToken')
        if(token) {
            this.fetchTaskList()
        }
    }
}
</script>

<style>


</style>