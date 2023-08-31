<template>
  <div class="container">
    <alarm-edit :is-create="false" :init-data="alarmData"></alarm-edit>
  </div>
</template>
<script>
import AlarmEdit from '@/components/test1/AlarmEdit.vue';

export default {
  data() {
    return {
      alarmData: {
        id: '',
        managedObject: '',
        eventDate: new Date('2023-08-19T21:15:50.008+08:00'),
        eventTime: new Date('2023-08-19T21:15:50.008+08:00'),
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
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
</style>
