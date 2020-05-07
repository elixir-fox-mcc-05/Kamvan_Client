<template>
  <div>
    <nav class="navbar navbar-fixed-top">
      <div class="navbar-left">
        <i class="fab fa-black-tie"></i>
        <p id="logo">Kanban App</p>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-right">
        <button class="logout">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.navbar {
  background-color: white;
  display: flex;
  padding: 20px 60px 20px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.068);
}

.navbar-fixed-top {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1030;
}

.navbar .navbar-left {
  display: flex;
  align-items: center;
}

.navbar .navbar-left i,
#logo {
  color: #64b5f6;
  font-size: 25px;
  margin: 0 10px 0;
}

.navbar-left p {
  font-weight: bold;
  text-transform: uppercase;
}

.navbar .navbar-right {
  display: flex;
  align-items: center;
}

.navbar .navbar-right img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 10px 0;
}

.navbar .navbar-right i {
  font-size: 20px;
  margin: 0 10px 0;
  color: #757575;
}

.logout {
  width: 140px;
  height: 40px;
  border: 1px solid #64b5f6;
  border-radius: 20px;
  color: #64b5f6;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
}

.logout:hover {
  background-color: #64b5f6;
  border: none;
  color: white;
}
</style>
