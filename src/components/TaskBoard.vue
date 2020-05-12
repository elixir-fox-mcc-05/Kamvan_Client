<template>
  <div class="col pl-0 pr-0">
        <div class="container Board">
            <div class="card text-left category-card">
                <div class="card-header container">
                    <div class="row">
                        <div class="col-9 justify-content-center align-items-center">
                            <h4 class="mb-0 text-light">{{category}}</h4>
                        </div>
                        <div class="col-3">
                            <i v-if="category == 'Backlog'" class="fas fa-ambulance icon" id="backlog"></i>
                            <i v-else-if="category == 'Todo'" class="fa fa-wheelchair-alt icon" id="todo"></i>
                            <i v-else-if="category == 'Doing'" class="fas fa-truck icon" id="doing"></i>
                            <i v-else-if="category == 'Done'" class="fas fa-rocket icon" id="done"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body d-flex flex-column pt-4 " id="CardBoard">
                    <TaskCard v-for="Task in TasksList" :key="Task.id"
                        :category="category"
                        :Task="Task"
                        @destroy="destroy"
                        @update="update"
                    >
                    </TaskCard>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>
import TaskCard from '../components/TaskCard'

export default {
    name: "Board",
    components: {
        TaskCard
    },
    props: [ 'category', 'Tasks' ],
    methods: {
        destroy(id) { this.$emit('destroy', id) },
        update(id, Task) { this.$emit('update', id, Task) }

    },
    computed: {
        TasksList() {
            let results = []
            for (let i = 0; i < this.Tasks.length; i++) {
                let Task = this.Tasks[i]
                if (Task.category === this.category) {
                    results.push(Task)
                }
            }
            return results
        }
    }
}
</script>

<style scoped>
#backlog {
    color: red
}
#todo {
    color: orange
}
#doing {
    color: green
}
#done {
    color: royalblue
}
.container {
    margin: 3px;
    max-width: 450px;
    min-width: 200px;
}
.category-card {
    background-color: lightblue;
}
.icon {
    padding: 5px;
    background-color: whitesmoke;
}
</style>