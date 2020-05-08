const baseUrl = `http://localhost:3000`;

new Vue({
    el: `#app`,
    data: {
        page: `loginPage`,
        loginEmail: '',
        loginPassword: '',
        registerEmail: '',
        registerPassword: '',
        confirmRegisterPassword: null,
        errorMessage: false,
        tasks: [],
        categories: ['Back Log', 'To Do', 'Doing', 'Done'],
        newTitle: '',
        newDescription: '',
        updateTitle: '',
        updateDescription: '',
        updateCategory: '',
        updateUserEmail: '',
        updateTaskId: ''
    },
    methods: {
        register() {
            if(this.confirmRegisterPassword !== this.registerPassword){
                this.errorMessage =`Invalid Confirmation Password`
                this.confirmRegisterPassword = null;
            }
            else {
                axios.post(`${baseUrl}/users/register`, {
                    'email': this.registerEmail,
                    'password': this.registerPassword
                })
                    .then(data => {
                        this.registerEmail = ``;
                        this.registerPassword = ``;
                        this.errorMessage = false;
                        this.page = `loginPage`;
                        $('#formRegister').modal('hide');
                        this.readAllTask();
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data.errors[0].message
                    })
            }
        },
        clearLoginPage() {
            this.errorMessage = false;
            this.loginEmail = '';
            this.loginPassword = '';
            this.registerEmail = '';
            this.registerPassword = '';
        },
        login() {
            axios.post(`${baseUrl}/users/login`, {
                'email': this.loginEmail,
                'password': this.loginPassword
            })
                .then(data => {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('accLogin', data.data.email);
                    this.loginPassword= '';
                    this.page = `mainPage`;
                    this.readAllTask()
                })
                .catch(err => {
                    this.errorMessage = err.response.data.errors[0].message;
                })
        },
        logout() {
            localStorage.clear();
            this.errorMessage = false;
            this.page = `loginPage`;
            this.tasks = [];
            this.loginEmail = '';
            this.loginPassword = '';
        },
        readAllTask() {
            axios.get(`${baseUrl}/tasks`, {headers:{token: localStorage.getItem('token')}})
                .then(data => {
                    $('.taskList').empty();
                    for (let i = 0; i < data.data.tasks.length; i++){
                        this.tasks.push(data.data.tasks[i]);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        newTask() {
            axios.post(`${baseUrl}/tasks`, {
                'title': this.newTitle,
                'description': this.newDescription
            }, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(data => {
                    this.newTitle = '';
                    this.newDescription = '';
                    this.page=`mainPage`;
                    $('#formNewTask').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        clearMainPage() {
            this.newTitle = '';
            this.newDescription = '';
            this.errorMessage = false;
        },
        showUpdateData(spesificTask){
            this.updateTitle= spesificTask.title;
            this.updateDescription= spesificTask.description;
            this.updateCategory= spesificTask.category;
            this.updateUserEmail= spesificTask.UserEmail;
            this.updateTaskId= spesificTask.id;
            // console.log(spesificTask)
        },
        deleteButton(taskId){
            axios.delete(`${baseUrl}/tasks/${taskId}`, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(_ => {
                    this.errorMessage = false;
                    $('#updateForm').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    this.errorMessage = err.response.data.errors[0].message;
                })
        },
        updateBackLogButton(taskId){
            axios.put(`${baseUrl}/tasks/${taskId}`, {
                'title': this.updateTitle,
                'description': this.updateDescription,
                'category': 'Back Log'
            }, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(_ => {
                    this.errorMessage = false;
                    $('#updateForm').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    console.log(err.response.data.errors[0].message)
                    this.errorMessage = err.response.data.errors[0].message;
                })
        },
        updateToDoButton(taskId){
            axios.put(`${baseUrl}/tasks/${taskId}`, {
                'title': this.updateTitle,
                'description': this.updateDescription,
                'category': 'To Do'
            }, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(_ => {
                    this.errorMessage = false;
                    $('#updateForm').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    console.log(err.response)
                    this.errorMessage = err.response.data.errors[0].message;
                })
        },
        updateDoingButton(taskId){
            axios.put(`${baseUrl}/tasks/${taskId}`, {
                'title': this.updateTitle,
                'description': this.updateDescription,
                'category': 'Doing'
            }, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(_ => {
                    this.errorMessage = false;
                    $('#updateForm').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    console.log(err.response)
                    this.errorMessage = err.response.data.errors[0].message;
                })
        },
        updateDoneButton(taskId){
            axios.put(`${baseUrl}/tasks/${taskId}`, {
                'title': this.updateTitle,
                'description': this.updateDescription,
                'category': 'Done'
            }, {
                headers:{token: localStorage.getItem('token')}
            })
                .then(_ => {
                    this.errorMessage = false;
                    $('#updateForm').modal('hide');
                    this.readAllTask();
                })
                .catch(err => {
                    console.log(err.response)
                    this.errorMessage = err.response.data.errors[0].message;
                })
        }
    },
    created() {
        if(localStorage.getItem('token')){
            this.loginEmail = localStorage.getItem('accLogin')
            this.page = `mainPage`;
            this.readAllTask();
        }
    }
})
