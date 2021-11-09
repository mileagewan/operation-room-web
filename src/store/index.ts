import { createStore } from 'vuex';
import { SET_TOKEN_MUTATION, SET_USER_INFO_MUTATION } from '@/store/mutation-types';
import { SET_TOKEN_ACTION, SET_USER_INFO_ACTION } from '@/store/action-types';
import { itinerantNur } from '@/store/itinerant-nur';
import { chiefNur } from '@/store/chief-nur';
import { task } from '@/store/task';

export default createStore({
  state: {
    userInfo: {
      userConfig: {},
    },
    token: ''
  },
  mutations: {
    [SET_USER_INFO_MUTATION](state, value) {
      state.userInfo = value;
    },
    [SET_TOKEN_MUTATION](state, value) {
      state.token = value;
    },
  },
  actions: {
    async [SET_USER_INFO_ACTION]({ commit }, value) {
      await commit(SET_USER_INFO_MUTATION, value);
    },
    [SET_TOKEN_ACTION]({ commit }, value) {
      commit(SET_TOKEN_ACTION, value);
    },
  },
  modules: {
    task,
    itinerantNur,
    chiefNur
  }
})
