<template>
    <div class="col pl-0 pr-0">
        <div class="container" id="kanbanBoard">
            <div class="card text-left">
                <div class="card-header text-light bg-dark container">
                    <div class="row ">
                        <div class="col-10 justify-content-center align-items-center">
                            <h4 class="mb-0">{{category}}</h4>
                        </div>
                        <div class="col-1">
                            <i v-if="category == 'Back-Log'" class="fas fa-battery-quarter" id="backLog"></i>
                            <i v-else-if="category == 'Todo'" class="fas fa-battery-half" id="todo"></i>
                            <i v-else-if="category == 'Doing'" class="fas fa-battery-three-quarters" id="doing"></i>
                            <i v-else-if="category == 'Done'" class="fas fa-battery-full" id="done"></i>
                        </div>
                    </div>
                </div>
                <div class="card-body align-items-center pt-4" id="boardBody">
                    <TaskCard v-for="Task in ListTask" :key="Task.id"
                        :category="category"
                        :Task="Task"
                        :Users="Users"
                        @updateTask="updateTask"
                        @changeCategory="changeCategory"
                        @deleteTask="deleteTask"
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
    name: 'kanbanBoard',
    components: {
        TaskCard
    },
    props: [ 'category', 'Tasks', 'Users' ],
    methods: {
        updateTask(id, editedTask) {
            this.$emit('updateTask', id, editedTask)
        },
        changeCategory(id, status) {
            this.$emit('changeCategory', id, status)
        },
        deleteTask(id) {
            this.$emit('deleteTask', id)
        }
    },
    computed: {
        ListTask() {
            let data = []
            for(let i = 0; i < this.Tasks.length; i++) {
                if(this.Tasks[i].category == this.category) {
                    data.push(this.Tasks[i])
                }
            }
            return data
        }
    }
}
</script>

<style scoped>
#backLog {
    color: rgb(194, 3, 3)
}
#todo {
    color: rgb(252, 93, 31)
}
#doing {
    color: yellow;
}
#done {
    color: rgb(4, 233, 4);
}
h4 {
    font-family: 'gilroyBold';
}
#boardBody {
    background-color: #969696;
}
</style>