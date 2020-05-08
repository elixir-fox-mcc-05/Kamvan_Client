<template>
    <div class="modal-bg">
        <div class="container bg-light mt-5 w-25 mb-5 pb-3">
            <CascadeButton 
                :registered="registered"
                @login="showLogin"
                @register="showRegister"
            >
            </CascadeButton>
            <RegisterForm 
                :registered="registered"
                @cancel="cancel"
                @login="login"
                @showLogin="showLogin"
                v-if="!registered"
            >
            </RegisterForm>
            <LoginForm 
                :registered="registered"
                @login="login"
                @cancel="cancel"
                v-if="registered"
            >
            </LoginForm>
        </div>
    </div>
</template>

<script>
import CascadeButton from './Cascade-Button';
import RegisterForm from './Register';
import LoginForm from './Login';
export default {
    name: 'ModalLanding',
    props: ['registered'],
    components: {
        CascadeButton, RegisterForm, LoginForm
    },
    data() {
        return {
            
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        login() {
            this.$emit('login');
        },
        showLogin() {
            this.$emit('showLogin');
        },
        showRegister() {
            this.$emit('showRegister')
        }
    }
}
</script>

<style scoped>
    .modal-bg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.5s, opacity 0.5s;
    }
</style>