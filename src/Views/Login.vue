<template>
  <div class="loginPage">
    <div class="container">
      <h1>
        Welcome to The Greatest Application Ever,
        <span class="kamvan">Kamvan</span>
      </h1>
      <p class="label">Please insert your email and password, to login</p>
      <Notif class="notif"></Notif>
      <Error class="error"></Error>
      <input
        v-model="email"
        class="username"
        type="text"
        placeholder="Enter your email"
      />
      <input
        v-model="password"
        class="username"
        :type="passwordFieldType"
        placeholder="Enter your password"
        @keyup.enter.prevent="login"
      />
      <button @click.prevent="login" class="Login">Login</button>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        class="google"
      ></GoogleLogin>
      <p class="register">
        don't have an account?
        <a @click.prevent="register" href="">register here </a>
      </p>
      <div class="eyeToggle">
        <a
          href=""
          @click.prevent="switchVisibility"
          rel="tooltip"
          data-animate="animated fadeIn"
          data-original-title=""
          data-toggle="tooltip"
          data-placement="bottom"
        >
          <i class="fa fa-eye" v-if="!isShowing"></i>
          <i class="fa fa-eye-slash" v-if="isShowing"></i>
        </a>
      </div>
      <div class="copyright">
        <p>Copyright © 2020</p>
        <p>KamVan's Team. All rights. reserved</p>
      </div>
    </div>
    <div>
      <img src="../assets/bg.png" alt="" />
    </div>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import server from "../api";
import Notif from "../components/Notif";
import Error from "../components/Error";
export default {
  name: "Login",
  components: {
    Notif,
    Error,
    GoogleLogin
  },
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password",
      showPassword: "show",
      isShowing: true,
      show: true,
      message: "",
      errMessage: "",
      params: {
        client_id:
          "228781523398-vdju82mh3d70vtuo76o2q73vkff21f60.apps.googleusercontent.com"
      },
      renderParams: {
        width: 250,
        height: 40,
        longtitle: true,
      }
    };
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    login() {
      server({
        method: "post",
        url: "/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then((response) => {
          this.$store.commit("CHANGE_MYERROR", "");
          this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
          this.$store.dispatch("fetchTaskList");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.name);
          this.$store.commit("SET_LOGIN", true);
          this.$store.commit("CHANGE_USERLOGIN", {
            name: localStorage.getItem("userName")
          });
          this.$router.push("/dashboard");
          (this.user.email = ""), (this.user.password = "");
        })
        .catch((err) => {
          this.$store.commit("CHANGE_MYNOTIF", "");
          this.$store.commit("CHANGE_MYERROR", err.response.data.err);
        });
    },
    switchVisibility() {
      (this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password"),
        (this.isShowing = !this.isShowing);
    },
    onSuccess(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;
      // console.log(id_token);
      server({
        method: "post",
        url: "/google-login",
        headers: {
          google_token: id_token
        }
      }).then((response) => {
        console.log('<++++++++++< masuk google');
        console.log(response,"<+++++++++++++< response")
        this.$store.commit("CHANGE_MYERROR", "");
        this.$store.commit("CHANGE_MYNOTIF", response.data.msg);
        this.$store.dispatch("fetchTaskList");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name);
        this.$store.commit("SET_LOGIN", true);
        this.$store.commit("CHANGE_USERLOGIN", {
          name: localStorage.getItem("userName")
        });
        this.$router.push("/dashboard");
      });
    },
    onFailure() {
      console.log("failed google login");
    }
  },
  created() {
    if (localStorage.token) {
      this.$router.push("/dashboard");
      this.$store.commit("SET_LOGIN", true);
    } else {
      this.$store.commit("SET_LOGIN", false);
    }
  }
};
</script>

<style scoped>
/* Desktops and laptops ----------- */
@media only screen and (min-width: 1224px) {
  .loginPage {
    display: flex;
    position: fixed;
  }
  .container {
    width: 100%;
    height: 100%;
    margin-left: 0;
    display: flex;
    flex-direction: column;
  }
  h1 {
    margin-top: 50px;
    margin-left: 100px;
    font-weight: bold;
    font-size: 40px;
    text-align: left;
    color: #4d4e52;
    width: 40vw;
  }
  .kamvan {
    color: #6e35a7;
  }
  .label {
    text-align: left;
    margin-left: 100px;
    font-size: 23px;
    margin-top: 30px;
    color: #676a6f;
  }
  .username {
    margin-top: 30px;
    margin-left: 100px;
    width: 30vw;
    height: 5vh;
    border: none;
    box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
    border-radius: 20px;
    padding-left: 20px;
    color: #676a6f;
  }
  .username:focus {
    outline: none;
  }
  .eyeToggle {
    margin-top: -28.5vh;
    margin-left: 34vw;
    z-index: 999;
    background: white;
    width: 30px;
    margin-bottom: 14vh;
  }
  .eyeToggle i {
    color: #4d4e52;
  }
  .Login {
    margin-top: 30px;
    margin-left: 100px;
    width: 30vw;
    height: 5vh;
    box-shadow: 0 20px 70px rgba(66, 154, 236, 0.185);
    border-radius: 20px;
    padding-left: 20px;
    background: #6e35a7;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
  .Login:focus {
    outline: none;
  }
  .Login:hover {
    background: #ff7082;
  }
  .google {
    margin-top: 4vh;
    margin-left: 13vw;
    border-radius: 20px;
  }
  .register {
    margin-top: 20px;
    margin-left: -3.5vw;
    font-size: 14px;
  }
  .copyright {
    margin-top: 17vh;
    margin-left: 100px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    margin-bottom: 0;
  }
  img {
    margin-top: 20vh;
    width: 55vw;
    z-index: 9999;
    padding-right: 100px;
  }
  .notif,
  .error {
    padding: 5px;
    margin-bottom: -25px;
    margin-top: 15px;
    width: 30vw;
    margin-left: 7.5vw;
    border-radius: 20px;
  }
}
</style>
