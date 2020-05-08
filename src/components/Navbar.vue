<template>
  <div>
       <div class="custom-navbar">
            <div class="left-side-navbar">
                <p>KamVan Board</p> 
            </div>
            <div v-if="currentPage == 'dashboard'">
                <div class="right-side-navabar">
                    <div class="right-side-navbar1">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal3" v-on:click.prevent="showModal">New Task</button>
                    </div>
                    <div class="right-side-navbar2">
                        <button type="button" class="btn btn-primary bg-danger" v-on:click.prevent="logout">Logout</button>
                    </div>
                </div>   
                <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true" >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModal3Label">Add Task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="addForm" v-on:submit.prevent="addTask">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input  type="text" class="form-control" id="title"  placeholder="Enter title" v-model="title">
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input type="text" class="form-control" id="description" placeholder="Enter description" v-model="description">
                            </div>
                            <div class="form-group">
                                <label for="point">Point</label>
                                <input type="number" class="form-control" id="point" value="0" v-model="point">
                            </div>
                            <div class="form-group">
                                <label for="assigned_to">Assigned To</label>
                                <input type="text" class="form-control" id="assigned_to" v-model="assigned_to">
                            </div>
                            <button type="submit" class="btn btn-primary" >Add Task</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>            
            </div>
            <div v-else-if="currentPage == 'login'">
                <div class="right-side-navbar2">
                    <button type="button" class="btn btn-primary" v-on:click.prevent="registerForm">register</button>
                </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['currentPage'],
    data(){
        return{
            title: '',
            description: '',
            point: 0,
            assigned_to: ''
        }
    },
    methods: {
        logout(){
            this.$emit('logout')
        },
        addTask(){
            this.$emit('addTask', this.title, this.description, this.point, this.assigned_to)
        },
        registerForm(){
            this.$emit('registerForm')
        }
    }
}
</script>

<style>

</style>