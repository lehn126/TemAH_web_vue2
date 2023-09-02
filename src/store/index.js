import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    operationAlarm: null,
    operationTask: null,
  },
  getters: {
    operationAlarm(state) {
      return state.operationAlarm;
    },
    operationTask(state) {
      return state.operationTask;
    },
  },
  mutations: {
    setOperationAlarm(state, alarmData) {
      state.operationAlarm = alarmData;
    },
    setOperationTask(state, taskData) {
      state.operationTask = taskData;
    },
  },
  actions: {
    setOperationAlarm({ commit }, alarmData) {
      commit('setOperationAlarm', alarmData);
    },
    setOperationTask({ commit }, taskData) {
      commit('setOperationTask', taskData);
    },
  },
  modules: {},
});
