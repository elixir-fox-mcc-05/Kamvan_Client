<template>
    <div class="kanban-container">
        <KanbanCard 
            ref="card"
            :class="{backlog: true}" 
            :title="card[0]" 
            :tasks="backlog" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
            @moveLeft="moveLeft"
            @moveRight="moveRight"
            @deleteTask="deleteTask"
            @changeStage="changeStage"
        >
        </KanbanCard>
        <KanbanCard 
            ref="card"
            :class="{todo: true}" 
            :title="card[1]" 
            :tasks="todo" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
            @moveLeft="moveLeft"
            @moveRight="moveRight"
            @deleteTask="deleteTask"
            @changeStage="changeStage"
        >
        </KanbanCard>
        <KanbanCard 
            ref="card"
            :class="{doing: true}" 
            :title="card[2]" 
            :tasks="doing" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
            @moveLeft="moveLeft"
            @moveRight="moveRight"
            @deleteTask="deleteTask"
            @changeStage="changeStage"
        >
        </KanbanCard>
        <KanbanCard 
            ref="card"
            :class="{done: true}" 
            :title="card[3]" 
            :tasks="done" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
            @moveLeft="moveLeft"
            @moveRight="moveRight"
            @deleteTask="deleteTask"
            @changeStage="changeStage"
        >
        </KanbanCard>
    </div>
</template>

<script>
import KanbanCard from './KanbanCard';
import axios from 'axios';


export default {
    name: 'KanbanBoard',
    components: {
        KanbanCard
    },
    props: ['tasks'],
    data() {
        return {
            card: ['backlog', 'todo', 'doing', 'done'],
            backlog: [],
            todo: [],
            doing: [],
            done: []
        }
    },
    methods: {
        separateTask() {
            this.backlog = [];
            this.todo = [];
            this.doing = [];
            this.done = [];
            this.tasks.forEach(task => {
                if(task.category === 'backlog') {
                    this.backlog.push(task);
                } else if (task.category === 'todo') {
                    this.todo.push(task);
                } else if (task.category === 'doing') {
                    this.doing.push(task);
                } else if (task.category === 'done') {
                    this.done.push(task);
                }
            })
        },
        changeStage(task, card) {
            if(task.length) {
                task.forEach(ticket => {
                    if(ticket.category !== card) {
                        const id = ticket.id;
                        const newCategory = card;
                        this.changeCategory(id, newCategory);
                    }
                })
            }
        },
        showEdit(taskEdit) {
            this.$emit('showEdit', taskEdit);
        },
        showDetail(detail) {
            this.$emit('showDetail', detail)
        },
        moveLeft(movedTask) {
            const index = this.card.indexOf(movedTask.category);
            let newCategory = this.card[index-1];
            this.changeCategory(movedTask.id, newCategory);
        },
        moveRight(movedTask) {
            const index = this.card.indexOf(movedTask.category);
            let newCategory = this.card[index+1];
            this.changeCategory(movedTask.id, newCategory);
        },
        changeCategory(id, category) {
            const{ access_token } = localStorage;
            axios.patch(`https://server-akbar-kanban.herokuapp.com/tasks/${id}`, {
                category
            },{
                headers: {
                    access_token
                }
            })
                .then(res => {
                    this.$emit('renew');
                })
                .catch(err => {
                    this.$emit('tempError', err);
                })
        },
        deleteTask(id) {
            this.$emit('deleteTask', id);
        }
    }
}
</script>

<style scoped>
    .kanban-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>