<template>
  <div class="nav">
    <el-row>
      <el-col :span="3">
        <el-menu
          mode="vertical"
          :router="true"
          default-active="1"
          :collapse="false"
          :unique-opened="true"
        >
          <el-menu-item
            v-for="item in navItems"
            :key="item.index"
            :index="item.index"
            :route="{ name: item.routeName }"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="nav-container">
          <transition name="slide-right" mode="out-in" appear>
            <router-view></router-view>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    navItems: {
      required: true,
      type: Array,
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.nav {
  border: 1px solid #67c23a;
  border-radius: 3px;
}
.nav-container {
  padding: 8px;
}
</style>
