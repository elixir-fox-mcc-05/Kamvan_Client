new Vue({
    el: '#app',
    data: {
        inputTask : {

        },
        tasks : [
            {
                id: 1,
                title: 'Create REST API',
                description: 'Create Rest API',
                points: '20',
                category: 'backlog',
                assignedTo: 'Yohan'
            },
            {
                id: 2,
                title: 'Styling user dashboard',
                description: 'Styling user dashboard',
                points: '25',
                category: 'backlog',
                assignedTo: 'Yohan'
            },
            {
                id: 3,
                title: 'Integration Google Signin',
                description: 'Integration Google Signin to Vue App',
                points: '10',
                category: 'todo',
                assignedTo: 'Yohan'
            },
            {
                id: 4,
                title: 'Deploy Vue App',
                description: 'Deploy Vue App Version 1.0',
                points: '40',
                category: 'done',
                assignedTo: 'Yohan'
            },
            {
                id: 5,
                title: 'Update Draggable Vue',
                description: 'Implementation Draggable on Vue App',
                points: '30',
                category: 'doing',
                assignedTo: 'Yohan'
            }
        ],
        detail : {}
    },
    methods: {
        addTask(){
            this.inputTask.id = this.tasks[this.tasks.length - 1].id + 1;
            this.inputTask.category = 'backlog';
            this.tasks.push(this.inputTask);
            this.inputTask = {};
        },
        deleteTask(id){
            this.tasks = this.tasks.filter(task => {
                return task.id != id;
            })
        },
        detailTask(id){
            let detail = this.tasks.filter(task => {
                return task.id == id;
            })
            this.detail =  detail[0];
        },
        changeCategory(id,cat){
            this.tasks.map(task => {
                if(task.id == id){
                    task.category = cat;
                }
            })
        }
    }
})
$(document).ready(function(){
    $('.modal').modal();
});