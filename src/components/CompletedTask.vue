<template>
  <div class="col-8 offset-2">
    <taskList :taskData="tasks" :isCompletedView="isCompletedView"></taskList>
  </div>
</template>

<script>
import taskList from "../components/TaskList";
import { getCompletedTask } from "../services/apiService";
import { isNotNUllOrUndefined } from "../services/appService";
import Router from "../router/index";
export default {
  name: "completedTask",
  data() {
    return {
      tasks: [],
      isCompletedView: true
    };
  },
  methods: {},
  created: function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || !isNotNUllOrUndefined(isLoggedIn)) {
      Router.push("/login");
      return;
    }
    getCompletedTask("task/completed").then(res => {
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