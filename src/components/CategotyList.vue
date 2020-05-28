<template>
    <div class="card border-dark mb-3" style="max-width: 100%;">
        <h4 class="card-header text-center" :class="background"><strong>{{ category }}<strong></h4>
        <div v-for="(task, i) in taskList" :key='i'>
            <div class="card-body text-primary my-0">
                <div class="card" :class="border" style="max-width: 100%;">
                    <div class="card-header font-weight-bold text-body" :class="background">{{ task.title }}</div>
                    <div class="card-body text-primary">
                        <p class="text-body mb-1" v-if="task.description">{{ task.description }}</p>
                        <p class="mt-0"><small class="text-muted">created by: {{ task.UserEmail }}</small></p>
                        <div class="text-center">
                            <button type="button" class="text-right btn btn-dark btn-sm" @click.prevent="showUpdateData(task)">
                            Update
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoryList',
    props: ['category', 'tasks'],
    computed: {
        taskList() {
            let data = []
            for(let i = 0; i < this.tasks.length; i++){
                if(this.tasks[i].category == this.category){
                    data.push(this.tasks[i])
                }
            }
            return data
        },
        background() {
            switch (this.category) {
                case 'Back Log':
                    return 'bg-danger'
                case 'To Do':
                    return 'bg-warning'
                case 'Doing':
                    return 'bg-info'
                case 'Done':
                    return 'bg-success'
            }
        },
        border() {
            switch (this.category) {
                case 'Back Log':
                    return 'border-danger'
                case 'To Do':
                    return 'border-warning'
                case 'Doing':
                    return 'border-info'
                case 'Done':
                    return 'border-success'
            }
        }
    },
    methods: {
        showUpdateData(data){
            this.$emit('showUpdateData', data)
        }
    }
}
</script>

<style>

</style>