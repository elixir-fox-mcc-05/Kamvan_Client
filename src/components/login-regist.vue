<template>
  <div class="main">
    <form>
      <div class="containerlog">
        
        <h2>{{loginMsg}}</h2>
        <h1>{{logReg}}</h1>
        <label for="uname"><b>Username</b></label>
        <input type="text" placeholder="Enter Username" name="uname" v-model="email" required>
        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="psw" v-model="password" required>
        <button type="submit" @click.prevent="login">Submit</button>
        <button type="button" class="cancelbtn" @click.prevent="cancle">Cancel</button>
        <a v-if="!reg" href @click.prevent="register">Dint Have Account ?</a>
        <a v-if="reg" href="">Have Account ?</a>
        <GoogleLogin></GoogleLogin>
      </div>
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
import GoogleLogin from './google-signin'
export default {
  name: 'LoginRegist',
  props: ['currentPage'],
  data() {
    return {
      reg: false,
      logReg: 'login',
      regLog: 'register',
      email: "",
      password: "",
      loginMsg: "",
    }
  },
  components: {
    GoogleLogin
  },
  methods: {
      loging() {
        currentPage = 'login'
        this.$emit('loging')
      },
      login () {
        axios({
          method: 'POST',
          url: `https://damp-woodland-07511.herokuapp.com/user/${this.logReg}`,
          data: {
            email : this.email,
            password: this.password
          }
        })
          .then((result) => {
            localStorage.setItem('access_token', result.data.access_token)
            this.currentPage ='login'
            this.$emit('loging')
          })
          .catch((err) => {
            console.log(err);
            this.loginMsg = 'Wrong email / password'
          })
      },
      cancle () {
        this.email= '',
        this.password= ''
      },
      register () {
        this.reg = true
        this.email= '',
        this.password= ''
        this.logReg= 'register',
        this.regLog= 'login',
        this.logMsg='Already Have Account ?'
      },
    },
}
</script>

<style scoped>
h2 {
  color: #f44336;
  text-align: center;
}

.main {
  padding: 10% 30%;
}
/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
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
  width: 32%;
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