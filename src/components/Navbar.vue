<template>
    <div class="navigation">
        <div class="logo">
            <img src="../../assets/kanban-blue.png" alt="kanban-logo" height="55">
        </div>
        <div class="menu">
            <ul>
                <li class="btn btn-primary" v-if="page === 'landing'" @click="showLogin">Login</li>
                <li class="btn btn-danger" v-if="page === 'main'" @click="logout">Logout</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['page'],
    methods: {
        showLogin() {
            this.$emit('login');
        },
        logout() {
            this.$emit('logout');
        }
    }
}
</script>

<style scoped>
    .navigation {
        display: flex;
        background-color: #E6F0FB;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
    }

    ul {
        padding-right: 5px;
    }
</style>