<template>
  <div class="operat-room-card">
    <div class="container" :class="[opTimeUpdate ? 'hasFooter' : '']">
      <div class="title-warp">
        <div class="title" @click.prevent="clickTitle">
          <span class="time">{{ time }}</span>
          <span class="text">{{ name }}</span>
        </div>
        <div class="state-bar">
          <TagStatus v-if="tagStatus" :code="tagStatus" />
        </div>
      </div>
      <oprat-info>
        <slot name="content" />
      </oprat-info>
    </div>
    <div class="footer" v-if="opTimeUpdate === 1 || opTimeUpdate === 2">
      <div class="title">时间更新</div>
      <div class="text">{{opTimeUpdate==1?'手术预计开始时间更新':(opTimeUpdate==2?'手术预计结束时间更新':'')}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import OpratInfo from "./OpratInfo.vue";
export default defineComponent({
  name: "OpratRoomCard",
  components: {
    OpratInfo,
  },
  props: {
    dateTime: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    tagCode: {
      type: [String, Number],
      default: "",
    },
    opTimeUpdate: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["clickTitle"],
  setup(props, ctx) {
    const data = reactive({
      time: props.dateTime,
      name: props.name,
      state: 3,
      tagStatus: props.tagCode,
      hasFooter: false,
    });
    const clickTitle = () => {
      ctx.emit("clickTitle");
    };
    return {
      ...toRefs(data),
      clickTitle,
    };
  },
});
</script>
<style lang="scss" scoped>
.operat-room-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 12px 24px 0px rgba(217, 220, 221, 0.5);
  margin: 0 24px;
  overflow: hidden;
  .container {
    padding: 30px 24px 36px 24px;
    &.hasFooter {
      padding-bottom: 18px;
    }
    .title-warp {
      display: flex;
      justify-content: space-between;
      padding-bottom: 18px;
      .title {
        display: flex;
        flex-direction: column;

        font-size: 36px;
        font-weight: 600;
        color: #000000;
        line-height: 48px;
      }
      .state-bar {
        padding-top: 6px;
      }
    }
  }

  .footer {
    display: flex;
    height: 60px;
    align-items: center;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 144px;
      height: inherit;
      background: rgba(255, 0, 0, 0.05);

      font-size: 24px;
      font-weight: 500;
      color: #ff0000;
    }
    .text {
      flex: 1;
      display: flex;
      align-items: center;
      background: rgba(255, 0, 0, 0.03);
      height: inherit;
      padding-left: 16px;
      font-size: 24px;
      font-weight: 400;
      color: #ff0000;
    }
  }
}
</style>
