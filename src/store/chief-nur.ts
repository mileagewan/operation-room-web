import { SET_ROOM_MUTATION } from '@/store/mutation-types';
import { SET_ROOM_ACTION } from '@/store/action-types';

export const chiefNur = {
  state: {
    room: {
    }

  },
  mutations: {
    [SET_ROOM_MUTATION](state:any, value:any) {
      state.room = value
    }
  },
  actions: {
    [SET_ROOM_ACTION]({ commit } : any, value:any) {
      commit('SET_ROOM_MUTATION', value)
    }
  },
  getters: {

  }
}
