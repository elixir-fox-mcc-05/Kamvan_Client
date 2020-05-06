<template>
    <div class="card">
        <div class="card-header" style="background-color: green;">
            <p class="title-card">Done</p>
        </div>
        <div v-if="dones.Task">
            <innerCard v-for="done in dones.Task" :key="done.id" :data="done"></innerCard>
        </div>
    </div>
</template>

<script>
import innerCard from "./innercard";
export default {
    components : {
        innerCard
    },
    props : ["dones"]
};
</script>

<style>

</style>