<template>
  <div class="tab">
    <el-tabs
      class="tabs"
      type="card"
      v-model="selectedTab"
      tab-position="left"
      :stretch="true"
      @tab-click="handleTabClick"
    >
      <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.name" :name="tab.id"></el-tab-pane>
    </el-tabs>
    <div class="tabContainer">
      <slot>Tag的内容显示在这里</slot>
    </div>
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
      this.selectedTab = tabId;
      this.$emit('update:currentTab', tabId);
    },
    handleTabClick() {
      this.$emit('update:currentTab', this.selectedTab);
    },
  },
};
</script>
<style scoped>
.tab {
  display: flex;
  border: 1px solid #67c23a;
  border-radius: 3px;
}

.tabs {
  min-width: 120px;
  max-width: 200px;
  padding: 0 8px 0 8px;
  margin: 8px 0 8px 0;
}

.tabContainer {
  display: flex;
  width: 100%;
  justify-content: center;
  /* align-items: center; */
}
</style>
