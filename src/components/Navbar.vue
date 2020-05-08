<template>
    <div class="navigation">
        <div class="logo">
            <img src="../../assets/kanban-blue.png" alt="kanban-logo" height="55">
        </div>
        <div class="menu">
            <ul>
                <li class="btn btn-easygreen" v-if="page === 'landing'" @click="$emit('register')">Register</li>
                <li class="btn btn-primary" v-if="page === 'landing'" @click="$emit('login')">Login</li>
                <li class="btn btn-danger" v-if="page === 'main'" @click="$emit('logout')">Logout</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['page']
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

    .btn-easygreen {
        background-color: rgb(153, 230, 39);
        color: white;
    }

    .btn-easygreen:hover {
        background-color: rgb(126, 192, 26);
    }
</style>