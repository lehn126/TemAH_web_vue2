<template>
  <my-tab :tabs="tabs" :current-tab.sync="currentTab">
    <component
      :is="currentTab"
      @alarm-dblclick="handleRowDblclick"
    ></component>
  </my-tab>
</template>
<script>
import MyTab from '../../components/test1/MyTab.vue';
import AlarmList from '../../components/test1/AlarmList.vue';
import AlarmCreate from '../../components/test1/AlarmCreate.vue';

function handleRowDblclick(row) {
  this.$store.dispatch('setOperationAlarm', row);
  this.$router.push({ name: 'alarmEdit', params: { id: row.id } });
}

export default {
  name: 'AlarmView',
  data() {
    return {
      tabs: [
        { id: 'alarm-list', name: '告警列表' },
        { id: 'alarm-create', name: '创建告警' },
      ],
      currentTab: 'alarm-list',
    };
  },
  components: {
    'my-tab': MyTab,
    'alarm-list': AlarmList,
    'alarm-create': AlarmCreate,
  },
  methods: {
    handleRowDblclick,
  },
};
</script>
<style></style>
