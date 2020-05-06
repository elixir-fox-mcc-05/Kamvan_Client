<template>
    <div class="card-body">
        <div class="inner-card" style="border: 2px solid; padding: 10px; box-shadow: 5px 10px #888888;">
            <h4 class="card-title">{{data.title}}</h4>
            <p class="card-text"> point : {{data.point}} <br> Assigned To : {{data.assigned}}
            </p>
            <buttonCard></buttonCard>
        </div>
    </div>
</template>

<script>
import buttonCard from "./button/button-detail.vue";
export default {
    name : "innercard",
    props : ["data"],
    components : {
        buttonCard
    }
};
</script>

<style>

</style>