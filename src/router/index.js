import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: () => import('../views/alarm/AlarmView.vue'),
  },
  {
    path: '/alarm/edit/:id(\\S+)', // 使用正则表达式进行动态路由匹配
    name: 'alarmEdit',
    component: () => import('../views/alarm/AlarmEditView.vue'),
  },
  {
    path: '/task',
    component: () => import('../views/task/TaskView.vue'),
    children: [
      { path: '', name: 'task', component: () => import('../views/task/TaskListView.vue') }, // 确保打开task后该子路由默认被渲染
      { path: 'list', name: 'task-list', component: () => import('../views/task/TaskListView.vue') },
      { path: 'create', name: 'task-create', component: () => import('../views/task/TaskCreateView.vue') },
      { path: 'edit/:id(\\d+)', name: 'task-edit', component: () => import('../views/task/TaskEditView.vue') },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
