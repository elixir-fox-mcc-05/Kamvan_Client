<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-white bg-primary">
                {{ category }}
            </div>
            <div class="card-body" id="main-body">
                <div v-if="tasks.length>0">
                    <kanbanCard v-for="task in tasks" :key="task.id" :task="task"></kanbanCard>
                </div>
            </div>
            <!-- Add Button -->
            <div class="add-btn bg-primary">
                <font-awesome-icon :icon="['fas', 'user-secret']"/>
            </div>
    </div>
</template>

<script>
import kanbanCard from './KanbanCard';

export default {
    name:'ListKanban',
    props: ['category', 'tasks'],
    components: {
        kanbanCard
    }
}
</script>

<style>
.mini-container {
    margin: 10px;
    width: 100%;
}

.btn-kanban {
    display: flex;
    align-content: space-around;
}

.add-btn {
	position: fixed;
	bottom: 15px;
	right: 15px;
	/* background-color: #05d595; */
	border-radius: 100%;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: .5s;
	cursor: pointer;
}

.add-btn i {
	font-size: 30px;
	color: white;
}

.add-btn:hover {
	transform: scale(1.2);
	font-weight: bold;
}
</style>