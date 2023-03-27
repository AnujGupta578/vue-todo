import axios from 'axios'

var BASE_API_URL = 'http://localhost:3000';

export function saveTodoTask(api, data) {
    return axios.post(`${BASE_API_URL}/${api}`, data);
}
export function getTodoTasks(api) {
    return axios.get(`${BASE_API_URL}/${api}`);
}

export function getTodoTaskById(api) {
    return axios.get(`${BASE_API_URL}/${api}`);
}

export function updateTodoTaskById(api, data) {
    return axios.put(`${BASE_API_URL}/${api}`, data);
}

export function removeTodoTaskById(api) {
    return axios.delete(`${BASE_API_URL}/${api}`);
}
export function getInProgressTask(api) {
    return axios.get(`${BASE_API_URL}/${api}`);
}
export function getCompletedTask(api) {
    return axios.get(`${BASE_API_URL}/${api}`);
}

export function getAuthUsers() {
    return axios.get("./users/users.json");
}