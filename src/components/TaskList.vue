<template>
  <div class="col-8 offset-2 padding-lr">
    <div class="card margin-bottom-10" v-for="(task, index) in taskData" v-bind:key="task.id">
      <div
        class="col-12 display-flex"
        :class="task.isCompleted && !task.inProgress?'opecity-on':'opecity-off'"
      >
        <div class="col-1 padding-top-8 text-align-left position-relative">
          <p class="position-absolute left-0">{{index+1}}</p>
        </div>
        <div class="col-1 padding-top-8 text-align-left position-relative">
          <!-- <input
            type="checkbox"
            :checked="task.isCompleted && !task.inProgress"
            class="checkbox-input position-absolute"
            @click="handleTaskCompleteAction($event, task, index)"
            :id="task.name+task.id"
            v-if="!isCompletedView && !inProgressView"
          />-->
          <input
            type="checkbox"
            :checked="task.isCompleted && !task.inProgress"
            class="checkbox-input position-absolute"
            @click="$emit('childEvent',{event:$event,data:task,index:index, type:'Task_Completed_Type'})"
            :id="task.name+task.id"
            v-if="!isCompletedView && !inProgressView"
          />
          <input
            type="checkbox"
            :checked="task.isCompleted && !task.inProgress"
            class="checkbox-input position-absolute"
            @click="stopPropagate($event)"
            :id="task.name+task.id"
            v-if="isCompletedView"
          />
        </div>
        <div
          class="col-6 padding-top-8 text-align-left"
          :class="task.isCompleted && !task.inProgress?'task-finished':'in-process'"
        >
          <label class="task-label">
            <h5>{{task.name}}</h5>
          </label>
          <p class="task-description">{{task.description}}</p>
          <span v-if="task.dueDate">{{task.dueDate.split('T')[0] | moment('MMMM DD, YYYY') }}</span>
        </div>
        <div class="col-4 padding-top-8 text-align-right position-relative">
          <ul class="icon-list position-absolute">
            <li>
              <!-- <img
                @click="handleTaskProgress(task, index)"
                src="icons/inprogress.png"
                :class="task.inProgress?'fade-out':'fade-in'"
                v-if="!isCompletedView && !inProgressView"
              />-->
              <img
                @click="$emit('childEvent',{data:task , index:index, type:'Task_InProgress_Type'})"
                src="icons/inprogress.png"
                :class="task.inProgress?'fade-out':'fade-in'"
                v-if="!isCompletedView && !inProgressView"
              />
              <img
                src="icons/inprogress.png"
                :class="task.inProgress?'fade-out':'fade-in'"
                v-if="inProgressView"
              />
            </li>
            <!-- <li v-if="!isCompletedView && !inProgressView">
              <img src="icons/edit.svg" @click="handleTaskUpdate(task)" />
            </li>-->
            <li v-if="!isCompletedView && !inProgressView">
              <img
                src="icons/edit.svg"
                @click="$emit('childEvent',{data:task, type:'Task_Update_Type'})"
              />
            </li>

            <!-- <li v-if="!isCompletedView && !inProgressView">
              <img src="icons/remove.svg" @click="handleTaskRemove(index,task)" />
            </li>-->
            <li v-if="!isCompletedView && !inProgressView">
              <img
                src="icons/remove.svg"
                @click="$emit('childEvent',{data:task , index:index, type:'Task_Delete_Type'})"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "taskList",
  props: [
    "taskData",
    // "handleTaskCompleteAction",
    // "handleTaskProgress",
    // "handleTaskUpdate",
    // "handleTaskRemove",
    "isCompletedView",
    "inProgressView"
  ],
  methods: {
    stopPropagate: function(e) {
      e.preventDefault();
    }
  },
  filters: {
    dateType: function(value) {
      return value.toLocalString();
    }
  }
};
</script>

<style scoped>
.margin-bottom-10 {
  margin-bottom: 10px;
}
.display-flex {
  display: flex;
  padding: 15px;
}
.icon-list {
  display: inline-flex;
  list-style: none;
}
.icon-list > li > img {
  width: 18px;
  height: 18px;
}
.icon-list > li {
  padding-right: 10px;
}
.padding-top-8 {
  padding-top: 8px;
}
.text-align-left {
  text-align: left;
}
.text-align-right {
  text-align: right;
}
.checkbox-input {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.task-label {
  display: flex;
  margin-bottom: 0;
}
.task-description {
  margin-bottom: 0;
  font-style: italic;
  font-weight: 700;
}
.position-relative {
  position: relative;
}
.position-absolute {
  position: absolute !important;
  top: 40%;
  right: 0;
}
.left-0 {
  left: 0 !important;
}
.padding-lr {
  padding-left: 32px !important;
  padding-right: 55px !important;
}
.fade-in {
  filter: grayscale(1);
}
.fade-out {
  filter: none;
}
.opecity-on {
  filter: opacity(0.5);
}
.opecity-off {
  filter: none;
}
.task-finished {
  text-decoration: line-through;
}
.in-process {
  text-decoration: none;
}
</style>
