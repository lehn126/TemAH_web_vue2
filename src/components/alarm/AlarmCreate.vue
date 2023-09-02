<template>
  <div class="alarm-create-container">
    <alarm-create ref="alarmEditCom" :is-create="true" @submit-edit="submitCreate"></alarm-create>
  </div>
</template>
<script>
import alarmApi from '@/api/alarm-api';
import AlarmEdit from '@/components/alarm/AlarmEdit.vue';

export default {
  name: 'AlarmCreate',
  components: {
    'alarm-create': AlarmEdit,
  },
  mounted() {
    this.$refs.alarmEditCom.enable();
  },
  methods: {
    submitCreate(alarm) {
      if (alarm) {
        alarmApi.createAlarms(this, [alarm], () => {
          this.$refs.alarmEditCom.resetForm();
          this.$refs.alarmEditCom.enable();
        });
      }
    },
  },
};
</script>
<style>
.alarm-create-container {
  margin-top: 16px;
}
</style>
