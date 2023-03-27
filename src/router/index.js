import Vue from 'vue';
import Router from 'vue-router';
import login from '@/components/login';
import MyTask from '@/components/MyTask';
import ProcessTask from '@/components/ProcessTask';
import CompletedTask from '@/components/CompletedTask';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/my-task',
            name: 'myTask',
            component: MyTask,
        },
        {
            path: '/process-task',
            name: 'processTask',
            component: ProcessTask
        },
        {
            path: '/completed-task',
            name: 'completedTask',
            component: CompletedTask
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
});