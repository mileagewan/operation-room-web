import { useStore } from 'vuex';
import { getCurrentInstance } from 'vue';
import {
  SET_CARD_CACHE_DATA_MUTATION,
  SET_TITLE_COUNT_MUTATION
} from '@/store/mutation-types';

export default function useTitleCount(): any {
  const store = useStore();
  const { type } = getCurrentInstance() as any;

  const updateTitleCount = (count: number) => {
    store.commit(SET_TITLE_COUNT_MUTATION, {
      [type.name]: count
    })
  }

  const updateCardCacheData = (data: any[]) => {
    store.commit(SET_CARD_CACHE_DATA_MUTATION, {
      [type.name]: data
    })
  }

  return {
    updateTitleCount,
    updateCardCacheData
  }
}
