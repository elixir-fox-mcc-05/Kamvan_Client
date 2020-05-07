<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
            <div class="container">
                <a class="navbar-brand" href="">Kamvan</a>
                <ul class="navbar-nav">
                    <li v-show="!isLogin" class="nav-item">
                        <a @click.prevent="$emit('showRegister')" class="nav-link" href="">Register</a>
                    </li>
                    <li v-show="!isLogin" class="nav-item">
                        <a @click.prevent="$emit('showLogin')" class="nav-link" href="">Login</a>
                    </li>
                    <li v-show="isLogin" class="nav-item">
                        <a @click.prevent="$emit('logout')" class="nav-link" href="">Logout</a>
                    </li>
                </ul>
            </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: ['isLogin']
}
</script>

<style>

</style>