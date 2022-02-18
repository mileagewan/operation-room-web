import { SET_ROOM_MUTATION } from '@/store/types/mutation-types';
import { SET_ROOM_ACTION } from '@/store/types/action-types';

export const chiefNur = {
  state: {
    room: {
    }

  },
  mutations: {
    [SET_ROOM_MUTATION](state:any, value:any) {
      state.room = value;
    }
  },
  actions: {
    [SET_ROOM_ACTION]({ commit } : any, value:any) {
      commit('SET_ROOM_MUTATION', value);
    }
  },
  getters: {

  }
};
