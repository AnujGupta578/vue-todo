<template>
  <div class="container my-task-container">
    <div class="col-8 offset-2">
      <div class="card border-none">
        <form class name="loginForm" v-on:submit="onSubmit">
          <p v-if="errorMessage !==null && isError">
            <b>Please correct the following error(s):</b>
            <br />
            <span class="error-message">{{errorMessage}}</span>
          </p>
          <div class="col-12 display-flex form-group row">
            <div class="col-8">
              <input
                type="text"
                placeholder="Enter title name..."
                class="form-control"
                name="title"
                v-model="taskObj.name"
                v-validate="'required'"
                autocomplete="false"
                autofocus="false"
              />
            </div>
            <div class="col-4">
              <input
                type="Date"
                class="form-control"
                v-model="taskObj.dueDate"
                v-validate="'required'"
                name="dueDate"
              />
            </div>
          </div>
          <div class="col-12 form-group row">
            <textarea
              type="text"
              rows="4"
              v-model="taskObj.description"
              v-validate="'required'"
              class="task-textarea"
              name="description"
            />
          </div>
          <div class="form-group row">
            <div class="col-12">
              <button
                v-if="!isTaskUpdate"
                class="btn btn-outline-secondary saveTaskBtn"
              >{{isTaskSave ?'Saving...' :'Save'}}</button>

              <button
                v-if="isTaskUpdate"
                class="btn btn-outline-secondary saveTaskBtn"
              >{{isTaskSave ?'Updating...' :'Update'}}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- <taskList
      :taskData="tasks"
      :handleTaskCompleteAction="handleTaskCompleteAction"
      :handleTaskProgress="handleTaskProgress"
      :handleTaskUpdate="handleTaskUpdate"
      :handleTaskRemove="handleTaskRemove"
      v-on:childEvent="childEventHandling"
      v-if="tasks.length > 0"
    ></taskList>-->
    <taskList v-if="tasks.length > 0" :taskData="tasks" v-on:childEvent="childEventHandling"></taskList>
  </div>
</template>
<script>
import taskList from "../components/TaskList";
import { isNotNUllOrUndefined } from "../services/appService";
import Router from "../router/index";
import {
  saveTodoTask,
  getTodoTasks,
  updateTodoTaskById,
  removeTodoTaskById
} from "../services/apiService";

export default {
  name: "myTask",
  data() {
    return {
      tasks: [],
      taskObj: {
        name: null,
        dueDate: null,
        description: null,
        status: "New",
        inProgress: false,
        isCompleted: false
      },
      isTaskSave: false,
      errorMessage: null,
      isError: false,
      isTaskUpdate: false
    };
  },
  methods: {
    onSubmit: function(e) {
      e.preventDefault();
      if (!isNotNUllOrUndefined(this.taskObj.name)) {
        this.errorMessage = "name can not be null";
        this.isError = true;
      } else if (!isNotNUllOrUndefined(this.taskObj.dueDate)) {
        this.errorMessage = "Date can not be null";
        this.isError = true;
      } else if (!isNotNUllOrUndefined(this.taskObj.description)) {
        this.errorMessage = "Description can not be null";
        this.isError = true;
      } else {
        this.isTaskSave = true;
        this.isError = false;
        this.errorMessage = null;
        if (this.isTaskUpdate) {
          var TaskObjIndex = this.tasks.findIndex(
            ele => ele._id === this.taskObj._id
          );
          if (TaskObjIndex === -1) {
            return;
          }
          this.taskObj = {
            ...this.taskObj,
            dueDate: this.taskObj.dueDate
          };
          // Update task
          this.updateTodoTaskCommonMethod(this.taskObj, TaskObjIndex);
          this.isTaskUpdate = false;
          this.resetTaskForm();
          return;
        }
        this.taskObj = {
          ...this.taskObj,
          dueDate: this.taskObj.dueDate
        };
        // save task
        saveTodoTask("task/save", this.taskObj).then(res => {
          if (res.status === 200) {
            this.tasks.push(res.data.data);
          }
        });
        this.resetTaskForm();
      }
    },
    // reset form
    resetTaskForm: function() {
      setTimeout(() => {
        this.isTaskSave = false;
        this.taskObj = {
          name: null,
          dueDate: null,
          description: null,
          status: "New",
          inProgress: false,
          isCompleted: false
        };
      }, 500);
    },
    // Complete Task
    handleTaskCompleteAction: function(e, taskObj, index) {
      if (taskObj.isCompleted) {
        e.preventDefault();
        return;
      }
      taskObj = {
        ...taskObj,
        isCompleted: true,
        inProgress: false,
        status: "Completed"
      };
      this.updateTodoTaskCommonMethod(taskObj, index);
      this.resetTaskForm();
    },
    // In Progress Task
    handleTaskProgress: function(taskObj, index) {
      if (!taskObj.inProgress) {
        taskObj = {
          ...taskObj,
          inProgress: true,
          isCompleted: false,
          status: "New"
        };
        this.updateTodoTaskCommonMethod(taskObj, index);
        return;
      }
      taskObj = {
        ...taskObj,
        inProgress: false,
        isCompleted: false,
        status: "New"
      };
      this.updateTodoTaskCommonMethod(taskObj, index);
    },
    // update task
    updateTodoTaskCommonMethod: function(taskObj, index) {
      updateTodoTaskById(`task/${taskObj._id}`, taskObj).then(res => {
        if (res.status === 200) {
          this.tasks.splice(index, 1, taskObj);
        }
      });
    },

    handleTaskUpdate: function(taskObj) {
      if (taskObj.isCompleted) {
        return;
      }
      this.taskObj = {
        ...taskObj,
        status: "New",
        inProgress: false,
        isCompleted: false,
        dueDate: null
      };

      this.isTaskUpdate = true;
      this.isTaskSave = false;
    },
    // delete task by id
    handleTaskRemove: function(taskObj, index) {
      removeTodoTaskById(`task/${taskObj._id}`).then(res => {
        if (res.status === 200) {
          this.tasks.splice(index, 1, taskObj);
        }
      });
      //
    },

    childEventHandling: function(EventObjRef) {
      // eslint-disable-next-line no-console
      console.log(EventObjRef, "EventObjRef");
      if (EventObjRef["type"]) {
        if (EventObjRef.type === "Task_Completed_Type") {
          this.handleTaskCompleteAction(
            EventObjRef.event,
            EventObjRef.data,
            EventObjRef.index
          );
        } else if (EventObjRef.type === "Task_InProgress_Type") {
          this.handleTaskProgress(EventObjRef.data, EventObjRef.index);
        } else if (EventObjRef.type === "Task_Update_Type") {
          this.handleTaskUpdate(EventObjRef.data);
        } else if (EventObjRef.type === "Task_Delete_Type") {
          this.handleTaskRemove(EventObjRef.data, EventObjRef.index);
        }
      }
    }
  },

  created: function() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || !isNotNUllOrUndefined(isLoggedIn)) {
      Router.push("/login");
      return;
    }
    // fetch all task
    getTodoTasks("tasks").then(res => {
      if (res.status === 200) {
        this.tasks = res.data.data;
      }
    });
  },
  components: {
    taskList: taskList
  },
  events: {
    inprogress: function(data) {
      // `this` in event callbacks are automatically bound
      // to the instance that registered it
      // eslint-disable-next-line no-console
      console.log(data, "parentside");
    }
  }
};
</script>
<style scoped>
.my-task-container {
  margin-top: 105px;
}
.display-flex {
  display: flex;
}
.border-none {
  border: none;
}
.task-textarea {
  margin-left: 17px;
  margin-right: 17px;
  width: 100%;
  max-height: 106px;
  min-height: 78px;
}
.saveTaskBtn {
  float: right;
  width: 120px;
  color: white;
  background: #5595db;
  border: none;
  margin-right: 42px;
}
.error-message {
  color: red;
}
</style>