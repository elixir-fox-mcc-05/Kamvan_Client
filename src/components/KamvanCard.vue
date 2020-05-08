<template>
  <div>
    <p>{{errMsg}}</p>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Detail Task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addForm" v-on:submit.prevent="editTask">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input  type="text" class="form-control" id="title" v-model="title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input type="text" class="form-control" id="description" v-model="description">
                    </div>
                    <div class="form-group">
                        <label for="point">Point</label>
                        <input type="number" class="form-control" id="point" v-model="point">
                    </div>
                    <div class="form-group">
                        <label for="assigned_to">Assigned To</label>
                        <input type="text" class="form-control" id="assigned_to" v-model="assigned_to">
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <input type="text" class="form-control" id="category" v-model="category">
                    </div>
                    <button type="submit" class="btn btn-primary" >Update</button>
                    <button type="button" class="btn btn-primary" v-on:click.prevent="deleteTask">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    </div>     
    <div class="custom-card-place">
    <div v-for="step in steps" :key="step">
        <div v-if="step == 'Back-Log'">
            <div class="card">
                <h3 class="card-header" :id="step" >{{ step }}</h3>
                <!-- <StepList v-for="(step, i) in steps" :key="i">
                    <TaskList 
                        v-for="task in tasks" 
                        :key="task.id" 
                        :task="task.filter( el => el.category = step)"> -->
                <div v-for="task in tasks" :key="task.id">
                    <div v-if="task.category == step">
                        <div class="card-body" >
                            <div class="card" id="custom-card">
                                <h3 class="card-header">{{task.title}}</h3>
                                <div class="card-body">
                                    <p class="card-text">Point: {{task.point}}</p>
                                    <p class="card-text">Assigned To: {{task.assigned_to}}</p>
                                    <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click.prevent="getId(task.id)">Show Detail</a>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>  
            </div>
        </div>
        <div v-else-if="step == 'To-Do'">
            <div class="card">
                <h3 class="card-header" :id="step" >{{ step }}</h3>
                <div v-for="task in tasks" :key="task.id">
                    <div v-if="task.category == step">
                        <div class="card-body">
                            <div class="card" id="custom-card">
                                <h3 class="card-header">{{task.title}}</h3>
                                <div class="card-body">
                                    <p class="card-text">Point: {{task.point}}</p>
                                    <p class="card-text">Assigned To: {{task.assigned_to}}</p>
                                    <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click.prevent="getId(task.id)">Show Detail</a>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="step == 'Doing'">
            <div class="card">
                <h3 class="card-header" :id="step" >{{ step }}</h3>
                <div v-for="task in tasks" :key="task.id">
                    <div v-if="task.category == step">
                        <div class="card-body">
                            <div class="card" id="custom-card">
                                <h3 class="card-header">{{task.title}}</h3>
                                <div class="card-body">
                                    <p class="card-text">Point: {{task.point}}</p>
                                    <p class="card-text">Assigned To: {{task.assigned_to}}</p>
                                    <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click.prevent="getId(task.id)">Show Detail</a>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>   
            </div>
        </div>
        <div v-else-if="step == 'Done'">
            <div class="card">
                <h3 class="card-header" :id="step" >{{ step }}</h3>
                <div v-for="task in tasks" :key="task.id">
                    <div v-if="task.category == step">
                        <div class="card-body">
                            <div class="card" id="custom-card">
                                <h3 class="card-header">{{task.title}}</h3>
                                <div class="card-body">
                                    <p class="card-text">Point: {{task.point}}</p>
                                    <p class="card-text">Assigned To: {{task.assigned_to}}</p>
                                    <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click.prevent="getId(task.id)" >Show Detail</a>
                                </div>
                            </div>
                        </div>              
                    </div>
                </div>    
            </div>
        </div>    
    </div>
    </div> 
  </div>
</template>

<script>
import Axios from 'axios'
// import TaskDetail from './TaskDetail' 
export default {
    name: 'KamvanCard',
    props: ["steps", 'tasks', 'errMsg'],
    data(){
        return{
            id: 0,
            title: '',
            description: '',
            point: 0,
            assigned_to: '',
            category:''
        }
    },
    methods: {
        getId(id){
            this.id=id
        },
        deleteTask(){
            this.$emit('deleteTask', this.id)
        },
        editTask(){
            this.$emit('editTask', this.id, this.title, this.description, this.point, this.assigned_to, this.category)
        }

        // editTodo(id){
        //     console.log(id)

        // }

    }
}
</script>

<style>

</style>