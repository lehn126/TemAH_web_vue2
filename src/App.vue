<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link :to="{ name: 'alarm' }">告警管理</router-link> |
      <router-link to="/task">任务管理</router-link>
    </nav>
    <transition name="router-view" appear>
      <router-view/>
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.router-view-enter-active, .router-view-leave-active {
  transition: all .4s;
}
.router-view-enter, .router-view-leave-to {
  opacity: 0;
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
