import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    operationAlarm: null,
  },
  getters: {
    operationAlarm(state) {
      return state.operationAlarm;
    },
  },
  mutations: {
    setOperationAlarm(state, alarmData) {
      state.operationAlarm = alarmData;
    },
  },
  actions: {
    setOperationAlarm({ commit }, alarmData) {
      commit('setOperationAlarm', alarmData);
    },
  },
  modules: {},
});
