<template>
    <div class="form-container">
        <h2 class="text-center mt-4">Login</h2>
        <form action="" class="mt-4">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" placeholder="Your Title" class="form-control" v-model="title">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" name="description" placeholder="Your Description" class="form-control" v-model="description">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select name="status" id="">
                    <option value="">Selected:</option>
                    <option value="Backlog">Backlog</option>
                    <option value="ToDo">ToDo</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div class="form-group">
                <label for="point">Points</label>
                <input type="number" name="point" placeholder="Your Point" class="form-control" v-model="point">
                <div></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'KanbanAdd',
    data() {
        return {
            title: '',
            description: '',
            point: '',
        }
    }
}
</script>

<style>

</style>