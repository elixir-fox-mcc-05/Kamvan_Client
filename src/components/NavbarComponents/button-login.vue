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
                            <button @click.prevent = "login" type="submit" class="btn btn-primary"> Submit</button>
                            <button @click.prevent="hide" class="btn btn-primary">Close</button>
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
    methods : {
        show () {
            this.message = ""
            this.messageSucces = ""
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
            this.$emit("login", payload)
            this.email = ''
            this.password = ''
            this.hide()
        }
    },
    props : ["message", "messageSucces"]
}
</script>

<style>

</style>