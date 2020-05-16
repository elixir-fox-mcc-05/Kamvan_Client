<template>
    <!-- Modal -->
    <div class="modal fade" id="modalNewTask" tabindex="-1" role="dialog" aria-labelledby="modalNewTaskTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="taskForm.title" id="title" placeholder="Task Title">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" v-model="taskForm.description" id="description" rows="3" placeholder="Task Short Description"></textarea>
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" v-model="taskForm.point" id="point" placeholder="Point">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="taskForm.assign_to" id="assign_to" placeholder="Assigned To">
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-dismiss="modal" @click="addTask">Save</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'modalAddTask',
    data() {
        return {
            baseUrl : 'http://localhost:3000',
            taskForm : {
                title : '',
                description : '',
                point : 0,
                assign_to :'',
            },
        }
    },
    methods : {
        addTask() {
            let { title , description , point , assign_to } = this.taskForm
            axios({
                method : 'post',
                url : this.baseUrl+'/task',
                headers : {
                    token: localStorage.getItem('kamvanToken')
                },
                data : {
                    title,
                    description,
                    point,
                    assign_to
                },
            })
            .then(result=>{
                title = ''
                description = ''
                point = ''
                assign_to = ''
                this.fetchTaskList()
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        fetchTaskList() {
            this.$emit('fetchTaskList')
        }

    }

}
</script>

<style>

</style>