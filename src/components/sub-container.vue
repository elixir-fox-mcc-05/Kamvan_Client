<template>
  <div>
    <div v-for="(item) in items" :key="item.id">
			<div v-if="item.status == status">
        <div class="title-container">{{item.title}}</div>
        <div class="sub-container-1">
          <button class="cancelbtn" @click.prevent="destroy(item.id)">X</button>
          <p>Point : {{item.point}}</p>
          <p>Title : {{item.title}}</p>
          <p>Assinged To : {{item.assign}}</p>
          <button v-if="item.status != 1" class="actionbtn" @click.prevent="step(item.id,'back', item)">Back</button>
          <button v-if="item.status != 4" class="actionbtn" @click.prevent="step(item.id,'next', item)">Next</button>
        </div> 
			</div>
		</div>
  </div>
</template>
<script>
import axios from 'axios'
	export default {
    name: 'SubContainer',
    props: ['items','status'],
    methods: {
      destroy(item) {
        axios({
          method: 'DELETE',
          url: `https://damp-woodland-07511.herokuapp.com/task/${item}`,
          headers: {
            access_token: localStorage.access_token
          },
        })
          .then((result) => {
            this.$emit('fect')
          })
          .catch((err) => {
            console.log(err);
          })
      },
      step(id, step, task) {
        axios({
          method: 'PATCH',
          url: `https://damp-woodland-07511.herokuapp.com/task/${id}`,
          data: {
            step,
            task
          },
          headers: {
            access_token: localStorage.access_token
          },
        })
          .then((result) => {
            this.$emit('fect')
          })
          .catch((err) => {
            console.log(err);
          })
      },
    },
  }
  
</script>

<style scoped>
.cancelbtn {
  width: 30px;
  background-color: #f44336;
  float: right;
  border-radius: 50px;
}
.actionbtn {
  width: 50px;
  background-color: #442d96;
  border-radius: 50px;
}

.editbtn {
  width: 50px;
  background-color: #84a708;
  border-radius: 50px;
}
</style>