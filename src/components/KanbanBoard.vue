<template>
    <div class="kanban-container">
        <KanbanCard 
            :class="{backlog: true}" 
            :title="card[0]" 
            :tasks="backlog" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
        >
        </KanbanCard>
        <KanbanCard 
            :class="{todo: true}" 
            :title="card[1]" 
            :tasks="todo" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
        >
        </KanbanCard>
        <KanbanCard 
            :class="{doing: true}" 
            :title="card[2]" 
            :tasks="doing" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
        >
        </KanbanCard>
        <KanbanCard 
            :class="{done: true}" 
            :title="card[3]" 
            :tasks="done" 
            @showEdit="showEdit" 
            @showDetail="showDetail" 
            @renew="$emit('renew')"
        >
        </KanbanCard>
    </div>
</template>

<script>
import KanbanCard from './KanbanCard';



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
        showEdit(taskEdit) {
            this.$emit('showEdit', taskEdit);
        },
        showDetail(detail) {
            this.$emit('showDetail', detail)
        }
    },
    created() {
        this.separateTask();
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