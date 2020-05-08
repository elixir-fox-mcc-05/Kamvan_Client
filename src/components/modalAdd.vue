<template>

</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            title : ``,
            description : ``,
            point : ``, 
            assignedTo : ``,
            //
            modal : ``,
            modalError : ``,
            modalHasError : false,
        }
    },
    methods : {
        setEditId(val) {
            this.editId = val
        },
        CreateTodo(){
            this.modalHasError = false;
            axios ({
                method : `post`,
                url : `http://localhost:3000/todos`,
                headers : {
                    token : localStorage.getItem(`access_token`)
                },
                data : {
                    title : this.title, 
                    description : this.description, 
                    point : this.point, 
                    assignedTo : this.assignedTo
                }
            })  .then(({data}) => {
                    this.listBackLog = data.Todo
                    this.modal = `modal`
                })  .catch( err => {
                    console.log(err.response)
                    this.modalHasError = true,
                    this.modalError = err.response.data.Error
                })
        }
    }
}
</script>

<style>

</style>