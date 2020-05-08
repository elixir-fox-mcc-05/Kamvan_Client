<template>
    <div class="modal is-active" v-if="showDetailTask">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class=" column is-offset-one-quarter box is-half" v-if="showDetailTask">
                        <h2>Detail</h2>
                        <hr class="login-hr">
                        <p class="is-size-6">Title : {{taskDetail.title}}</p>
                        <p class="is-size-6">Points : {{taskDetail.points}}</p>
                        <p class="is-size-6">Author : {{taskDetail.User.first_name}} {{taskDetail.User.last_name}}</p>
                        <p class="is-size-6">Description : {{taskDetail.description}}</p>
                        <hr class="login-hr">
                        <label class="subtitle is-small" for="name-field">Category</label>
                        <select class="dropdown-content" v-model="category" id="addcategory">
                        <option class="dropdown-item is-size-6" value="backlog">Back-Log</option>
                        <option class="dropdown-item is-size-6" value="todo">To-Do</option>
                        <option class="dropdown-item is-size-6" value="doing">Doing</option>
                        <option class="dropdown-item is-size-6" value="done">Done</option>
                        </select>
                        <a @click.prevent="updateTask(taskDetail.id)" class="button">Change Category</a>
                        <a @click.prevent="deleteTask(taskDetail.id)" class="button">Delete</a>
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
    }
}
</script>

<style scoped>

</style>