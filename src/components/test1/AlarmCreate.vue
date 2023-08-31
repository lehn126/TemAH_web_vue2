<template>
  <div class="tab-container">
    <alarm-create :is-create="true"></alarm-create>
  </div>
</template>
<script>
import AlarmEdit from '@/components/test1/AlarmEdit.vue';

export default {
  name: 'AlarmCreate',
  components: {
    'alarm-create': AlarmEdit,
  },
};
</script>
<style>
.tab-container {
  padding: 8px;
  padding-top: 24px;
}
</style>
