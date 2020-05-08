<template>
  <div class="sub-container">
    <div class="head-container-1">{{headerName}}
      <button class="btn-add" @click="addTask">+</button>
    </div>
		<SubContainer @fect="fect" :items="items" :status="status"></SubContainer>
  </div>
</template>
<script>
import SubContainer from './sub-container'
	export default {
		name: 'MainContainer',
    props: ['items','headerName','status'],
    components : {
    SubContainer,
    },
    methods: {
      addTask(){
        localStorage.task= this.$props.status;
        this.$emit('fect')
        this.$emit('addTask')
        
      },
      fect() {
        this.$emit('fect')
      }
    }
	}
</script>

<style>
  .btn-add {
    width: 30px;
    background-color: green;
    font-weight: bold;
    float: right;
  }
</style>