<template>
  <div class="login">
    <div class="container">
      <div class="col-8 offset-2">
        <div class="card text-center border-none">
          <div class="card-body padding">
            <form class name="loginForm" v-on:submit="onSubmit">
              <div class="form-group row">
                <div class="col-9 offset-3">
                  <input
                    type="text"
                    placeholder="+ Username"
                    class="form-control"
                    name="username"
                    v-model="login.userName"
                    v-validate="'required'"
                    autocomplete="false"
                    autofocus="false"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-9 offset-3">
                  <input
                    type="password"
                    placeholder="+ Password"
                    class="form-control"
                    name="password"
                    v-model="login.password"
                    v-validate="'required'"
                    autocomplete="false"
                    autofocus="false"
                  />
                </div>
              </div>
              <div v-if="!valid" class="error">Invalid Credentials...Please try again...</div>
              <br />

              <div class="form-group row">
                <div class="col-12">
                  <button class="btn btn-outline-secondary loginBtn">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Router from "../router/index";
import { getAuthUsers } from "../services/apiService";
export default {
  name: "login",
  data() {
    return {
      pagename: "",
      valid: true,
      isLoggedIn: "false",
      users: [],
      login: { userName: null, password: null }
    };
  },
  methods: {
    onSubmit: function(e) {
      this.valid = true;
      var name = this.login.userName;
      var password = this.login.password;
      sessionStorage.setItem("username", this.login.userName);
      var user = this.users.filter(
        user => user.userName === name && user.password === password
      )[0];
      if (user) {
        this.isLoggedIn = "true";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        Router.push("/my-task");
      } else {
        this.isLoggedIn = "false";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        this.valid = false;
      }
      e.preventDefault();
    }
  },
  created: function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      Router.push("/my-task");
      return;
    }
    getAuthUsers().then(res => {
      this.users = res.data;
    });
  }
};
</script>

<style scoped>
.container-styles {
  top: 180px;
}

.padding {
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.link-underline {
  color: #337ab7;
  text-decoration: underline;
}

.error {
  color: red;
  position: relative;
  left: 50px;
}

.loginBtn {
  float: right;
  width: 120px;
  color: white;
  background: #5595db;
  border: none;
}
.login {
  margin-top: 74px;
}
.border-none {
  border: none;
}
</style>
