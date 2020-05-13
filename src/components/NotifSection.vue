<template>
    <div class="container-fluid text-center" id="notifSection">
        <h4>{{currentNotif}}</h4>
    </div>
</template>

<script>
export default {
    name: 'NotifSection',
    props: [ 'currentNotif']
}
</script>

<style>
#notifSection {
    color: greenyellow
}
</style>