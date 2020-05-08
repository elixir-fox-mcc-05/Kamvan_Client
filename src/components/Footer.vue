<template>
  <footer class="fixed-bottom bg-primary d-flex justify-content-center">
    <p
      class="text-white font-weight-normal"
    >Copyright &copy; {{ year }} {{ author }} | Made with &#10084;.</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      author: "Yudha Arief Wijaya",
      year: new Date().getFullYear()
    };
  }
};
</script>

<style>
</style>