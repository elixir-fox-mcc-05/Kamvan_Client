<template>
    <div class="container-fluid text-center" id="errorSection">
        <h4>{{currentErr}}</h4>
    </div>
</template>

<script>
export default {
    name: 'ErrorSection',
    props: [ 'currentErr']
}
</script>

<style>
#errorSection {
    color: red;
}
</style>