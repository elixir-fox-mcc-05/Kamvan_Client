<template>
  <div>
      <navbar></navbar>
      <card :backlogs="backlogs" :todos="todos" :doings="doings" :dones="dones"></card>
  </div>
</template>

<script>
import axios from "axios";
import navbar from "./components/navbar";
import card from "./components/card";
export default {
    name : "App",
    components : {
        navbar, card
    },
    data() {
        return {
            backlogs : [],
            todos : [],
            doings : [],
            dones : []
        }
    },
    methods : {
        fetchData(){
            axios ({
                methods : "get",
                url : "http://localhost:3000/task/backlogs",
                headers : {
                    token :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5b2RqaTA5QGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6ImhhY2t0aXY4IiwiaWF0IjoxNTg4NzY5OTMzfQ.KifC98D5u6d_XdUNHsAtqSdMOZSTpTdGD8Nr-DO0mtI"
                }
                })
                .then(({data}) => {
                    this.backlogs = data;
                    return axios({
                        url : "http://localhost:3000/task/todos",
                        methods : "get",
                        headers : {
                                    token :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5b2RqaTA5QGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6ImhhY2t0aXY4IiwiaWF0IjoxNTg4NzY5OTMzfQ.KifC98D5u6d_XdUNHsAtqSdMOZSTpTdGD8Nr-DO0mtI"
                                }
                        });
                })
                .then(({data}) =>{
                    this.todos = data;
                    return axios({
                        url : "http://localhost:3000/task/doings",
                        methods : "get",
                        headers : {
                                    token :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5b2RqaTA5QGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6ImhhY2t0aXY4IiwiaWF0IjoxNTg4NzY5OTMzfQ.KifC98D5u6d_XdUNHsAtqSdMOZSTpTdGD8Nr-DO0mtI"
                                }
                        });
                })
                .then(({data})=>{
                    this.doings = data;
                    return axios({
                        url : "http://localhost:3000/task/todos",
                        methods : "get",
                        headers : {
                                    token :  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ5b2RqaTA5QGdtYWlsLmNvbSIsIm9yZ2FuaXphdGlvbiI6ImhhY2t0aXY4IiwiaWF0IjoxNTg4NzY5OTMzfQ.KifC98D5u6d_XdUNHsAtqSdMOZSTpTdGD8Nr-DO0mtI"
                                }
                        });
                })
                .then(({data})=>{
                    this.dones = data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.fetchData();
    }
};
</script>

<style>

</style>