<template>
  <div class="LoginPage" v-if="!statusPage">
    <div class="formGroup">
      <h1>welcome back, please login</h1>

    <button class="googleButton">Login with Google</button>

    <p class="or">-OR-</p>

      <form>
        <label class="labelSignIn">
          <h4>Email Address</h4>
          <input
            type="email"
            id="emailSignIn"
            class="signInInput userSignInInput"
            
          />
          
        </label>
        <label class="labelSignIn">
          <h4>Password</h4>
          <input
            type="password"
            id="passwordSignIn"
            class="signInInput userSignInInput"
            
          />
        
        </label>
        <input type="submit" value="Sign In" class="submitForm" />
        <p>Don't have an account ? <a href="">Register</a></p>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>

<style scoped>
.LoginPage {
  margin: 120px 10px 0;
  display: flex;
  justify-content: center;
}

.googleButton {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  background: #cc4040;
  text-transform: uppercase;
  border: none;
  width: 80%;
  padding: 10px 20px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.googleButton:hover{
    background: #a13333;
}

.or{
    font-size:18px;
    font-weight: bold;
    color: #313236;
}

.formGroup {
  width: 35vw;
  height: 85vh;
  background: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 150px 40px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.082);
}

form {
  display: flex;
  flex-direction: column;
}

h1 {
  text-transform: uppercase;
  margin-bottom: 30px;
  color: #313236;
}

.labelSignIn {
  display: block;
  width: 24vw;
  margin: 25px auto 0;
  text-align: center;
}

h4 {
  display: flex;
  justify-content: flex-start;
  font-size: 20px;
  color: #778192;
  margin-bottom: 20px;
}

.signInInput {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding: 10px 5px 10px 0px;
  font-size: 16px;
  border-width: 0px;
  border-bottom: 1px solid #31323660;
  text-align: left;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
}

textarea:focus, input:focus{
    outline: none;
    border-bottom: 2px solid #313236;
}

.submitForm {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  background: #64b5f6;
  text-transform: uppercase;
  border: none;
  height: 60px;
  width: 250px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
}

.submitForm:hover {
    background: #59a1db;
}

p {
    font-size: 18px;
    color: #31323694;
}

p a {
    text-decoration: none;
    color: #59a1db;
}

p a:hover {
    color: #313236;
}

</style>
