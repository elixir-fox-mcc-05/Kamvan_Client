<template>
    <div class="nav-bar" >
        <ul class="nav nav-tabs" id="navId" style="display:flex; justify-content: space-between; padding: 10px 20px !important">
            <div class="col-xs-1-12" >
                <i class="mdi mdi-format-size cc cc-logo:">Kamvan Board</i>
            </div>
            <div style="display:flex; flex-directions:row;">
                <buttonLogin v-if="!loggedIn" @login="login" :message="message" :messageSucces="messageSucces"></buttonLogin>
                <buttonRegister v-if="!loggedIn" @register="register" :messageSucces="messageSucces"></buttonRegister>
                <buttonNewTask v-if="loggedIn" @createTask="createTask" :message="message"></buttonNewTask>
                <buttonLogOut v-if="loggedIn" @logout="logout" :message="message"></buttonLogOut>
            </div>
        </ul>
    </div>
</template>

<script>
import buttonNewTask from "./NavbarComponents/button-newTask";
import buttonLogin from "./NavbarComponents/button-login";
import buttonRegister from "./NavbarComponents/button-register";
import buttonLogOut from "./NavbarComponents/button-logout"
export default {
    name : "navbar",
    components : {
        buttonNewTask,
        buttonLogin,
        buttonRegister,
        buttonLogOut
    },
    props : ["loggedIn", "message", "messageSucces"],
    methods : {
        createTask(data){
            this.$emit("createTask", data)
        },
        login(payload){
            this.$emit("login", payload)
        },
        logout(){
            this.$emit("logout")
        },
        register(data){
            this.$emit("register", data)
        }
    }
};
</script>

<style>

</style>