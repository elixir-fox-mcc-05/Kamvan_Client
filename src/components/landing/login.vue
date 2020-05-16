<template>
    <div>
        <form @submit.prevent = "loginSubmit">
            <h1 style="text-align: center;">Login</h1> <hr>
            <div class="alert alert-danger" id="errRes" v-if="login.error === true">
                <span>{{ login.errMsg }}</span>
            </div>
            <div class="form-group">
                <input type="email" v-model = "login.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <input type="password" v-model = "login.password" class="form-control" id="password" placeholder="password">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary btn-block" >Login</button>
        </form> <br>
    </div>
</template>

<script>
export default {
    name : "login",
    data() {
        return {
                login : {
                email : '',
                password : '',
                error : false,
                errMsg : ''
            }
        }
    },
    methods : {
        // login form
        loginSubmit() {
            let baseUrl = 'http://localhost:3000'
            axios({
                method : 'post',
                url : baseUrl+'/login',
                data : {
                    email : this.login.email,
                    password : this.login.password
                }
            })
            .then(result=>{
                localStorage.setItem('kamvanToken',result.data.token)
                this.confirmLogin();
                // this.fetchTaskList()
            })
            .catch(error=>{
                this.login.error = true
                this.login.errMsg = error.response.data.msg
            })
        },
        confirmLogin() {
            this.$emit('confirmLogin')
        }
    }

}
</script>

<style>

</style>