<template>
  <div>
    <NavigationBar :AppName="AppName" :signedIn="signedIn" @authentication="authentication"></NavigationBar>
    <LandingPage v-if="!signedIn" :serverUrl="serverUrl" @authentication="authentication"></LandingPage>
    <KamVanBoard v-if="signedIn" :serverUrl="serverUrl" @authentication="authentication"></KamVanBoard>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import NavigationBar from "./components/NavigationBar";
import LandingPage from "./components/LandingPage";
import KamVanBoard from "./components/KamVanBoard";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    NavigationBar,
    LandingPage,
    KamVanBoard,
    Footer
  },
  data() {
    return {
      AppName: "KamVan Board",
      serverUrl: "http://localhost:3000",
      signedIn: false
    };
  },
  methods: {
    isSignedIn() {
      localStorage.access_token
        ? (this.signedIn = true)
        : (this.signedIn = false);
    },
    authentication(token) {
      token ? (this.signedIn = true) : (this.signedIn = false);
    }
  },
  created() {
    this.isSignedIn();
  }
};
</script>

<style>
</style>