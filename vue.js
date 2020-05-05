new Vue({
    el: '#app',
    data: {
        token: 'BYUgbyuSG&BADBA&DW7ds*78678dys7BUH7sdguw2ED',
        taskTitle: '',
        taskDescription: '',
        taskDueDate: '',
        page: 'landing',
        loginEmail: '',
        loginPassword: '',
        alertMessage: '',
        registered: false,
        registrationName: '',
        registrationEmail: '',
        registrationPassword: '',
        username: '',
        backlog: [],
        todo: [],
        doing: [],
        done: []
    },
    methods: {
        register() {
            axios.post('http://localhost:3000/user', {
                "id": 8,
                "name": this.registrationName,
                "email": this.registrationEmail,
                "password": this.registrationPassword
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> {
                    console.log(res);
                    this.registrationName = '';
                    this.registrationEmail = '';
                    this.registrationPassword = '';
                    this.alertMessage = '';
                    this.registered = true;
                })
                .catch(err => {
                    this.alertMessage = err.message;
                })
        },
        login() {
            axios.get('http://localhost:3000/user')
                .then(res => {
                    const found = res.data.some(user => user.email === this.loginEmail && user.password === this.loginPassword);
                    if (found) {
                        this.page = 'main';
                        this.loginEmail = '';
                        this.loginPassword = '';
                        localStorage.setItem('access_token', this.token);
                        this.showAllTask();
                        this.alertMessage = '';
                    } else {
                        this.alertMessage = 'Invalid Email/Password';
                    }
                })
                .catch(err =>{
                    this.alertMessage = err.message
                })
        },
        showAllTask() {
            axios.get('http://localhost:3000/task')
                .then(res => {
                    res.data.forEach(task => {
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
                })
                .catch(err =>{
                    this.alertMessage = err.message
                })
        },
        addNewTask() {
            axios.post('http://localhost:3000/task', {
                "id": 5,
                "title": this.taskTitle,
                "category": 'backlog',
                "due_date": this.taskDueDate,
                "description": this.taskDescription
            },{
                headers:{
                    'Content-Type': 'application/json'
                }
            })
                .then(res=> {
                    this.taskTitle = '';
                    this.taskDescription = '';
                    this.taskDueDate = '';
                    this.alertMessage = '';
                })
                .catch(err => {
                    this.alertMessage = err.message;
                })
        },
        logout() {
            localStorage.removeItem('access_token');
            this.page = 'landing';
        },
        showLoginForm() {
            this.registered = true;
        },
        deleteTask(id) {
            axios.delete(`http://localhost:3000/task/${id}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    this.alertMessage = err.message;
                })
        }
    },
    created() {
        if(localStorage.access_token) {
            this.page = 'main'
        }
        this.showAllTask();
    }
})