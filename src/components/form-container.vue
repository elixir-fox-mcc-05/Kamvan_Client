<template>
  <div class="main" v-if="toggleAdd">
    <form>
      <div class="containerlog">
        <h2>{{validation}}</h2>
        <label><b>Point</b></label>
        <input type="text" placeholder="Point" v-model="point" required>
        <label><b>Title</b></label>
        <input type="text" placeholder="Title" v-model="title" required>
        <label><b>Assinged To</b></label>
        <input type="text" placeholder="Assinged To" v-model="assign" required>
        <button type="submit" @click.prevent="createTask">Submit</button>
        <button type="button" class="cancelbtn" @click.prevent="cancle">Cancel</button>
        <a href=""></a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FormContainer',
  data() {
    return {
      point: "",
      title: "",
      assign: "",
      validation: "",
    }
  },
  props: ["toggleAdd"],
  methods: {
    createTask () {

        let data = {
        point: this.point,
        title: this.title,
        assign: this.assign,
        status: localStorage.task
      }
      
      this.$emit('createTask', data)
      this.point = "",
      this.title = "",
      this.assign = ""
      this.$emit('fect')
    },
      cancle () {
        this.point = "",
        this.title = "",
        this.assign = ""
      }
    },
}
</script>

<style scoped>
h2 {
  color: #f44336;
  text-align: center;
}

.main {
  padding: 0 30%;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 5px 0px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #4CAF50;
  color: white;
  margin: 18px 0;
  border: none;
  cursor: pointer;
  width: 49%;
}


/* Extra style for the cancel button (red) */
.cancelbtn {
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Add padding to containers */
.containerlog {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>