<template>
    <div class="container">
        <Header></Header>
        <ListStatus></ListStatus>
    </div>
</template>

<script>
import Header from './components/Header'
import ListStatus from './components/ListStatus'

export default {
    name: 'App',
    components: {
        Header,
        ListStatus
    },
    data() {
        return {

        };
    },
};
</script>

<style scoped>
</style>