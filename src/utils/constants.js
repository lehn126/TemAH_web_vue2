const URL_ALARM_BASE_URL = 'http://192.168.2.105:8001';
const URL_TASK_BASE_URL = 'http://192.168.2.105:8040';

export default {
  URL_BASE_URL: URL_ALARM_BASE_URL,
  URL_ALARM_GET_ALL: '/alarm/getAll',
  URL_ALARM_GET: '/alarm/get',
  URL_ALARM_UPDATE: '/alarm/update',
  URL_ALARM_CREATE: '/alarm/new',
  URL_ALARM_TERMINATE: '/alarm/terminate',

  URL_TASK_GET_ALL: `${URL_TASK_BASE_URL}/task/getAll`,
  URL_TASK_GET: `${URL_TASK_BASE_URL}/task/get`,
  URL_TASK_DELETE: `${URL_TASK_BASE_URL}/task/del`,
  URL_TASK_CHANGE_STATUS: `${URL_TASK_BASE_URL}/task/changesStatus`,
  URL_TASK_CREATE: `${URL_TASK_BASE_URL}/task/add`,
  URL_TASK_UPDATE: `${URL_TASK_BASE_URL}/task/update`,
};
