import { SET_TASK_DATA } from '@/store/types/mutation-types';

export const task = {
  state: {
    type: {},
  },
  mutations: {
    [SET_TASK_DATA](state: any, type: any) {
      console.log(type);

      // state.type[type] = value;
    },
  },
  actions: {

  },
  getters: {},
};
