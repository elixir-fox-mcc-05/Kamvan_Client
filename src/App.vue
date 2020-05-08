<template>
<div>
        <div v-if="!logged_in">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">kamvan</a>
                <div class="btn btn-dark ml-auto" id="log-out" v-on:click.prevent="logout" >Logout</div>
            </nav>
        </div>
        
<!-- Register & SignIn -->
    <login
    :logged_in="logged_in"
    :errMsg="errMsg"
    @register="register"
    @login="login"
    ></login>
    <!-- Card -->
    <card
    :logged_in="logged_in"
    :status="status"
    :errMsg="errMsg"
    @logout="logout"
    @createTitle="createTitle"
    @destroy="destroy"
    @edit="edit"
    ></card>
</div>
</template>

<script>
import axios from "axios"
import login from "./components/login"
import card from "./components/card"
export default {
    name : "app",
    components: {
        login, card
    },
    data(){
        return {
            title : [],
            status : [],
            logged_in : true,
            token : localStorage.getItem('token'),
            errMsg : '',
            id : null,
            title : '',
            description : '',
            point : '',
            assignedto : '',

        }
    },
    methods: {
        register(data) {
            axios.post("https://tranquil-everglades-84452.herokuapp.com/users/register", {
                    email: data.email,
                    password: data.password
            })
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    setTimeout(() => {
                        this.errMsg = '';
                    }, 4000);
                    this.errMsg = err.response.data.msg
                })
        },
        login(data){
            axios({
                method: 'post',
                url: 'https://tranquil-everglades-84452.herokuapp.com/users/',
                data: {
                    email: data.email,
                    password: data.password
                }
            })
            .then(data => {
                if(data){
                    localStorage.setItem('token', data.data.token)
                    this.logged_in = false
                }
            })
            .catch(err => {
                setTimeout(() => {
                    this.errMsg = '';
                }, 4000);
                this.errMsg = err.response.data.msg
            })
        },
        logout(){
            localStorage.clear()
            this.logged_in = true;
        },
        fetchStatus(){
            axios.get('https://tranquil-everglades-84452.herokuapp.com/status/')
            .then(data => {
                this.status = data.data.result
            })
            .catch(err => {
                console.log(err)
            })
        },
        createTitle(data) {
            axios({
                method: 'post',
                url: 'https://tranquil-everglades-84452.herokuapp.com/title/',
                data: {
                    title : data.title,
                    description : data.description,
                    point : data.point,
                    assignedto : data.assignedto
                },
                headers : {
                    token : this.token
                }
            })
                .then(result => {
                    this.fetchStatus()
                    $('#ModalNewTask').modal('hide')
                })
                .catch(err => {
                    setTimeout(() => {
                        this.errMsg = '';
                    }, 2000);
                    this.errMsg = err.response.data.msg
                })
        },
        destroy(id) {
        axios({
            method: 'delete',
            url: `https://tranquil-everglades-84452.herokuapp.com/title/${id}`,
            headers : {
                token : this.token
            }
        })
            .then(result => {
                this.fetchStatus()
                $('#ModalCard').modal('hide')
            })
            .catch(err => {
                setTimeout(() => {
                    this.errMsg = '';
                }, 2000);
                this.errMsg = err.response.data.msg
            })
        },
        edit(data) {
            console.log('masuk')
            console.log('ini id ==> ',data.id)
            axios({
                method: 'put',
                url: `https://tranquil-everglades-84452.herokuapp.com/title/${data.id}`,
                data: {
                    description : data.description,
                    StatusId : data.StatusId  
                },
                headers : {
                    token : this.token
                }
            })
                .then(result => {
                    this.fetchStatus()
                    $('#ModalNewTask').modal('hide')
                })
                .catch(err => {
                    setTimeout(() => {
                        this.errMsg = '';
                    }, 2000);
                    this.errMsg = err.response.data.msg
                })
        }

    },
    created(){
        if(this.token){
            this.fetchStatus()
            this.logged_in = false
        } 
    },
}
</script>

<style>

</style>