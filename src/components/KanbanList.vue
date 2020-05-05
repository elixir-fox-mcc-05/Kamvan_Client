<template>
  <div class="kanban">
    <div class="card">
      <div class="back-log">
        <h4>Backlog</h4>
      <KanbanCard @refresh="refresh" v-for="data in StatusCheck('backlog')" :key="data.id" :data="data" />
      </div>
      <div class="todo">
        <h4>Todo</h4>
      <KanbanCard @refresh="refresh" v-for="data in StatusCheck('todo')" :key="data.id" :data="data" />
      </div>
      <div class="onprogress">
        <h4>On Progress</h4>
      <KanbanCard @refresh="refresh" v-for="data in StatusCheck('on progress')" :key="data.id" :data="data" />
      </div>
      <div class="done">
        <h4>Done</h4>
      <KanbanCard @refresh="refresh" v-for="data in StatusCheck('done')" :key="data.id" :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import KanbanCard from './KanbanCard'
export default {
  name: 'KanbanList',
  components: {
    KanbanCard
  },
  data () {
    return {
      kanban : []
    }
  },
  methods: {
    getKanban () {
      axios({
        method: 'GET',
        url: 'https://elixir-fox-kanban.herokuapp.com/kanban',
        headers: {
          access_token: localStorage.access_token
          }
      })
      .then((result)=>{
        this.kanban = result.data.result
        // console.log(result.data.result);
      })
    },
    StatusCheck(status){      
      let datafilter=[]
      if(this.kanban != undefined){
        // for (let i in this.kanban) {
        //   if(this.kanban[i].tag == status){
        //     datafilter[i] = this.kanban[i]
        //   }
        // }
        if(this.kanban != undefined){
        datafilter= this.kanban.filter(function (item) { return item.tag == status })
        }
      }
        return datafilter
    },
    refresh () {
      this.getKanban()
    }
  },
  created () {
    this.getKanban()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  width: fit-content;
  background: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.back-log{
  width: 300px;
  min-height: 450px;
  margin: 10px;
}
.todo{
  width: 300px;
  min-height: 450px;
  margin: 10px;
}
.onprogress{
  width: 300px;
  min-height: 450px;
  margin: 10px;
}
.done{
  width: 300px;
  min-height: 450px;
  margin: 10px;
}
h4{
  margin-left: 50px;
}

</style>
