<template>
    <div>
        <!-- navbar -->
        <nav class="mb-1 navbar navbar-expand-md navbar-dark unique-color" style="background-color: turquoise;" id="front-navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" href="">KamVan Board</a>
                    <ul class="navbar-nav mr-aut">
                        <li class="nav-item" v-if="!isLogin">
                            <a class="nav-link waves-effect waves-light" v-on:click.prevent='registerForm'>Register</a>
                        </li>
                        <li class="nav-item" v-if="!isLogin">
                            <a class="nav-link waves-effect waves-light" v-on:click.prevent='loginForm'>Login</a>
                        </li>
                        <li class="nav-item" v-if="isLogin">
                            <a class="nav-link waves-effect waves-light" v-on:click.prevent="logout">Logout</a>
                        </li>
                        <li class="nav-item" v-if="isLogin">
                            <a class="nav-link waves-effect waves-light" data-toggle="modal" data-target="#new-task-modal">New Task</a>
                        </li>
                    </ul>
                </div>
            </nav>
        <!-- navbar -->
    
        <!-- login -->
            <div id="login-form" class="col-5 mx-auto my-5" v-if="!isLogin && currentPage == 'login-form'">
                <div><p>{{errMsg}}</p></div>
                <div class="login-title">
                    <h1>Login to KamVan Board App</h1>
                </div>
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailLogin">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="passwordLogin">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
        </div>
        <!-- login -->

        <!-- register -->
            <div id="register-form" class="col-5 mx-auto my-5" v-if="currentPage == 'register-form' && !isLogin">
                <div><p>{{errMsg}}</p></div>
                <div class="register-title">
                    <h1>Register to KamVan Board App</h1>
                </div>
                <form v-on:submit.prevent="register">
                    <div class="form-group">
                        <label for="exampleInputEmail">Username</label>
                        <input  type="text" class="form-control" id="usernameRegister" aria-describedby="emailHelp" placeholder="Enter username" v-model="usernameRegister">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input  type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailRegister">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="passwordRegister" placeholder="Password" v-model="passwordRegister">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Organization</label>
                        <input  type="email" class="form-control" id="organization" aria-describedby="emailHelp" placeholder="Enter email" v-model="organization">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
        <!-- register -->

        <!-- Main Page -->
        <div class="container-md" id="dashboard" v-if="isLogin">
            <div><p>{{errMsg}}</p></div>
            <div class="d-flex p-2">
                <div class="title">
                <h1>KamVan Board</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3" v-for="task in tasks" :key='task.id'>
                    <div class="card">
                        <div class="card-header" v-bind:class="task.color">
                            <p class="text-center">{{task.name}}</p>
                        </div>
                        <div class="card-body" id="ind-card" v-for="data in task.Tasks" :key="data.id">
                            <div class="card">
                                <div class="card-header">
                                    {{data.title}}
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Description: {{data.description}} </p>
                                    <p class="card-text">Points: {{data.point}} </p>
                                    <p class="card-text">Assigned To: {{data.assignedTo}} </p>
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#task-modal" v-on:click.prevent='getItem(data)'>Show Detail</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        <!-- End of Main Page -->

        <!-- Modal New Task -->
        <div class="modal" id="new-task-modal" role="dialog">
            <div><p>{{errMsg}}</p></div>
            <div class="modal-form" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>New Task</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent='addTask'>
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input type="textarea" class="form-control" id="titleCreate" aria-describedby="emailHelp" placeholder="Title" v-model="titleCreate">
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input type="textarea" class="form-control" id="descriptionCreate" aria-describedby="emailHelp" placeholder="Description" v-model="descriptionCreate">
                            </div>
                            <div class="form-group">
                                <label for="description">Point</label>
                                <input type="textarea" class="form-control" id="pointCreate" aria-describedby="emailHelp" placeholder="Point" v-model="pointCreate">
                            </div>
                            <div class="form-group">
                                <label for="assigned_to">Assigned To</label>
                                <input type="textarea" class="form-control" id="assignedToCreate" aria-describedby="emailHelp" placeholder="Assigned To" v-model="assignedToCreate">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" v-on:click.prevent='addTask'>Save </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Modal New Task -->

        <!-- Modal Detail -->
        <div class="modal fade" id="task-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div><p>{{errMsg}}</p></div>
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form v-on:submit.prevent='updateTask'>
                            <div class="form-group">
                                <label for="title">{{title}}</label>
                            </div>
                            <div class="form-group">
                                <label for="description">{{description}}</label>
                            </div>
                            <div class="form-group">
                                <label for="description">{{point}}</label>
                            </div>
                            <div class="form-group">
                                <label for="assigned_to">{{assignedTo}}</label>
                            </div>
                            <div class="form-group">
                                <label for="assigned_to">Status: </label>
                                <input type="textarea" class="form-control" id="StatId" aria-describedby="emailHelp" placeholder="Assigned To" v-model="StatId">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-info" v-on:click.prevent='updateTask'>Update</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" v-on:click.prevent='deleteTask'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end of Modal Detail -->
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                isLogin: false,
                currentPage: 'login-form',
                emailLogin: '',
                passwordLogin: '',
                usernameRegister: '',
                emailRegister: '',
                passwordRegister: '',
                organization: '',
                titleCreate: '',
                descriptionCreate: '',
                pointCreate: '',
                assignedToCreate: '',
                token: localStorage.getItem('token'),
                tasks: [],
                id: 0,
                title: '',
                description: '',
                point: 0,
                assignedTo: '',
                StatId: 0,
                errMsg: ''
            };
        },
        created: function() {
            if (localStorage.getItem('token')) {
                this.isLogin = true
                this.fetchData()
            }
        },
        methods: {
            registerForm() {
                this.isLogin = false
                this.currentPage = 'register-form'
            },
            loginForm() {
                this.isLogin = false
                this.currentPage = 'login-form'
            },
            register() {
                let config = {
                    username: this.usernameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister,
                    organization: this.organization
                }
                axios.post('http://localhost:3000/user/register', config)
                    .then(response => {
                        const {data} = response;
                        this.currentPage = 'login-form'
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            },
            login() {
                let config = {
                    email: this.emailLogin,
                    password: this.passwordLogin
                }
                axios.post('http://localhost:3000/user/login', config)
                    .then(response => {
                        // console.log(response)
                        const {data} = response;
                        const token = data.token;
                        localStorage.setItem('token', token);
                        this.isLogin = true;
                        this.emailLogin = '';
                        this.passwordLogin = '';
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            },
            logout() {
                localStorage.clear()
                this.isLogin = false;
            },
            fetchData() { 
                let config = {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                }
                axios.get('http://localhost:3000/stat', config)
                    .then(result => {
                        // console.log(result)
                        this.tasks = result.data
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            },
            addTask() {
                console.log("masuk")
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/task',
                    data: {
                        title: this.titleCreate,
                        description: this.descriptionCreate,
                        point: this.pointCreate,
                        assignedTo: this.assignedToCreate
                    },
                    headers: {
                        token: this.token
                    }
                })
                    .then(result => {
                        this.fetchData()
                        $('#new-task-modal').modal('hide')
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            },
            getItem(data) {
               this.id = data.id;
               this.title = data.title;
               this.description = data.description;
               this.point = data.point;
               this.assignedTo = data.assignedTo;
               this.StatId = data.StatId;
            },
            updateTask() {
                axios({
                    method: 'put',
                    url: `http://localhost:3000/task/${this.id}`,
                    data: {
                        title: this.title,
                        description: this.description,
                        point: this.point,
                        assignedTo: this.assignedTo,
                        StatId: this.StatId
                    },
                    headers: {
                        token: this.token
                    }
                })
                    .then(result => {
                        this.fetchData()
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            },
            deleteTask() {
                axios({
                    method: 'delete',
                    url: `http://localhost:3000/task/${this.id}`,
                    headers: {
                       token: this.token
                    }
                })
                    .then(result => {
                        this.fetchData()
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.errMsg = '';
                        }, 4000);
                        this.errMsg = err.response.data.msg
                    })
            }
        }
    };
</script>

<style scoped>
</style>