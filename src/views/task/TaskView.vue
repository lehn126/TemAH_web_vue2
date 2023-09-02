<template>
  <my-nav :navItems="navItems"></my-nav>
</template>
<script>
import MyNav from '@/components/task/MyNav.vue';

export default {
  name: 'TaskView',
  data() {
    return {
      navItems: [
        {
          index: '1',
          routeName: 'task-list',
          icon: 'el-icon-coin',
          title: '任务列表',
        },
        {
          index: '2',
          routeName: 'task-create',
          icon: 'el-icon-document-add',
          title: '创建任务',
        },
      ],
    };
  },
  components: {
    'my-nav': MyNav,
  },
  methods: {},
};
</script>
<style></style>
