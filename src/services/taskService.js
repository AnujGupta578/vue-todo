import Task from "../../public/tasks/task.dto";

export default {
    getTaskList() {
        return Task.taskJsonObj();

    },
}