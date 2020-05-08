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

    },
    methods: {
        deleteBtn(id){
            axios({
                method: 'delete',
                url: 'http://localhost:3000/tasks/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then(({data}) => {
                    console.log(data);
                    swal("Yashhh", "Successfully deleted your task", "success");
                    this.$emit('refetchTasks')
                    
                })
                .catch(err => {
                    console.log(err, 'Error');
                    swal("Whopss", "Dont touch someone's task", "error");
                    
                })
        },

        moveUp(id){
            axios({
                method: 'patch',
                url: 'http://localhost:3000/tasks/up/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then((data) => {
                    console.log(data);
                    swal("Yashhh", "Successfully updated your task", "success");
                    this.$emit('refetchTasks')
                })
                .catch(err => {
                    console.log(err, 'Error');
                    swal("Whopss", "Dont touch someone's task", "error");
 
                })
        },

        moveDown(id){
            axios({
                method: 'patch',
                url: 'http://localhost:3000/tasks/down/'+id,
                headers : {
                    access_token: localStorage.token
                }
            })
                .then((data) => {
                    console.log(data);
                    swal("Yashhh", "Successfully updated your task", "success");
                    this.$emit('refetchTasks')

                })
                .catch(err => {
                    console.log(err);
                    swal("Whopss", "Dont touch someone's task", "error");
                })
        }
    }
}

</script>

<style>

</style>