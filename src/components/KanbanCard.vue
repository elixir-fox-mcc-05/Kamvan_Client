<template>
    <div class="kanban-card">
        <div class="card-head">
            <h3 class="card-title">{{ capitalizeTitleFirstWord }}</h3>
        </div>
        <div class="card-body">
            <draggable 
                v-model="stage" 
                v-bind="dragOptions"
                @start="drag = true"
                @end="drag = false"
            >
                <transition-group type="transition" :name="!drag? 'flip-list' : null">
                    <KanbanTicket 
                        v-for="task in stage" 
                        :key="task.id" 
                        :task="task"
                        @showDetail="showDetail"
                        @showEdit="showEdit"
                        @moveLeft="moveLeft"
                        @moveRight="moveRight"
                        @deleteTask="deleteTask"
                    >
                    </KanbanTicket>
                </transition-group>
            </draggable>
        </div>
    </div>
</template>

<script>
import KanbanTicket from './KanbanTicket';
import draggable from 'vuedraggable';

export default {
    name: 'KanbanCard',
    components: {
        KanbanTicket, draggable
    },
    props: ['title', 'tasks'],
    data() {
        return {
            drag: false
        }
    },
    methods: {
        showEdit(taskEdit) {
            this.$emit('showEdit', taskEdit)
        },
        showDetail(detail) {
            this.$emit('showDetail', detail)
        },
        moveLeft(movedTask) {
            this.$emit('moveLeft', movedTask);
        },
        moveRight(movedTask) {
            this.$emit('moveRight', movedTask);
        },
        deleteTask(id) {
            this.$emit('deleteTask', id);
        }

    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            }
        },
        stage: {
            get() {
                return this.tasks;
            },
            set(task) {
                // console.log(task);
                this.$emit('changeStage', task, this.title)
            }
        },
        capitalizeTitleFirstWord: function() {
            return this.title.charAt(0).toUpperCase() + this.title.slice(1);
        }
    }
}
</script>

<style>
    .kanban-card {
        flex: 1 1 300px;
        margin: 5px;
        background-color: white;
    }
    
    .backlog .card-title {
        background-color: #d64045;
        border: outset #d64045;
    }

    .todo .card-title {
        background-color: #f4b728;
        border: outset #f4b728;
    }

    .doing .card-title {
        background-color: #729eb8;
        border: outset #729eb8;
    }

    .done .card-title {
        background-color: #90e39a;
        border: outset #90e39a;
    }

    .card-title {
        font-family: monospace;
        color: cornsilk;
        font-size: 2rem;
        padding: 3px;
        text-align: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin: 0;
    }

    .card-body {
        border: inset grey 1px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px;
        min-height: 180px;
    }

    draggable {
        min-height: 180px;
    }
</style>