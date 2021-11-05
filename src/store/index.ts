import { createStore } from 'vuex'
import { SET_USER_INFO_MUTATION } from '@/store/mutation-types';
import { SET_USER_INFO_ACTION } from '@/store/action-types';
import { itinerantNur } from '@/store/itinerant-nur';

export default createStore({
  state: {
    userInfo: {
      userId: '3'
    }
  },
  mutations: {
    [SET_USER_INFO_MUTATION](state, value) {
      state.userInfo = value
    }
  },
  actions: {
    [SET_USER_INFO_ACTION]({ commit }, value) {
      commit(SET_USER_INFO_MUTATION, value)
    }
  },
  modules: {
    itinerantNur
  }
})
