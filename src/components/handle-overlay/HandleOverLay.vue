<template>
  <van-popup
    v-model:show="show"
    round
    class="handle-overlay"
    position="bottom"
    @click-overlay="manualHandle"
    teleport="#app"
  >
    <div class="handle-overlay_title">
      请输入交接人工号
    </div>
    <van-field v-model="valueReal" type="digit" />
    <div class="ihybrid-button-group" >
      <van-button round
                  @click="manualHandle"
                  class="cancel-btn"
                  color="#FAFAFA">
        取 消
      </van-button>
      <van-button @click="codeHandle"
                  round
                  class="btn-operation"
                  color="linear-gradient(to right, #00D6FA, #00ACF2)">
        确 定
      </van-button>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'HandleOverLay',
  props: {
    value: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const show = ref(props.visible);
    const valueReal = ref(props.value);
    watch(() => props.visible, (v:boolean) => {
      show.value = v;
    })
    watch(valueReal, (v:string) => {
      emit('update:modelValue', v);
    })
    const manualHandle = () => {
      emit('update:visible', false)
    }
    const codeHandle = () => {
      emit('ok')
    }
    return {
      show,
      valueReal,
      manualHandle,
      codeHandle
    }
  }
})
</script>

<style scoped>

</style>
