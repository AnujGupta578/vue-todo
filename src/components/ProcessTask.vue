<template>
  <div class="col-8 offset-2">
    <taskList :taskData="tasks" :inProgressView="inProgressView"></taskList>
  </div>
</template>

<script>
import taskList from "../components/TaskList";
import { getInProgressTask } from "../services/apiService";
import { isNotNUllOrUndefined } from "../services/appService";
import Router from "../router/index";
export default {
  name: "processTask",
  data() {
    return {
      tasks: [],
      inProgressView: true
    };
  },
  methods: {},
  created: function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || !isNotNUllOrUndefined(isLoggedIn)) {
      Router.push("/login");
      return;
    }
    getInProgressTask("task/inprogress").then(res => {
      if (res.status === 200) {
        this.tasks = res.data.data;
      }
    });
  },
  components: {
    taskList: taskList
  }
};
</script>
<style scoped>
</style>