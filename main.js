new Vue ({
    el: '#mainPage',
    data: {
        Todos: [
            {
                title: 'Project A',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                point: 10,
                assignee: 'bambang',
                category: 'Back-Log'
            },
            {
                title: 'Project B',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                point: 50,
                assignee: 'tono',
                category: 'Todo'
            },
            {
                title: 'Project C',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
                point: 60,
                assignee: 'diar',
                category: 'Doing'
            },
            {
                title: 'Project D',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                point: 100,
                assignee: 'eka',
                category: 'Done'
            },
        ],
        newTodo: {},
        newTitle: '',
        newDescription: '',
        newPoint: '',
        newAssignee: '',
    },
    methods: {
        createTodo () {
            let newTodo = {
                title: this.newTitle,
                description: this.newDescription,
                point: this.newPoint,
                assigne: this.newAssignee,
                category: 'Back-Log'
            }
            this.newTitle = ''
            this.newDescription = ''
            this.newPoint = ''
            this.newAssignee = ''
            this.Todos.push(newTodo)
        }
    }
})