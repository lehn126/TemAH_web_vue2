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
    path: '/alarm/edit/:id(\\d+)?', // 使用正则表达式进行动态路由匹配（?表示传入id或不传入都行）
    name: 'alarmEdit',
    component: () => import('../views/alarm/AlarmEditView.vue'),
  },
  {
    path: '/task',
    name: 'task',
    component: () => import('../views/task/TaskView.vue'),
    children: [
      { path: '', name: 'task-default', component: () => import('../views/task/TaskListView.vue') }, // 确保打开task后该子路由默认被渲染
      { path: 'list', name: 'task-list', component: () => import('../views/task/TaskListView.vue') },
      { path: 'create', name: 'task-create', component: () => import('../views/task/TaskCreateView.vue') },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
