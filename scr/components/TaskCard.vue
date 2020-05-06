<template>

 <div >
    <div class="card text-black bg-light mb-1 d-flex justify-content-around" >
        <div class="card-header">{{content.title}}</div>
        <div class="card-body">
            <h5 class="card-title">{{content.createAt}}</h5>
            <p class="card-text text-black">{{content.description}}</p>
        </div>
        <div class="card-footer action">
            <button class="fa fa-chevron-circle-left" aria-hidden="true" v-if="content.status !='Backlog'" @click.prevent="updatePrev(content.id,content.status)"></button>
            <button class="fa fa-pencil-square" aria-hidden="true" @click.prevent="upda(content.id,content.title,content.description)"></button>
            <button class="fa fa-trash" aria-hidden="true" @click.prevent="dele(content.id)"></button>
            <button class="fa fa-chevron-circle-right" aria-hidden="true" @click.prevent="updateNext(content.id,content.status)"></button>
        </div>
    </div>
    <div class="card-footer bg-transparent p-0">
        
        <div class="border-0 m-0 p-0" :id="id">No Project: {{content.id}}</div>
        <div class="border-0 m-0 p-0" >
            <ul >Member:
                <li v-for="member in content.Users" :key="member.id" >
                    {{member.username}}
                </li>
            </ul>
            <button class="tn btn-light" @click.prevent="checkmember(content.id)"  >add member</button>              
            <add-member v-if="showModal" :datamember=projectmember @close="showModal = false "></add-member>

         
        </div>
        <div class="d-none" >{{content.status}}</div>
    </div>    
 </div>
</template>

<script>
import addMember from './addmember'
import config from '../config'
import axios from '../axios'
import { log } from 'util'
export default {
    
    name:"TaskCard",
    components:{
        addMember
    },
    props:['content'],
    data(){
        return{
            id :'',
            status:'',
            projectmember:[],
            showModal:false
        }
    },
    methods:{
        checkmember(id){
            this.showModal = true
            axios({
                method:"GET",
                url:"/task/"+id,
                headers:{
                    token:localStorage.token
                }
            })
            .then(result=>{               
                
                // let this.projectmember = result.data.data

                if(this.projectmember != undefined){
                this.projectmember = result.data.data.filter(function (item) { return item.Usertasks.length == 0 });                
                this.projectmember.map(databaru=>{return databaru.idtaskchoosen=id})
                }
            })
            .catch(err=>{
                console.log(err);                
            })
        },  
        upda(id,title,des){           
            this.$emit('editbutton',id,title,des)
        },      
        updateNext(id,status){
           axios({
                method:"PUT",
                url:"/task/forward/"+status+"/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                io.connect(config.serverUrl).emit('msg');
                 Vue.toasted.global.my_app_success({
                    message : 'Succes Update Forward'
                });
                                
            })
            .catch(err=>{
                 Vue.toasted.global.my_app_error({
                    message : 'Not Authorized to Access'
                });
                
                
            })
        },
         updatePrev(id,status){
           axios({
                method:"PUT",
                url:"/task/backward/"+status+"/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                io.connect(config.serverUrl).emit('msg');
                Vue.toasted.global.my_app_success({
                    message : 'Succes Update Backward'
                });
                
            })
            .catch(err=>{
               Vue.toasted.global.my_app_error({
                    message : 'Not Authorized to Access'
                });               
                
            })
        },
        dele(id){
            axios({
                method:"DELETE",
                url:"/task/"+id,
                headers:{
                    token:localStorage.token
                }
           })
            .then(result=>{
                io.connect(config.serverUrl).emit('msg');
                Vue.toasted.global.my_app_success({
                    message : 'Succes Delete'
                });
                
            })
            .catch(err=>{
               Vue.toasted.global.my_app_error({
                    message : 'Not Authorized to Access'
                });
                
                
            })
        }
    }
    
}
</script>

<style>
.action{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>