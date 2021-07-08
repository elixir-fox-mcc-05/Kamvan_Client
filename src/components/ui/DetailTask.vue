<template>
    <div class="modal is-active" v-if="showDetailTask">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class=" column is-offset-one-fifth box is-three-fifths" v-if="showDetailTask">
                        <h2 class="message-header has-background-success is-size-3 has-text-centered">Detail</h2>
                        <hr class="login-hr has-background-success">
                        <p class="is-size-4">Title : {{taskDetail.title}}</p>
                        <p class="is-size-4">Points : {{taskDetail.points}}</p>
                        <p class="is-size-4">Author : {{taskDetail.User.first_name}} {{taskDetail.User.last_name}}</p>
                        <p class="is-size-4">Description : {{taskDetail.description}}</p>
                        <hr class="login-hr has-background-success">
                        <div class="level" style="margin:30px;">
                        <h1 class="subtitle is-medium is-size-4" for="name-field">Category</h1>
                        <select class="dropdown-content" v-model="category" id="addcategory">
                        <option class="dropdown-item is-size-6" value="backlog">Back-Log</option>
                        <option class="dropdown-item is-size-6" value="todo">To-Do</option>
                        <option class="dropdown-item is-size-6" value="doing">Doing</option>
                        <option class="dropdown-item is-size-6" value="done">Done</option>
                        </select>
                        </div>
                        <hr class="login-hr has-background-success">
                        <div class="level">
                        <a @click.prevent="updateTask(taskDetail.id)" class="button is-success">Change Category</a>
                        <a @click.prevent="deleteTask(taskDetail.id)" class="button is-danger is-light is-outlined">Delete</a>
                        </div>
                    <div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click.prevent="closeEditModal"></button>
                </div>
</template>


<script>
export default {
    name : 'DetailTask',
    data(){
        return {
            category : ''
        }
    },
    props : ['showDetailTask','taskDetail'],
    methods : {
        updateTask(id){
            // console.log(this.category)
            this.$emit('updateTask',id,this.category)
        },
        deleteTask(id){
            this.$emit('deleteTask',id)
        },
        closeEditModal(){
            // console.log('close pls')
            this.$emit('closeEditModal')
        }
    },
    mounted(){
        this.category = this.taskDetail.category
    }
}
</script>

<style scoped>

</style>