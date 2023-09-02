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
import getFieldValue from '@/utils/object-utils';
import alarmApi from '@/api/alarm-api';
import AlarmEdit from '../../components/alarm/AlarmEdit.vue';

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
    alarmApi.getAlarm(vm, alarmId, (response) => {
      operationAlarm = response.data;
      fillEditAlarmData(operationAlarm, callback);
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
        alarmApi.updateAlarm(this, alarm, () => {
          this.$refs.alarmEditCom.enable();
        });
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
