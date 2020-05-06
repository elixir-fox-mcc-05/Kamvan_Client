<template>
    <section id="landingPage">
        <register></register>
        <login></login>
    </section>
</template>

<script>
import register from './2-1-register'
import login from './2-2-login'

export default {
    name: 'landingPage',
    components: {
        register,
        login
    }
}
</script>

<style>

</style>