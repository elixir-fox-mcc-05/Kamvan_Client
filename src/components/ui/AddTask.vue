<template>
    <div class="modal is-active" v-if="showAddTask">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class=" column is-offset-one-quarter box is-half" style="position:relative;z-index:999;">
                    <p class="message-header has-background-info has-text-white-bis">Add Task</p>
                    <hr class="login-hr has-background-info">
                <div class="nes-field" >
                    <p class="is-size-4 is-small has-text-centered" for="name-field">Title</p>
                    <input v-model="title" type="text" id="addtitle" class="input is-small">
                </div>
                <div class="nes-field" >
                    <p class="is-size-4 is-small has-text-centered" for="name-field">Points</p>
                    <input v-model="points" type="text" id="addpoints" class="input is-small">
                </div>
                <div class="nes-field" >
                    <p class="is-size-4 is-small has-text-centered" for="name-field">Description</p>
                    <input v-model="description" type="text" id="adddesc" class="input is-small">
                </div>
                <hr class="login-hr has-background-info is-rounded" style="height:5px">
               
                <div class="level" style="margin:30px;">
                    <p class="is-size-4" for="name-field">Category</p>
                    <select class="dropdown-content is-four-fifths" v-model="category" id="addcategory">
                    <option class="dropdown-item is-size-6" value="backlog">Back-Log</option>
                    <option class="dropdown-item is-size-6" value="todo">To-Do</option>
                    <option class="dropdown-item is-size-6" value="doing">Doing</option>
                    <option class="dropdown-item is-size-6" value="done">Done</option>
                    </select>
                </div>
                <hr class="login-hr has-background-info is-rounded" style="height:5px">
                <a @click.prevent="addTask" class="button is-info is-outlined is-rounded">Add New Task</a>
            </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
                </div>
</template>



<script>
export default {
    name : 'AddTask',
    data(){
        return {
            title : '',
            points : '',
            description : '',
            category : ''
        }
    },
    props : ['showAddTask'],
    methods : {
        addTask(){
            
            let data = {
                title : this.title,
                points : this.points,
                description : this.description,
                category : this.category
            }
            console.log(data)
            this.$emit('addTask',data)
            this.title = ''
            this.points = ''
            this.description = ''
            this.category = ''
        }
    }
}
</script>



<style scoped>

</style>