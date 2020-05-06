<template>
  <div id="newTask" style="padding: 40px;" v-on:submit.prevent="create">
        <form method="post">
            <H4>Create New Task</H4>
            <label for="input-title">Title :</label><br>
            <input type="text" placeholder="edit me">
            <br>
            <label for="input-description">Description :</label><br>
            <input type="text" id="input-description" style="height: 200px;">
            <br>
            <label for="input-point">Point :</label><br>
            <input type="text" id="input-point">
            <br>
            <label for="input-assigned">Assigned To :</label><br>
            <input type="text" id="input-assigned">
            <br>
            <button type="submit" class="btn btn-primary btn-m btn-block" style="width: 50%;">Create</button>
        </form>
    </div>
</template>

<script>
export default {
    name : "newTask"
};
</script>

<style>

</style>