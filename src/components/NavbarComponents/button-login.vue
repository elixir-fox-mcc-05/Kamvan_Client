<template>
    <div>
        <button class="btn btn-primary btn-xs btn-block" @click.prevent="show">Login</button>
        <modal name="login-Form">
            <div class = "form-style" style="height: inherit;">
                <div>
                    Login Form
                </div>
                <div v-if="message" style="font-size : 15px !important; color: red;">
                    {{message}}
                </div>
                <div>
                    <form method="post">
                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input v-model="email" type="email" class="form-control" placeholder="Enter email" id="email">
                        </div>
                        <div class="form-group">
                            <label for="pwd">Password:</label>
                            <input v-model="password" type="password" class="form-control" placeholder="Enter password" id="pwd">
                        </div>
                        <div style="display:flex; justify-content:space-between">
                            <div>
                                <button @click.prevent = "login" class="btn btn-primary"> Submit</button>
                                <button @click.prevent="hide" class="btn btn-primary">Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name : "buttonLogin",
    data(){
        return {
            email : "",
            password: ""
        }
    },
    props : ["message", "messageSucces"],
    methods : {
        show () {
            this.$modal.show('login-Form');
        },
        hide () {
            this.$modal.hide('login-Form');
        },
        login(){
            let payload = {
                email : this.email,
                password : this.password
            }
            if(this.$emit("login", payload)){
                this.email = ''
                this.password = ''
            }
        },
        onSignIn(data) {
            this.$emit("onSignIn", data)
        }
    },
    mounted(){
        gapi.load('auth2', function() {
            gapi.auth2.init();
        })
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    }
}
</script>
<style scoped>
</style>