<template>
    <div>
        <section id="mainPage">
            <div class="container-fluid mt-3">
                <div class="row" >
                    <kanbanBoard v-for="category in Categories" :key="category" :category="category" :Tasks="Tasks"></kanbanBoard>
                </div>

            </div>

            <!-- Modal New Task -->
            <div class="modal fade" id="modalNewTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">New Task</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent="createTodo">
                                <div class="form-group">
                                    <label for="newTitle">Title</label>
                                    <input type="text" class="form-control" id="newTitle" placeholder="title">
                                </div>
                                <div class="form-group">
                                    <label for="newDescription">Description</label>
                                    <textarea class="form-control" id="newDescription" rows="3" placeholder="write description here"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="newPoint">Point</label>
                                    <input type="number" class="form-control" id="newPoint">
                                </div>
                                <div class="form-group">
                                    <label for="newAssignee">Assign To</label>
                                    <input type="text" class="form-control" id="newAssignee" placeholder="Assignee Name">
                                </div>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary">Save</button>    
                            </form>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal Detail Task -->
            <div class="modal fade" id="modalDetailTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="">Detail Task: Title Project</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="">Description</p>
                            <p class="text-left font-weight-light">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <p class="">Priority:</p>
                            <p class=" text-left font-weight-light">Normal</p>
                            <p class="">Deadline:</p>
                            <p class=" text-left font-weight-light">2021-01-29</p>
                            <p class="">Assign By:</p>
                            <p class=" text-left font-weight-light">Bambang</p>
                            <p class="">Assign To:</p>
                            <p class=" text-left font-weight-light">Tono</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal">Before</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                            <button type="button" class="btn btn-success" data-dismiss="modal">Next</button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
import kanbanBoard from './3-1-kanbanBoard'

export default {
    name: 'mainPage',
    data: () => {
        return {
            Categories: ['Back-Log', 'Todo', 'Doing', 'Done']
        }
    },
    components: {
        kanbanBoard
    },
    props: [ 'Tasks' ]
}
</script>

<style>

</style>