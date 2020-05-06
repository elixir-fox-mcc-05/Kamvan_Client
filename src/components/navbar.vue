<template>
    <div class="nav-bar" >
        <ul class="nav nav-tabs" id="navId" style="display:flex; justify-content: space-between; padding: 10px 20px !important">
            <div class="col-xs-1-12" >
                <i class="mdi mdi-format-size cc cc-logo:">Kamvan Board</i>
            </div>
            <li class="nav-item">
                <buttonNewTask></buttonNewTask>
            </li>
        </ul>
    </div>
</template>

<script>
import buttonNewTask from "./button/button-newTask";
export default {
    name : "navbar",
    components : {
        buttonNewTask
    }
};
</script>

<style>

</style>