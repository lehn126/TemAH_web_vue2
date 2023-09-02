import http from '@/utils/http';
import constants from '@/utils/constants';

function getAll(vm, pageIndex, pageSize, sortBy, sortOrder, callback) {
  let reqPageIndex = pageIndex;
  if (pageIndex < 0) {
    reqPageIndex = 0;
  }

  http.simpleGet(
    vm,
    constants.URL_ALARM_GET_ALL,
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

function terminateAlarms(vm, ids, callback) {
  http.simplePost(
    vm,
    constants.URL_ALARM_TERMINATE,
    ids,
    { 'Content-Type': 'text/plain' },
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, 'Terminate操作执行成功');
      if (callback) {
        callback(response);
      }
    },
  );
}

function createAlarms(vm, alarmArray, callback) {
  http.simplePost(
    vm,
    constants.URL_ALARM_CREATE,
    alarmArray,
    null,
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, '告警创建成功');
      if (callback) {
        callback(response);
      }
    },
  );
}

function updateAlarm(vm, alarm, callback) {
  http.simplePost(
    vm,
    constants.URL_ALARM_UPDATE,
    alarm,
    null,
    (response) => {
      // 处理成功情况
      http.notifySuccess(vm, `告警 [${alarm.id}] 更新成功`);
      if (callback) {
        callback(response);
      }
    },
  );
}

function getAlarm(vm, alarmId, callback) {
  const reqUrl = `${constants.URL_ALARM_GET}/${alarmId}`;
  http.simpleGet(
    vm,
    reqUrl,
    null,
    (response) => {
      // 处理成功情况
      const alarm = response.data;
      if (!alarm) {
        http.notifyError(vm, `没有找到ID为 [${alarmId}] 的告警信息`, '获取告警失败');
      } else if (callback) {
        callback(response);
      }
    },
  );
}

export default {
  getAll,
  terminateAlarms,
  createAlarms,
  getAlarm,
  updateAlarm,
};
