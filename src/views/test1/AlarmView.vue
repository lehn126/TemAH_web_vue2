<template>
  <my-tab :tabs="tabs" :current-tab.sync="currentTab">
    <component :is="currentTab" @alarm-dblclick="handleRowDblclick"></component>
  </my-tab>
</template>
<script>
import MyTab from '../../components/test1/MyTab.vue';
import AlarmList from '../../components/test1/AlarmList.vue';
import AlarmCreate from '../../components/test1/AlarmCreate.vue';

export default {
  name: 'AlarmView',
  data() {
    return {
      tabs: [
        { id: 'alarm-list', name: 'AlarmList' },
        { id: 'alarm-create', name: 'CreateAlarm' },
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
    handleRowDblclick(row) {
      console.log(row);
    },
  },
};
</script>
<style lang="css"></style>
