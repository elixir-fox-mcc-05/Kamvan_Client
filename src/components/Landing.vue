<template>
    <div>
        <Jumbotron @modal="showModal"></Jumbotron>
        <ModalLanding 
            :registered="registered"
            :class="{'modal-active': modalActivated}"
            @login="login"
            @showLogin="showLogin"
            @showRegister="showRegister"
            @cancel="closeModal"
        >
        </ModalLanding>
    </div>
</template>

<script>
import Jumbotron from './Jumbotron'
import ModalLanding from './ModalLanding';
export default {
    name: 'Landing',
    props: ['registered'],
    components: {
        ModalLanding, Jumbotron
    },
    data() {
        return {
            modalActivated: false
        }
    },
    methods: {
        showModal() {
            this.modalActivated = true;
        },
        closeModal() {
            this.modalActivated = false;
        },
        login() {
            this.$emit('login');
        },
        showLogin() {
            this.$emit('showLogin');
        },
        showRegister() {
            this.$emit('showRegister');
        }
    }
}
</script>

<style scoped>
    .modal-active {
        visibility: visible;
        opacity: 1;
    }
</style>