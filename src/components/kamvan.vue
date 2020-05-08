<template>
  <div class="home-container d-flex p-5 justify-content-center col-sm-12 col-md-12 flex-wrap">
        <div class="card h-100 text-white bg-info mb-3 p-1 col-sm-12 col-md-12 col-lg-2 m-2">
            <div class="card-header">
                Back Log
            </div>

            <div class="card-container p-2 bg-white text-dark rounded" >
                <div class="card p-1 col-sm-12 border-info" v-for="list in listBackLog" :key="list.id">
                    <Backlog @setTodo="moveToTodo" @deleteTodo="deleteTodo" @edit="showEdit" :list="list"></Backlog>
                </div>
            </div>
        
        </div>

        <div class="card h-100 text-white bg-danger p-1 col-sm-12 col-md-12 col-lg-2 m-2">
            <div class="card-header">
            To-do
            </div>

            <div class="card-container p-2 bg-white text-dark rounded" >
                <div class="card p-1 col-sm-12 border-danger" v-for="list in listTodo" :key="list.id">
                    <Todo @setBackLog="moveToBacklog" @setDoing="moveToDoing" @deleteTodo="deleteTodo" @edit="showEdit" :list="list"></Todo>
                </div>
            </div>

        </div>

        <div class="card h-100 text-white bg-primary p-1 col-sm-12 col-md-12 col-lg-2 m-2">
            <div class="card-header">
            Doing
            </div>

            <div class="card-container p-2 bg-white text-dark rounded" >
                <div class="card p-1 col-sm-12 border-primary" v-for="list in listDoing" :key="list.id">
                     <Doing @setTodo="moveToTodo" @setDone="moveToDone" @deleteTodo="deleteTodo" @edit="showEdit"  :list="list"></Doing>
                </div>
            </div>

        </div>
        
        <div class="card h-100 text-white bg-success p-1 col-sm-12 col-md-12 col-lg-2 m-2">
            <div class="card-header">
                Done
            </div>

            <div class="card-container p-2 bg-white text-dark rounded" >
                <div class="card p-1 col-sm-12 border-success" v-for="list in listDone" :key="list.id">
                    <Done @setDoing="moveToDoing" @deleteTodo="deleteTodo" @edit="showEdit" :list="list"></Done>
                </div>
            </div>

        </div>

        <modal name="editForm" height="auto">
            <form @submit.prevent="editTodo()">
                <input type="hidden" v-model="EditId">
                <div>
                    <div class="form-group col-md-12"><label><br>Edit Todo</label><div v-if="editHasError" id="todo-error" class="alert alert-danger">{{ editError }}</div></div>
                    <div>
                        <div class="form-group col-md-12"><input v-model="title" class="form-control" type="text" name="title" placeholder="title"></div>
                        <div class="form-group col-md-12"><input v-model="description" class="form-control" type="text" name="description" placeholder="description"></div>
                        <div class="form-group col-md-12"><input v-model="point" class="form-control" type="number" name="point" placeholder="point"></div>
                        <div class="form-group col-md-12"><input v-model="assignedTo" class="form-control" type="text" name="assignedTo" placeholder="assignedTo"></div>
                        <div class="form-group col-md-12"><label></label>
                            <input id="todo-submit" class="btn btn-info" type="submit" value="Save">
                        </div>
                    </div>
                </div>
            </form>
        </modal>

        <v-dialog />
    </div>
</template>

<script>
import axios from 'axios'
import Backlog from './kamvanParts/backlog'
import Todo from './kamvanParts/todo'
import Doing from './kamvanParts/doing'
import Done from './kamvanParts/done'

export default {
    components : {
        Backlog,
        Doing,
        Todo,
        Done
    },
    data() {
        return {
            listBackLog : [],
            listTodo : [],
            listDoing : [],
            listDone : [],
            editHasError : false,
            editError : ``,
            title : ``,
            description : ``,
            point : ``,
            assignedTo : ``,
            EditId : ``

        }
    },
    methods : {
        fetchBacklogData(){
            axios({
                method : `get`,
                url : `http://localhost:3000/todos/status/backlog`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                }
                })  .then(({data}) => {
                        this.listBackLog = data.Todo
                })  .catch( err => {
                        console.log(err.response)
                })
        },
        fetchTodoData(){
             this.$notify('text')
            axios({
                method : `get`,
                url : `http://localhost:3000/todos/status/todo`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                }
                })  .then(({data}) => {
                        this.listTodo = data.Todo
                })  .catch( err => {
                        console.log(err.response)
                })
        },
        fetchDoingData(){
            axios({
                method : `get`,
                url : `http://localhost:3000/todos/status/doing`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                }
                })  .then(({data}) => {
                        this.listDoing = data.Todo
                })  .catch( err => {
                        console.log(err.response)
                })
        },
        fetchDoneData(){
            axios({
                method : `get`,
                url : `http://localhost:3000/todos/status/done`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                }
                })  .then(({data}) => {
                        this.listDone = data.Todo
                })  .catch( err => {
                        console.log(err.response)
                })
        },
        notification(type, title, msg) {
            this.$notify({
                group: 'app',
                type : type,
                title: title,
                text: msg
            });
        },
        hide () {
            this.$modal.hide(`dialog`);
        },
        hideForm () {
            this.$modal.hide('editForm');
        },
        showEdit ({ id, title, description, point, assignedTo }) {
            this.editHasError = false;
            this.hide()
            this.$modal.show('editForm');
            this.EditId = id,
            this.title = title,
            this.description = description,
            this.point = point,
            this.assignedTo = assignedTo
        },
        deleteTodo(id) {
            axios({
                method : `delete`,
                url : `http://localhost:3000/todos/${id}`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                }
            })  .then(res => {
                    // this.$emit(`rerender`)
                    this.fetchall();
            })  .catch(err => {
                    console.log(err.response)
                    this.errNotif(err.response.data.message)
            })
            this.hide()
        },
        moveToBacklog({id, title, description, point, assignedTo}) {
            axios({
                method : `put`,
                url : `http://localhost:3000/todos/${id}/backlog`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title ,
                    description,
                    point,
                    assignedTo
                }
            })  .then(res => {
                    this.fetchall();
                    this.notification(`success`,title, `Item moved to Back Log`)
            })  .catch(err => {
                    console.log(err.response)
            })
            this.hide()
        },
        moveToTodo({ id, title, description, point, assignedTo }) {
            axios({
                method : `put`,
                url : `http://localhost:3000/todos/${id}/todo`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title ,
                    description,
                    point,
                    assignedTo
                }
            })  .then(res => {
                    this.fetchall();
                    this.notification(`success`,title, `Item moved to Todo`)
            })  .catch(err => {
                    this.$notify({ group: 'app', text: err.response })
                    this.errNotif(err)
            })
            this.hide()
        },
        moveToDoing({id, title, description, point, assignedTo}) {
            axios({
                method : `put`,
                url : `http://localhost:3000/todos/${id}/doing`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title ,
                    description,
                    point,
                    assignedTo
                }
            })  .then(res => {
                    this.fetchall();
                    this.notification(`success`,title, `Item moved to Doing`)
            })  .catch(err => {
                    console.log(err.response)
            })
            this.hide()
        },
        moveToDone({id, title, description, point, assignedTo}) {
            axios({
                method : `put`,
                url : `http://localhost:3000/todos/${id}/done`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title ,
                    description,
                    point,
                    assignedTo
                }
            })  .then(res => {
                    this.fetchall();
                    this.notification(`success`,title, `Item moved to Done`)
            })  .catch(err => {
                    console.log(err.response)
            })
            this.hide()
        },
        editTodo() {
            axios({
                method : `put`,
                url : `http://localhost:3000/todos/${this.EditId}`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title : this.title ,
                    description : this.description,
                    point : this.point,
                    assignedTo : this.assignedTo
                }
            })  .then(res => {
                    this.hideForm()
                    this.fetchall();
                    this.notification(`success`,`INFO`, `Edit Success`)
            })  .catch(err => {
                    this.notification(`warn`,`INFO`, `There's an error to your request`)
                    this.editHasError = true;
                    this.editError = err.response.data.Error
            })
        },
        fetchall(){
            this.fetchBacklogData(),
            this.fetchTodoData(),
            this.fetchDoingData(),
            this.fetchDoneData()
        }
    },
    created : function () {
        this.fetchBacklogData(),
        this.fetchTodoData(),
        this.fetchDoingData(),
        this.fetchDoneData()
    }
}
</script>

<style>

</style>