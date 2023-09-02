<template>
  <div class="task-create-container">
    <task-create ref="taskEditCom" :is-create="true" @submit-edit="submitCreate"></task-create>
  </div>
</template>
<script>
import taskApi from '@/api/task-api';
import TaskEdit from '@/components/task/TaskEdit.vue';

export default {
  name: 'TaskCreate',
  components: {
    'task-create': TaskEdit,
  },
  mounted() {
    this.$refs.taskEditCom.enable();
  },
  methods: {
    submitCreate(task) {
      if (task) {
        taskApi.createTask(this, task, () => {
          this.$refs.taskEditCom.resetForm();
          this.$refs.taskEditCom.enable();
        });
      }
    },
  },
};
</script>
<style>
.task-create-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
