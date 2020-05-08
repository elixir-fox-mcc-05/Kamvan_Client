<template>
    <div class="box">
                  <p class="message-header has-background-primary has-text-grey-darker">{{task.title}}</p>
                  <p class="is-size-6 has-text-centered">Points: {{task.points}}</p>
                  <p class="is-size-6 has-text-centered">Author: {{task.User.first_name}} {{task.User.last_name}}</p>
                  <hr class="login-hr has-background-dark">
                  <button class="button" @click="detailBtn(task.id)">Show Detail</button>
                </div>
</template>

<script>
export default {
    name : "TaskForm",
    props : ['task','i'],
    methods: {
        detailBtn(i){
            // console.log(i)
            this.$emit('detailBtn',i)
        }
    }
}
</script>

<style>

</style>