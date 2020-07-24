<template>
    <div class="container containerBtn">
        <div class="row" v-if="card.category=='backlog'">
            <div class="col-sm"></div>
            <div class="col-sm">
            <button type="button" class="btn btn-danger btn-sm deleteBtn" @click="deleteBtn(card.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="col-sm">
            <button type="button" class="btn btn-primary btn-sm moveBtn" @click="moveUp(card.id)"><i class="fas fa-angle-double-right"></i></button>
            </div>
        </div>
        <div class="row" v-if="card.category=='todo'|| card.category=='doing'">
            <div class="col-sm" >
            <button type="button" class="btn btn-primary btn-sm moveBtn" @click="moveDown(card.id)"><i class="fas fa-angle-double-left"></i></button>
            </div>
            <div class="col-sm">
            <button type="button" class="btn btn-danger btn-sm deleteBtn" @click="deleteBtn(card.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="col-sm">
            <button type="button" class="btn btn-primary btn-sm moveBtn" @click="moveUp(card.id)"><i class="fas fa-angle-double-right"></i></button>
            </div>
        </div>
        <div class="row"  v-if="card.category=='done'">
            <div class="col-sm">
            <button type="button" class="btn btn-primary btn-sm moveBtn" @click="moveDown(card.id)"><i class="fas fa-angle-double-left"></i></button>
            </div>
            <div class="col-sm">
            <button type="button" class="btn btn-danger btn-sm deleteBtn" @click="deleteBtn(card.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'ButtonController',
    props: ['card'],
    data(){
        return {}
    },
    methods: {
        deleteBtn(id){
            axios({
                method: 'delete',
                url: 'https://fierce-reef-02367.herokuapp.com/tasks/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then(({data}) => {
                    swal("Yashhh", data.msg, "success");
                    this.$emit('refetchTasks')
                    
                })
                .catch(err => {
                    swal("Whopss", err.response.data.errors[0].message, "error");
                    
                })
        },

        moveUp(id){
            axios({
                method: 'patch',
                url: 'https://fierce-reef-02367.herokuapp.com/tasks/up/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then((data) => {
                    swal("Yashhh", data.data.msg, "success");
                    this.$emit('refetchTasks')
                })
                .catch(err => {
                    swal("Whopss", err.response.data.errors[0].message, "error");
 
                })
        },

        moveDown(id){
            axios({
                method: 'patch',
                url: 'https://fierce-reef-02367.herokuapp.com/tasks/down/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then((data) => {
                    swal("Yashhh", data.data.msg, "success");
                    this.$emit('refetchTasks')

                })
                .catch(err => {
                    swal("Whopss", err.response.data.errors[0].message, "error");
                })
        }
    }
}

</script>

<style>

</style>