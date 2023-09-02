<template>
  <div class="container">
    <alarm-edit
      ref="alarmEditCom"
      :is-create="false"
      :init-data="alarmData"
      @submit-edit="submitEdit"
    ></alarm-edit>
  </div>
</template>
<script>
import AlarmEdit from '@/components/test1/AlarmEdit.vue';
import getFieldValue from '@/utils/object-utils';
import http from '@/utils/http';
import constants from '@/utils/constants';

function fillEditAlarmData(operationAlarm, callback) {
  if (operationAlarm) {
    let eventTime = null;
    if (operationAlarm.eventTime) {
      eventTime = new Date(operationAlarm.eventTime);
    }
    const alarmToEdit = {
      id: getFieldValue(operationAlarm, 'id', ''),
      managedObject: getFieldValue(operationAlarm, 'managedObject', ''),
      eventDate: eventTime != null ? eventTime : '',
      eventTime: eventTime != null ? eventTime : '',
      alarmType: getFieldValue(operationAlarm, 'alarmType', ''),
      perceivedSeverity: getFieldValue(operationAlarm, 'perceivedSeverity', ''),
      probableCause: getFieldValue(operationAlarm, 'probableCause', ''),
      specificProblem: getFieldValue(operationAlarm, 'specificProblem', ''),
      clearFlag: getFieldValue(operationAlarm, 'clearFlag', 0) !== 0,
      terminateState: getFieldValue(operationAlarm, 'terminateState', 0) !== 0,
      additionalText: getFieldValue(operationAlarm, 'additionalText', ''),
    };

    callback(alarmToEdit);
  }
}

function getEditAlarmData(vm, callback) {
  const alarmId = vm.$route.params.id;
  if (!alarmId) {
    vm.$notify.error({
      title: '告警ID不能为空',
      message: '操作失败, 请求的告警ID不能为空',
    });
    return;
  }

  let { operationAlarm } = vm.$store.getters;
  if (operationAlarm) {
    // 如果store里有那么就直接用，否则请求restful API获取
    // 如果store中的alarm和请求的id不一样，请求restful API获取
    const storeAlarmId = getFieldValue(operationAlarm, 'id', '');
    if (alarmId !== storeAlarmId) {
      operationAlarm = null;
    }
  }

  if (!operationAlarm) {
    const reqUrl = `${constants.URL_ALARM_GET}/${alarmId}`;
    http.httpGet(reqUrl)
      .then((response) => {
        // 处理成功情况
        const code = response.errCode;
        if (code === '0') {
          operationAlarm = response.data;
        } else {
          vm.$notify({
            title: '操作失败',
            message: `操作失败, 错误码: ${code}`,
            type: 'warning',
          });
        }
        if (!operationAlarm) {
          vm.$notify.error({
            title: '获取告警失败',
            message: `没有找到ID为 [${alarmId}] 的告警信息`,
          });
        } else {
          fillEditAlarmData(operationAlarm, callback);
        }
      })
      .catch((error) => {
        // 处理错误情况
        vm.$notify.error({
          title: '操作失败',
          message: `操作失败, 错误: ${error.message}`,
        });
      });
  } else {
    fillEditAlarmData(operationAlarm, callback);
  }
}

export default {
  data() {
    return {
      alarmData: {
        id: '',
        managedObject: '',
        eventDate: '',
        eventTime: '',
        alarmType: '',
        perceivedSeverity: '',
        probableCause: '',
        specificProblem: '',
        clearFlag: false,
        terminateState: false,
        additionalText: '',
      },
    };
  },
  components: {
    'alarm-edit': AlarmEdit,
  },
  mounted() {
    this.$refs.alarmEditCom.disable();
    getEditAlarmData(this, this.fillOperationAlarm);
  },
  methods: {
    fillOperationAlarm(operationAlarm) {
      if (operationAlarm) {
        this.alarmData = operationAlarm;
        this.$refs.alarmEditCom.enable();
      }
    },
    submitEdit(alarm) {
      if (alarm) {
        http.httpPost(constants.URL_ALARM_UPDATE, alarm)
          .then((response) => {
            // 处理成功情况
            const code = response.errCode;
            if (code === '0') {
              this.$notify({
                title: '操作成功',
                message: `告警 [${alarm.id}] 更新成功`,
                type: 'success',
                duration: 1000,
              });
            } else {
              this.$notify({
                title: '操作失败',
                message: `操作失败, 错误码: ${code}`,
                type: 'warning',
              });
            }
          })
          .catch((error) => {
            // 处理错误情况
            this.$notify.error({
              title: '操作失败',
              message: `操作失败, 错误: ${error.message}`,
            });
          });
        this.$refs.alarmEditCom.enable();
      }
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
</style>
