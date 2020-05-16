<template>
  <div>
      <!-- navbar -->
        <nav class="navbar" id="nav">
            <a class="navbar-brand text-muted"><h3>KamVan Board</h3> </a>
            <!-- Button trigger modal -->
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalNewTask">New Task</button>                  
                <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Settings
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <button type="button" class="btn btn-link" @click="logout">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
        <!-- modal -->
  </div>
</template>

<script>
export default {
    name : "navbar",
    methods : {
        logout() {
            localStorage.clear()
            location.reload();
        },
        fetchTaskList() {
            this.$emit('fetchTaskList')
        }
    }
}
</script>
    

<style>

</style>