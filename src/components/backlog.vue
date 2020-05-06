<template>
    <div class="card">
        <div class="card-header" style="background-color: black;">
            <p class="title-card">Back-Log</p>
        </div>
        <div v-if="backlogs.Task">
            <innerCard v-for="data in backlogs.Task" :key="data.id" :data="data"></innerCard>
        </div>
    </div>
</template>

<script>
import innerCard from "./innercard";
export default {
    name : "backlogs",
    components : {
        innerCard
    },
    props : ["backlogs"]
};
</script>

<style>

</style>