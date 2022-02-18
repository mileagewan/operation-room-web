import { SET_OP_TASK_DTO_MUTATION } from '@/store/types/mutation-types';
import { SET_OP_TASK_DTO_ACTION } from '@/store/types/action-types';

export const itinerantNur = {
  state: {
    opTaskDTO: {}

  },
  mutations: {
    [SET_OP_TASK_DTO_MUTATION](state:any, value:any) {
      state.opTaskDTO = value;
    }
  },
  actions: {
    [SET_OP_TASK_DTO_ACTION]({ commit } : any, value:any) {
      commit('SET_OP_TASK_DTO_MUTATION', value);
    }
  },
  getters: {

  }
};
