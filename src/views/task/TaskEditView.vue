<template>
  <div class="task-edit-container">
    <task-edit
      ref="taskEditCom"
      :is-create="false"
      :init-data="taskData"
      @submit-edit="submitEdit"
    ></task-edit>
  </div>
</template>
<script>
import getFieldValue from '@/utils/object-utils';
import taskApi from '@/api/task-api';
import TaskEdit from '../../components/task/TaskEdit.vue';

function fillEditData(editData, callback) {
  if (editData) {
    callback(editData);
  }
}

function getEditData(vm, callback) {
  const taskId = vm.$route.params.id;
  if (!taskId) {
    vm.$notify.error({
      title: '告警ID不能为空',
      message: '操作失败, 请求的告警ID不能为空',
    });
    return;
  }

  let { operationTask } = vm.$store.getters;
  if (operationTask) {
    // 如果store里有那么就直接用，否则请求restful API获取
    // 如果store中的task和请求的id不一样，请求restful API获取
    const storeId = getFieldValue(operationTask, 'job_id', '');
    if (taskId !== storeId) {
      operationTask = null;
    }
  }

  if (!operationTask) {
    taskApi.getTask(vm, taskId, (response) => {
      operationTask = response.data;
      fillEditData(operationTask, callback);
    });
  } else {
    fillEditData(operationTask, callback);
  }
}

export default {
  data() {
    return {
      taskData: {
        job_id: '',
        bean_name: '',
        method_name: '',
        method_params: '',
        cron_expression: '',
        remark: '',
        job_status: 0,
      },
    };
  },
  components: {
    'task-edit': TaskEdit,
  },
  mounted() {
    this.$refs.taskEditCom.disable();
    getEditData(this, this.fillOperationData);
  },
  methods: {
    fillOperationData(operationData) {
      if (operationData) {
        this.taskData = operationData;
        this.$refs.taskEditCom.enable();
      }
    },
    submitEdit(task) {
      if (task) {
        taskApi.updateTask(this, task, () => {
          this.$refs.taskEditCom.enable();
        });
      }
    },
  },
};
</script>
<style scoped>
.task-edit-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>
