<template>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark text-dark" style="color: white;">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a style="color: white;" id="user-nav" href="#" class="nav-link" data-toggle="modal" data-target="#edituser-container"></a>
                    </li>
                    <li class="nav-item">
                        <a v-on:click="logout" style="color: white;" id="logout-nav" href="#" class="nav-link">Logout<span class="sr-only">(current)</span></a>
                    </li>
                </ul>
                
                <form id="new-task" class="form-inline my-2 my-lg-0"> 
                    <a id="btn" href="#" class="btn btn-primary" @click="show2()">Add Task</a>
                </form>
            </div>
                <modal name="addForm" height="auto">
                    <form @submit.prevent="CreateTodo()">
                        <div>
                            <div class="form-group col-md-12"><label><br>Add Todo</label><div v-if="modalHasError" id="todo-error" class="alert alert-danger">{{ modalError }}</div></div>
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
        </nav>
        
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            title : ``,
            description : ``,
            point : ``, 
            assignedTo : ``,
            modal : ``,
            modalError : ``,
            modalHasError : false,
        }
    },
    methods : {
        logout(){
            this.$emit('loggedIn')
            localStorage.clear();
        },
        notification(type, title, msg) {
            this.$notify({
                group: 'app',
                type : type,
                title: title,
                text: msg
            });
        },
        show2 () {
            this.modalHasError = false;
            this.$modal.show('addForm');
        },
        hide () {
            this.$modal.hide('addForm');
        },
        CreateTodo(){
            this.modalHasError = false;
            axios ({
                method : `post`,
                url : `http://localhost:3000/todos`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title : this.title, 
                    description : this.description, 
                    point : this.point, 
                    assignedTo : this.assignedTo
                }
            })  .then(({data}) => {
                    this.title =``,
                    this.description = ``,
                    this.point = ``,
                    this.assignedTo = ``,
                    this.hide();
                    this.$emit(`rerender`)
                })  .catch( err => {
                    console.log(err.response)
                    this.modalHasError = true,
                    this.modalError = err.response.data.Error
                    this.notification(`warn`,`INFO`, `There's an error to your request`)
                })
        }
    }
}
</script>

<style>

</style>