<template>
    <div class="col-4 mx-auto my-4">
      <p>{{errMsg}}</p>
        <form id="loginForm" v-on:submit.prevent="login" >
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    props: ['errMsg'],
    data(){
      return{
        email: '',
        password: ''
      }
    },
    methods: {
      login(){
        this.$emit('login', this.email, this.password)
      }
    }
}
</script>

<style>

</style>