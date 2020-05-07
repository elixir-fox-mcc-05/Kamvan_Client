<template>
  <div>
      <button @click.prevent="logout" type="button" class="btn btn-primary btn-xs btn-block">Logout</button>
  </div>
</template>

<script>
export default {
    name : "buttonLogOut",
    methods : {
      logout(){
        this.$emit("logout")
      }
    }
}
</script>

<style>

</style>