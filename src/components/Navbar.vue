<template>
    <section id="navbar">
            <div class="container-fluid pt-1 pb-1">
                <div class="row align-items-center justify-content-between">
                    <div class="col-9 justify-content-start">
                        <a id="titleButton" class="btn" role="button" @click="showHome">Kanban Board</a>
                    </div>
                    <div v-if="currentPage == 'mainPage'" class="col-1 justify-content-between pr-0">
                        <a class="btn btn-primary btn-sm text-white" role="button" data-toggle="modal" data-target="#modalNewTask">New Task</a>
                    </div>
                    <div v-if="currentPage == 'mainPage'" class="col-1 justify-content-between pr-0">
                        <a class="btn btn-secondary btn-sm" role="button" @click="logoutUser">Logout</a>
                    </div>
                </div>
            </div>
    </section>
</template>

<script>
export default {
    name: 'navbar',
    props: [ 'currentPage' ],
    methods: {
        showHome() {
            this.$emit('showHome')
        },
        logoutUser() {
            this.$emit('logoutUser')
        }
    }
}
</script>

<style>
#navbar {
    background-color: #00564d;
    font-family: 'gilroyBold';
    color: white;
}
#titleButton {
    font-size: 25px;
}
</style>