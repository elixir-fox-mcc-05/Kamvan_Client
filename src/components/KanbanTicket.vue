<template>
    <div class="task-ticket">
        <div class="task-title">
            <h5>{{ task.title }}</h5>
        </div>
        <div class="task-icon">
            <i class="fas fa-pen" @click="showEdit"></i>
        </div>
        <div class="task-body">
            <p>Assign to: {{ task.User.name }}</p>
        </div>
        <div class="task-arrow">
            <i v-if="task.category !== 'backlog'" class="fas fa-arrow-left" @click="moveLeft"></i>
            <i v-if="task.category !== 'done'" class="fas fa-arrow-right" @click="moveRight"></i>
        </div>
        <div class="task-deadline">
            <i class="fas fa-clock"></i>
            <small>{{ task.due_date.slice(0,10) }}</small>
        </div>
        <div class="task-button">
            <button class="btn btn-primary btn-sm" @click="showDetail">Show Detail</button>
            <i class="fas fa-trash-alt" @click="deleteTask(task.id)"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'KanbanTicket',
    props: ['task'],
    methods: {
        showEdit() {
            const taskEdit = {};
            taskEdit.id = this.task.id;
            taskEdit.title = this.task.title;
            taskEdit.assignee = this.task.User.name
            taskEdit.description = this.task.description;
            taskEdit.category = this.task.category;
            taskEdit.due_date = this.task.due_date.slice(0,10);
            this.$emit('showEdit', taskEdit);
        },
        showDetail() {
            const detail = {};
            if(this.task.description) {
                detail.description = this.task.description;
            } else {
                detail.description = 'No description'
            }
            detail.id = this.task.id;
            detail.title = this.task.title;
            detail.assignee = this.task.User.name
            detail.category = this.task.category;
            detail.due_date = this.task.due_date.slice(0,10);
            this.$emit('showDetail', detail);
        },
        deleteTask(id) {
            this.$emit('deleteTask', id);
        },
        moveLeft() {
            const movedTask = {
                id: this.task.id,
                category: this.task.category
            }
            this.$emit('moveLeft', movedTask);
        },
        moveRight() {
            const movedTask = {
                id: this.task.id,
                category: this.task.category
            }
            this.$emit('moveRight', movedTask);
        }
    }
}
</script>

<style>
    .task-ticket {
        flex: 1 1 300px;
        max-width: 450px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, minmax(20px, auto));
        border: black solid 1px;
        background-color: #ffff82;
        margin: 5px;
        padding: 5px;
        border-radius: 8px;
    }       

    .task-title {
        grid-column: 1/4;
    }

    .task-body {
        grid-column: 1/5;
        grid-row: 2/3;
    }

    .task-button {
        grid-column: 3/5;
        grid-row: 4/5;
    }

    .task-deadline {
        grid-column: 1/3;
        grid-row: 4/5; 
    }

    .task-title, .task-body, .task-deadline {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .task-arrow {
        grid-column: 1/5;
        grid-row: 3/4;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .fa-arrow-left {
        grid-column: 1/2;
        color: #0069D9;
    }

    .fa-arrow-right {
        grid-column: 2/3;
        text-align: right;
        color: #0069D9;
    }

    .task-button {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .task-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-top: 3px;
        padding-right: 5px;
        flex-wrap: wrap;
        align-content: flex-start;
    }

    .task-button i, .task-deadline i {
        padding: 5px;
    }

    .fa-pen:hover, .fa-trash-alt:hover, .fa-arrow-left, .fa-arrow-right {
        cursor: pointer;
    }

    .fa-trash-alt {
        color: rgb(231, 54, 54);
    }
</style>