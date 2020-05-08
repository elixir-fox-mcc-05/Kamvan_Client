<template>
    <div>      
        <div class="card" id="custom-card">
            <h3 class="card-header">{{tasks.title}}</h3>
            <div class="card-body">
                <p class="card-text">Point: {{tasks.point}}</p>
                <p class="card-text">Assigned To: {{tasks.assigned_to}}</p>
                <a href="#!" class="btn btn-primary">Show Detail</a>
            </div>
        </div>   
    </div>
</template>

<script>
// export default {
//     name: 'TaskCard',
//     props: ['tasks']
// }
// </script>

<style>

</style>