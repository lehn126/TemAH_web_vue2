<template>
  <div class="tab">
    <el-tabs class="tabs" v-model="selectedTab" tab-position="left" @tab-click="handleClick">
      <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id"></el-tab-pane>
    </el-tabs>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MyTab',
  data() {
    return {
      selectedTab: this.currentTab,
    };
  },
  props: ['tabs', 'currentTab'],
  methods: {
    selectTab(tabId) {
      console.log(tabId);
      this.selectedTab = tabId;
      this.$emit('update:currentTab', tabId);
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.$emit('update:currentTab', this.selectedTab);
    },
  },
};
</script>
<style scoped>
.tab {
  display: flex;
  border: 1px solid #42b983;
  border-radius: 3px;
}

.tabs {
  min-width: 60px;
  max-width: 200px;
  padding: 0 8px 0 8px;
  margin: 8px 0 8px 0;
}
</style>
