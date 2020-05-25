<template>
  <div class="addProductPage">
    <div class="addProductGroup">
      <p @click.prevent="closeBtn" class="closeAddForm">close</p>
      <h1>
        Edit Task
      </h1>
      <div class="formInput">
        <label class="labelAddProduct">
          <h4>Task Title:</h4>
          <input v-model="editTask.title" type="text" class="addProductInput" />
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
          <select v-model="selected" class="selectCategory">
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
</template>

<script>
import server from "../api";
export default {
  name: "EditProduct",
  data() {
    return {
      selected: "",
      editTask: {
        title: "",
        description: "",
        category: ""
      }
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
          token: localStorage.token
        }
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
          token: localStorage.token
        },
        data: {
          title: this.editTask.title,
          description: this.editTask.description,
          category: this.selected
        }
      })
        .then((response) => {
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.$store.commit("CHANGE_MYNOTIF", "");
          this.$store.commit("CHANGE_MYERROR", err.response.data.err);
        });
    }
  },
  created() {
    this.getTaskById();
  }
};
</script>

<style scoped>
.addProductPage {
  height: 100vh;
  width: 100vw;
  padding: 10vh 10px 0;
  display: flex;
  justify-content: center;
  position: fixed;
  background: #f5f6fa;
  z-index: 120;
}

.addProductGroup {
  width: 35vw;
  height: 64vh;
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

.closeAddForm {
  display: flex;
  padding-left: 29vw;
  font-size: 18px;
  position: absolute;
  cursor: pointer;
  color: lightcoral;
}

h1 {
  text-transform: uppercase;
  color: #313236;
  font-size: 20px;
  margin-left: -20vw;
  margin-bottom: 10px;
}

.labelAddProduct {
  display: block;
  width: 24vw;
  margin: 15px 30px;
  text-align: center;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  color: #778192;
}
.selectCategory {
  margin: -15px 0 0 -5vw;
  border-radius: 20px;
  height: 30px;
  width: 250px;
  position: fixed;
}
.addProductInput {
  width: 125%;
  margin-top: 20px;
  font-size: 16px;
  border-width: 0px;
  border-bottom: 1px solid #31323623;
  text-align: left;
  margin-bottom: 20px;
  font-size: 18px;
}

textarea:focus,
input:focus {
  outline: none;
  border-bottom: 1px solid #313236;
}

.submitForm {
  background: #2096f3;
  color: white;
  text-transform: uppercase;
  border: none;
  height: 30px;
  width: 250px;
  font-size: 14px;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  margin-top: 6vh;
}

.submitForm:hover {
  background: #1b80ce;
}
</style>
