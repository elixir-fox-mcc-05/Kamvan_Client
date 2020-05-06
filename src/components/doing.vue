<template>
    <div class="card">
        <div class="card-header" style="background-color: lightblue;">
            <p class="title-card">Doing</p>
        </div>
        <div v-if="doings.Task">
            <innerCard v-for="doing in doings.Task" :key="doing.id" :data="doing"></innerCard>
        </div>
    </div>
</template>

<script>
import innerCard from "./innercard";
export default {
    components : {
        innerCard
    },
    props : ["doings"]
}
</script>

<style>

</style>