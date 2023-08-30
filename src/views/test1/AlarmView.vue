<template>
    <div>
        <my-tab :tabs="tabs" :current-tab.sync="currentTab">
            <KeepAlive>
                <component :is='currentTab'></component>
            </KeepAlive>
        </my-tab>
    </div>
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
      currentTab: '',
    };
  },
  components: {
    'my-tab': MyTab,
    'alarm-list': AlarmList,
    'alarm-create': AlarmCreate,
  },
};
</script>
<style lang="css">

</style>
