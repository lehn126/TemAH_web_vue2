<template>
  <div class="alarm-create-container">
    <alarm-create ref="alarmEditCom" :is-create="true" @submit-edit="submitCreate"></alarm-create>
  </div>
</template>
<script>
import AlarmEdit from '@/components/test1/AlarmEdit.vue';
import constants from '@/utils/constants';
import http from '@/utils/http';

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
        http.httpPost(constants.URL_ALARM_CREATE, [alarm])
          .then((response) => {
            // 处理成功情况
            const code = response.errCode;
            if (code === '0') {
              this.$notify({
                title: '操作成功',
                message: '告警创建成功',
                type: 'success',
                duration: 1000,
              });
              this.$refs.alarmEditCom.resetForm();
              this.$refs.alarmEditCom.enable();
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
      }
    },
  },
};
</script>
<style>
.alarm-create-container {
  padding: 8px;
  padding-top: 24px;
}
</style>
