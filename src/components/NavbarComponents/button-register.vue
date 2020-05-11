<template>
    <div>
        <button class="btn btn-primary btn-xs btn-block" @click.prevent="show">Register</button>
        <modal name="register-Form">
            <div class = "form-style" style="font-size : 22px">
                <div>
                    Register Form
                </div>
                <div v-if="message" style="font-size : 15px !important; color: red;">
                    {{message}}
                </div>
                <div v-if="messageSucces" style="font-size : 15px !important; color: red;">
                    {{messageSucces}}
                </div>
                <div style="font-size : 20px !important;">
                    <form action="" style="display:flex; flex-direction:column; justify-content:space-between">
                        <div style="display:flex; flex-direction:row">
                            <div class="form-group">
                                <label for="email">Email address:</label>
                                <input v-model="email" type="email" class="form-control" placeholder="Enter email" id="email">
                            </div>
                            <div class="form-group">
                                <label for="pwd">Password:</label>
                                <input v-model="password" type="password" class="form-control" placeholder="Enter password" id="pwd">
                            </div>
                        </div>
                        <div style="display:flex; flex-direction:row">
                            <div class="form-group">
                                <label for="confirm-pwd">Confirm Password:</label>
                                <input v-model="confirmPassword" type="password" class="form-control" placeholder="Enter password" id="confirm-pwd">
                            </div>
                            <div class="form-group">
                                <label for="organization">Organization:</label>
                                <input v-model="organization" type="text" class="form-control" placeholder="Enter Organization" id="organization">
                            </div>
                        </div>
                        <div>
                            <button @click.prevent ="register" type="submit" class="btn btn-primary btn-xs btn-block">Submit</button>
                            <button @click.prevent="hide" class="btn btn-primary btn-xs btn-block">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    name : "registerButton",
    data(){
        return {
            email: "",
            password: "",
            confirmPassword : "",
            organization: ""
        }
    },
    props : ["message", "messageSucces"],
    methods : {
        show () {
            this.$modal.show('register-Form');
        },
        hide () {
            this.$modal.hide('register-Form');
        },
        register (){
            let payload = {
                email : this.email,
                password : this.password,
                confirmPassword : this.confirmPassword,
                organization : this.organization
            }
            this.$emit("register", payload)
            this.email = ""
            this.password = ""
            this.confirmPassword = ""
            this.organization = ""
        }
    }
}
</script>

<style>

</style>