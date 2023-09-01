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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: () => import('../views/test1/AlarmView.vue'),
  },
  {
    path: '/alarm/edit/:id(\\d+)?', // 使用正则表达式进行动态路由匹配（?表示传入id或不传入都行）
    name: 'alarmEdit',
    component: () => import('../views/test1/AlarmEditView.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
