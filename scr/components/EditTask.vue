<template>
 		
			<div class="wrap-contact3">
				<form class="contact3-form validate-form">
					<span class="contact3-form-title">
						Edit Task
					</span>
						<input type="hidden" name="id" v-model="payload.id"> {{dataedit.id}}
					<div class="wrap-input3 validate-input" data-validate="Title is required">
						<input class="input3" type="text" name="title" v-model="payload.title"> 
						<span class="focus-input3"></span>
					</div>

					
					<div class="wrap-input3 validate-input" data-validate = "Description is required">
						<input class="input3" name="description" v-model="payload.description">
						<span class="focus-input3"></span>
					</div>

					<div class="container-contact3-form-btn container-login100-form-btn">
						<button class="contact3-form-btn" @click.prevent="editingTask">
							Submit
						</button>
                        <button class="contact3-form-btn" @click.prevent="cancelbutton">
							Cancel
						</button>
					</div>
				</form>
			</div>
</template>

<script>

import axios from '../axios'
import config from '../config'
import { log } from 'util'
export default {
    name:"AddTask",
    props:['dataedit'],
    data(){
        return{
           payload:{
               id:'',
               title: '',
               description:''
           }
        }
    },
    methods:{
        cancelbutton(){
            this.$emit('canceleditbutton')
        },
        editingTask(){
            axios({
                method:"PUT",
                 url:"/task/"+this.payload.id,
                 data:{
                   title: this.payload.title,
                   description : this.payload.description
                },
                headers:{
                    token:localStorage.token
                }
            })
            .then(result=>{        
                io.connect(config.serverUrl).emit('msg');       
				this.$emit('refreshData')
				Vue.toasted.global.my_app_success({
                    message : 'Edit Task Success'
                });
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    created (){        
        this.payload.id = this.dataedit.idtask
        this.payload.title = this.dataedit.title
        this.payload.description = this.dataedit.description
    }
}
</script>

<style>

</style>