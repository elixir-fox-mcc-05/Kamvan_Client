<template>
    <div v-if="!logged_in">
        <div class="container-fluid">
            <div class="d-flex p-2">
                <div class="title">
                    <h1>KamVan Board</h1>
                </div>
                <!-- Modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalNewTask" data-whatever="newtask">New Task</button>
        <div class="modal fade" id="ModalNewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="createTitle">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Title :</label>
                        <input type="text" class="form-control" id="title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Point :</label>
                        <input type="text" class="form-control" id="point" v-model="point">
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Assigned to :</label>
                        <input type="text" class="form-control" id="assignedto" v-model="assignedto">
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Description:</label>
                        <textarea class="form-control" id="description" v-model="description"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click.prevent="createTitle">Add Task</button>
                </div>
                </div>
            </div>
        </div>
        <!-- ModalEND -->
            </div>
                <div>
                    <p><span style="color:red;">{{errMsg}}</span></p>
                </div>
            <div> 
                <div class="row" style="width: auto !important">
                    <!--  -->
                    <div v-for="(key, index) in status" :key="index" class="col-3">
                        <div class="card">
                            <div class="card-header" v-bind:class="key.color">
                                <p>{{key.name}}</p>
                            </div>
                            <div class="card-body">
                                <div v-for="(item, index) in key.Titles" :key="index">
                                    <div class="card">
                                        <div class="card-header">
                                        {{item.title}}
                                        </div>
                                        <div class="card-body" >
                                            <p class="card-text">Points : {{item.point}} </p>
                                            <p class="card-text">Assigned To: {{item.assignedto}} </p>
                                            <!-- Modal card -->
                                            <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#ModalCard" data-whatever="detail" v-on:click="GetItem(item)">Show Detail</button>
                                            <!-- Modal Card -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div>
                <div class="modal fade" id="ModalCard" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel" >{{title}}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent=""> 
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Point : <br>{{point}} </label>
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Assigned to : <br> {{assignedto}} </label>
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Description: <br> {{description}}  </label> <br>
                                <input type="text" name="" id="description" v-model="description">
                            </div>
                            <div class="form-group">
                                <label for="message-text" class="col-form-label">Category <br></label>
                                <input type="text" name="" id="StatusId" v-model="StatusId">
                            </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="edit">Update</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="destroy">Delete</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name : "card",
    props : ['logged_in', 'status', 'errMsg'],
    data() {
        return {
            id : null,
            title : '',
            description : '',
            point : '',
            assignedto : '',
            StatusId : 0,
            
        }
    },
    methods : {
        logout(){
            this.$emit('logout')
        },
        createTitle() {
            let data = {
                title : this.title,
                description : this.description,
                point : this.point,
                assignedto : this.assignedto
            }
            this.$emit('createTitle', data)
        },
        GetItem(data){
            console.log('masuk')
            console.log('masuk ini data', data)
            this.id = data.id
            this.title = data.title
            this.point = data.point
            this.assignedto = data.assignedto
            this.description = data.description
            this.StatusId = data.StatusId
        },
        destroy(){
            let id = this.id
            this.$emit('destroy', id)
        },
        edit(){
            let data = {
                id : this.id,
                StatusId : this.StatusId,
                description : this.description
            }
            this.$emit('edit', data)
        }
    }
}
</script>

<style>

</style>