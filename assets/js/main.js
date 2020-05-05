new Vue({
    el: '#app',
    data: {
        tasks : [
            {
                id: 1,
                title: 'Create REST API',
                description: 'Create Rest API',
                points: '20',
                category: 'backlog'
            },
            {
                id: 2,
                title: 'Styling user dashboard',
                description: 'Styling user dashboard',
                points: '25',
                category: 'backlog'
            },
            {
                id: 3,
                title: 'Integration Google Signin',
                description: 'Integration Google Signin to Vue App',
                points: '10',
                category: 'todo'
            },
            {
                id: 4,
                title: 'Deploy Vue App',
                description: 'Deploy Vue App Version 1.0',
                points: '40',
                category: 'done'
            },
            {
                id: 5,
                title: 'Update Draggable Vue',
                description: 'Implementation Draggable on Vue App',
                points: '30',
                category: 'doing'
            }
        ]
    }
})
$(document).ready(function(){
    $('.modal').modal();
});