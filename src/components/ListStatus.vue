<template>
    <div class="container-list-status">
        <div class="item">
            <h3 id="status">Back-Log</h3>
            <div class="task">
                <h3 class="task-title">Title:</h3>
                <div class="task-body">
                    <h3>Description:</h3>
                    <button id="update">Update</button>
                    <button id="delete">Delete</button>
                </div>
            </div>
        </div>
        <div class="item">
            <h3 id="status1">To-Do</h3>
        </div>
        <div class="item">
            <h3 id="status2">Doing</h3>
        </div>
        <div class="item">
            <h3 id="status3">Done</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListStatus'
}
</script>

<style>

</style>