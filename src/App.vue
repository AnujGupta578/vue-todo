<template class="app-template">
  <div id="app">
    <nav class="navbar navbar-expand-md fixed-top padding-nav0">
      <div class="container-fluid">
        <ul class="nav-menu menu-ul">
          <li>
            <router-link to="/my-task" active-class="active">My Task</router-link>
          </li>
          <li>
            <router-link to="/process-task" active-class="active">In Progress</router-link>
          </li>
          <li>
            <router-link to="/completed-task" active-class="active">Completed</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

.padding-nav0 {
  padding: 0;
}

.app-template {
  background: lightgray;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container-fluid {
  background: #5595db;
}
.nav-menu {
  display: -webkit-inline-box;
  text-align: center;
  list-style: none;
}
.nav-menu > li {
  padding: 10px;
  cursor: pointer;
}

.nav-menu > li > a {
  text-decoration: none;
  color: #575757;
  position: relative;
}

.menu-ul {
  margin-left: auto;
  margin-right: auto;
  margin-top: 14px;
}

nav li a.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #fcfafa;
  width: auto;
  margin: auto;
  top: 19px;
}
</style>
