<template>
  <my-tab :tabs="tabs" :current-tab.sync="currentTab">
    <transition name="slide-right" mode="out-in" appear>
      <component :is="currentTab" @alarm-dblclick="handleRowDblclick" class="tag-views"></component>
    </transition>
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
<style scoped>
.tag-views {
  padding: 8px;
  transition: all 0.8s ease;
}
.slide-left-enter-active, .slide-right-enter-active {
  transition: all 0.3s ease;
}
.slide-left-leave-active, .slide-right-leave-active {
  transition: all 0.4s ease;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to, .slide-right-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-top-enter-active {
  transition: all 0.3s ease;
}
.slide-top-leave-active {
  transition: all 0.4s ease;
}
.slide-top-enter {
  transform: translateY(100%);
  opacity: 0;
}
.slide-top-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
