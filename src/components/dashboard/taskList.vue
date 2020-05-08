<template>
    <div class="card">
        <h6 class="card-header"> {{ tasklist.title }} </h6>
        <div class="card-body">
            <div class="alert alert-danger alert-dismissible" role="alert" id="errRes" v-if="errMsg">
                <small class="text"> 
                {{ errMsg }}
                </small>
                <button type="button" class="close" data-dismiss="alert"  aria-label="Close" @click="errMsg=''">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <p > point : {{ tasklist.point }} </p>
            <p > Assaign to : {{ tasklist.assign_to }} </p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" v-bind:data-target="'#modalDetail'+tasklist.id" >
                Show Detail
            </button>
            <!-- modal -->
            <div class="modal fade" v-bind:id="'modalDetail'+tasklist.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">{{ tasklist.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p> Title : {{ tasklist.title }}</p>
                            <p > Description : {{ tasklist.description }} </p>
                            <p > point : {{ tasklist.point }} </p>
                            <p > Assaign to : {{ tasklist.assign_to }} </p>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal" @click.prevent="deleteTask(tasklist.id)">delete</button>
                        <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal" @click.prevent="moveBacklog(tasklist.id)">Back-Log</button>
                        <button type="button" class="btn btn-warning btn-sm" data-dismiss="modal" @click.prevent="moveTodo(tasklist.id)">To Do</button>
                        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" @click.prevent="moveDoing(tasklist.id)">Doing</button>
                        <button type="button" class="btn btn-success btn-sm" data-dismiss="modal" @click.prevent="moveDone(tasklist.id)">Done</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : "taskList",
    props : ['tasklist'],
    data() {
        return {
            baseUrl : 'http://localhost:3000',
            errMsg : ''
        }
    },
    methods : {
        deleteTask(id) {
            axios({
                method : 'delete',
                url : this.baseUrl+'/task/'+id,
                headers : {
                    token : localStorage.getItem('kamvanToken')
                }
            })
            .then(result=>{
                this.fetchTaskList()
                console.log(result)
            })
            .catch(err=>{
                this.errMsg = ''
                this.errMsg = err.response.data.error
                console.log(this.errMsg)
            })
        },
        moveTodo(id) {
            axios({
                method : 'patch',
                url : this.baseUrl+'/task/move/'+id,
                headers : {
                    token : localStorage.getItem('kamvanToken')
                },
                data : {
                    status : 'todo'
                }
            })
            .then(result=>{
                this.fetchTaskList()
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveBacklog(id) {
            axios({
                method : 'patch',
                url : this.baseUrl+'/task/move/'+id,
                headers : {
                    token : localStorage.getItem('kamvanToken')
                },
                data : {
                    status : 'back-log'
                }
            })
            .then(result=>{
                this.fetchTaskList()
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveDoing(id) {
            axios({
                method : 'patch',
                url : this.baseUrl+'/task/move/'+id,
                headers : {
                    token : localStorage.getItem('kamvanToken')
                },
                data : {
                    status : 'doing'
                }
            })
            .then(result=>{
                this.fetchTaskList()
                console.log(result)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        moveDone(id) {
            axios({
                method : 'patch',
                url : this.baseUrl+'/task/move/'+id,
                headers : {
                    token : localStorage.getItem('kamvanToken')
                },
                data : {
                    status : 'done'
                }
            })
            .then(result=>{
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

.card {
    margin-bottom: 15px;
}

</style>