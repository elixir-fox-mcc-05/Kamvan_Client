<template>
  <div class="dashboard">
    <div class="dashboardPage">
      <h3>Welcome back, {{ this.$store.state.userLogin.name }}</h3>
      <hr />
      <Notif class="notif"></Notif>
      <Error class="error"></Error>
      <KanbanList></KanbanList>
    </div>
  </div>
</template>

<script>
import Notif from "../components/Notif";
import Error from "../components/Error";
import KanbanList from "../components/KanbanList";
export default {
  name: "Dashboard",
  data() {
    return {
      detailPage: false
    };
  },
  components: {
    KanbanList,
    Notif,
    Error
  },
  created() {
    if (localStorage.token) {
      this.$store.commit("SET_LOGIN", true);
      this.$store.commit("CHANGE_USERLOGIN", {
        name: localStorage.getItem("userName"),
        id: localStorage.getItem("userId")
      });
    } else {
      this.$store.commit("SET_LOGIN", false);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.dashboardPage {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
hr {
  border: 0.1px solid rgba(0, 0, 0, 0.048);
}
h3 {
  text-align: center;
  font-size: 16px;
  margin: 0 20px 20px;
}
.notif {
  margin-top: 20px;
}
</style>
