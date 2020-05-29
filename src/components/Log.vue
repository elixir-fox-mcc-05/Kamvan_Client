<template>
    <div class="columns" v-if="loggedIn" style="position:">
        <div class="column is-6">
        
        <div class="box">
            <h1>Log</h1>
            <p v-for="(log,i) in dataLog" :key="log">{{log}}</p>
        </div>
        </div>
    </div>
</template>

<script>
import {mapGetters,mapState} from 'vuex'
export default {
    name: 'Log',
    props: ['loggedIn','dataLog'],
    computed: {
        ...mapState(['socket'])
    },
    created() {
        this.listenLog()
    },
    methods: {
        listenLog(){
            this.socket.on('log',(log) => {
                console.log(log)
                this.dataLog.push(log)
            })
        }
    },
}
</script>