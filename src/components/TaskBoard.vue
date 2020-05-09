<template>
  <div class="col pl-0 pr-0">
        <div class="container Board">
            <div class="card text-left">
                <div class="card-header container">
                    <div class="row">
                        <div class="col-10 justify-content-center align-items-center">
                            <h4 class="mb-0">{{category}}</h4>
                        </div>
                        <div class="col-1">
                            <i v-if="category == 'Backlog'" class="fas fa-ambulance" id="backlog"></i>
                            <i v-else-if="category == 'Todo'" class="fa fa-wheelchair-alt" id="todo"></i>
                            <i v-else-if="category == 'Doing'" class="fas fa-truck" id="doing"></i>
                            <i v-else-if="category == 'Done'" class="fas fa-rocket" id="done"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body align-items-center pt-4" id="Board">
                    <TaskCard v-for="Task in TasksList" :key="Task.id"
                        :category="category"
                        :Task="Task"
                        
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
.Board {
    margin: 3px;
}
</style>