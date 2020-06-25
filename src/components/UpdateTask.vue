<template>
  <div>
    <div class="addProductPage">
      <div class="addProductGroup">
        <p @click.prevent="closeBtn" class="closeAddForm">close</p>
        <h1>
          Edit Task
        </h1>
        <div class="formInput">
          <label class="labelAddProduct">
            <h4>Task Title:</h4>
            <input
              v-model="editTask.title"
              type="text"
              class="addProductInput"
            />
          </label>
          <label class="labelAddProduct">
            <h4>Description:</h4>
            <input
              v-model="editTask.description"
              type="text"
              class="addProductInput"
            />
          </label>
          <label class="labelAddProduct">
            <h4>Category:</h4>
            <select v-model="editTask.category" class="addProductInput">
              <option disabled value="">Choose category</option>
              <option>Back-Log</option>
              <option>To-Do</option>
              <option>Doing</option>
              <option>Done</option>
            </select>
          </label>
          <input
            @click.prevent="editProductById"
            type="submit"
            class="submitForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import server from "../api";

export default {
  name: "UpdateTask",
  data() {
    return {
      editTask: {
        title: "",
        description: "",
        category: "",
      },
    };
  },
  methods: {
    closeBtn() {
      this.$router.push(`/dashboard`);
    },
    getTaskById() {
      server({
        method: "get",
        url: `/tasks/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then((response) => {
          this.editTask = response.data.task;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editProductById() {
      server({
        method: "put",
        url: `/tasks/${this.$route.params.id}`,
        headers: {
          token: localStorage.token,
        },
        data: {
          title: this.editTask.title,
          description: this.editTask.description,
          category: this.editTask.category,
        },
      })
        .then((response) => {
          this.$router.push("/dashboard");
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.getTaskById();
      this.$store.commit("SET_SIGNIN", true);
    } else {
      this.$store.commit("SET_SIGNIN", false);
    }
  },
};
</script>

<style></style>
