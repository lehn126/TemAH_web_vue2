<template>
  <my-tab :tabs="tabs" :current-tab.sync="currentTab">
    <component :is="currentTab" @alarm-dblclick="handleRowDblclick"></component>
  </my-tab>
</template>
<script>
import MyTab from '../../components/test1/MyTab.vue';
import AlarmList from '../../components/test1/AlarmList.vue';
import AlarmCreate from '../../components/test1/AlarmCreate.vue';

function handleRowDblclick(row) {
  console.log(row);
}

export default {
  name: 'AlarmView',
  data() {
    return {
      tabs: [
        { id: 'alarm-list', name: 'AlarmList' },
        { id: 'alarm-create', name: 'CreateAlarm' },
      ],
      currentTab: '',
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
