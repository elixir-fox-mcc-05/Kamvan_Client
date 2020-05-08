<template>
  <div class="container login-container">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3">KamVan</h1>
        <p class="lead">
          Welcome to KamVan Single Page WebApp.
        </p>
        <p class="my-2">
          The first step in the introduction of Kanban is to visualize the workflow.<br/>
          This is done in the form of a Kanban board consisting of a simple whiteboard and sticky notes or cards. Each card on the board represents a task.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 login-form-2">
        <h3>SignIn</h3>
        <form @submit.prevent="signIn">
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Your Email *"
              v-model="emailSignIn"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              v-model="passwordSignIn"
            />
          </div>
          <div class="form-group d-flex justify-content-center">
            <input type="submit" class="btnSubmit" value="Sign In" />
          </div>
        </form>
        <div
          v-if="successSignIn"
          class="alert alert-success"
          role="alert"
        >{{ successSignInMessage }}</div>
        <div v-if="failedSignIn" class="alert alert-warning" role="alert">{{ failedSignInMessage }}</div>
        <!-- <div class="d-flex justify-content-center g-signin2" data-onsuccess="onSignIn"></div> -->
        <div class="d-flex justify-content-center">
          <button
            v-google-signin-button="clientId"
            class="google-signin-button"
          >Continue with Google</button>
        </div>
      </div>
      <div class="col-md-6 login-form-1">
        <h3>
          SignUp
          <span class="badge badge-secondary">Free</span>
        </h3>
        <form @submit.prevent="signUp">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Your Name *" v-model="nameSignUp" />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Your Email *"
              v-model="emailSignUp"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              v-model="passwordSignUp"
            />
          </div>
          <div class="form-group d-flex justify-content-center">
            <input type="submit" class="btnSubmit" value="Sign Up" />
          </div>
        </form>
        <div
          v-if="successSignUp"
          class="alert alert-success"
          role="alert"
        >{{ successSignUpMessage }}</div>
        <div v-if="failedSignUp" class="alert alert-warning" role="alert">{{ failedSignUpMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GoogleSignInButton from "vue-google-signin-button-directive";

export default {
  name: "LandingPage",
  props: ["serverUrl"],
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      emailSignIn: "",
      passwordSignIn: "",
      successSignIn: false,
      successSignInMessage: "",
      failedSignIn: false,
      failedSignInMessage: "",
      nameSignUp: "",
      emailSignUp: "",
      passwordSignUp: "",
      successSignUp: false,
      successSignUpMessage: "",
      failedSignUp: false,
      failedSignUpMessage: "",
      clientId:
        "399663808216-0up96s702bcag70g0bp3ljorhs1qvpm4.apps.googleusercontent.com"
    };
  },
  methods: {
    authentication() {
      this.$emit("authentication", localStorage.getItem("access_token"));
    },
    signIn() {
      axios({
        method: "post",
        url: this.serverUrl + "/signin",
        data: {
          email: this.emailSignIn,
          password: this.passwordSignIn
        }
      })
        .then(data => {
          this.emailSignIn = "";
          this.passwordSignIn = "";
          this.successSignIn = true;
          this.successSignInMessage = "Signin success!...";
          localStorage.setItem("access_token", data.data.access_token);
          this.authentication();
        })
        .catch(err => {
          this.failedSignInMessage = "";
          this.failedSignIn = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedSignInMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedSignInMessage += "!-- " + err.response.data.message;
          }
        });
    },
    signUp() {
      axios({
        method: "post",
        url: this.serverUrl + "/signup",
        data: {
          name: this.nameSignUp,
          email: this.emailSignUp,
          password: this.passwordSignUp
        }
      })
        .then(data => {
          this.nameSignUp = "";
          this.emailSignUp = "";
          this.passwordSignUp = "";
          this.successSignUp = true;
          this.failedSignUp = false;
          this.successSignUpMessage = "Signup success!...";
        })
        .catch(err => {
          this.failedSignUpMessage = "";
          this.failedSignUp = true;
          let manyError = Array.isArray(err.response.data.message);
          if (manyError) {
            for (let i = 0; i < err.response.data.message.length; i++) {
              this.failedSignUpMessage +=
                "!-- " + err.response.data.message[i]["message"] + " ";
            }
          } else {
            this.failedSignUpMessage += "!-- " + err.response.data.message;
          }
        });
    },
    OnGoogleAuthSuccess(googleUser) {
      const id_token = googleUser;

      axios({
        method: "post",
        url: this.serverUrl + "/google-signin",
        headers: {
          google_token: id_token
        }
      })
        .then(data => {
          localStorage.setItem("access_token", data.data.access_token);
          this.authentication();
        })
        .catch(err => {
          console.log(err);
        });
    },
    OnGoogleAuthFail(error) {
      console.log(error);
    }
  }
};
</script>

<style>
.google-signin-button {
  color: gray;
  background-color: white;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>