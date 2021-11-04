<template>
  <div class="nab-bar">
    <van-nav-bar
      :title="titleBar"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavBar',
  props: {
    title: {
      type: String,
      default: '手术室'
    }
  },
  setup(props, { emit }) {
    const titleBar = ref(props.title)
    const onClickLeft = (): void => {
      emit('goBack')
    }
    return {
      titleBar,
      onClickLeft
    }
  }

})
</script>
