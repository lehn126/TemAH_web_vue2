<template>
  <my-tab :tabs="tabs" :current-tab.sync="currentTab">
    <transition name="slide-right" mode="out-in" appear>
      <component :is="currentTab" @alarm-dblclick="handleRowDblclick" class="tag-views"></component>
    </transition>
  </my-tab>
</template>
<script>
import MyTab from '../../components/alarm/MyTab.vue';
import AlarmList from '../../components/alarm/AlarmList.vue';
import AlarmCreate from '../../components/alarm/AlarmCreate.vue';

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
<style>
.tag-views {
  padding: 8px;
  transition: all 0.4s ease;
}
</style>
