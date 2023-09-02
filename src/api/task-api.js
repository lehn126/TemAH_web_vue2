import http from '@/utils/http';
import constants from '@/utils/constants';

function getAll(vm, pageIndex, pageSize, sortBy, sortOrder, callback) {
  let reqPageIndex = pageIndex;
  if (pageIndex < 0) {
    reqPageIndex = 0;
  }

  http.simpleGet(
    vm,
    constants.URL_TASK_GET_ALL,
    {
      pageIndex: reqPageIndex,
      pageSize,
      sortBy,
      sortOrder,
    },
    (response) => {
      // 处理成功情况
      callback(response);
    },
  );
}

function deleteTask(vm, taskId, callback) {
  http.simplePost(
    vm,
    `${constants.URL_TASK_DELETE}/${taskId}`,
    null,
    null,
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, `删除任务 [${taskId}] 操作执行成功`);
      if (callback) {
        callback(response);
      }
    },
  );
}

function createTask(vm, task, callback) {
  http.simplePost(
    vm,
    constants.URL_TASK_CREATE,
    task,
    null,
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, '任务创建成功');
      if (callback) {
        callback(response);
      }
    },
  );
}

function updateTask(vm, task, callback) {
  http.simplePost(
    vm,
    constants.URL_TASK_UPDATE,
    task,
    null,
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, `任务 [${task.id}] 更新成功`);
      if (callback) {
        callback(response);
      }
    },
  );
}

function getTask(vm, taskId, callback) {
  const reqUrl = `${constants.URL_TASK_GET}/${taskId}`;
  http.simpleGet(
    vm,
    reqUrl,
    null,
    (response) => {
      // 处理成功情况
      const task = response.data;
      if (!task) {
        http.notifyError(vm, `没有找到ID为 [${taskId}] 的任务信息`, '获取任务信息失败');
      } else if (callback) {
        callback(response);
      }
    },
  );
}

export default {
  getAll,
  deleteTask,
  createTask,
  getTask,
  updateTask,
};
