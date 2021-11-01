import { VNode } from 'vue';

export default {
  methods: {
    getContent(title: string, classname?: string): VNode {
      // @ts-ignore
      const h = this.$createElement;
      return h('div', {}, [
        h('svg-icon', {
          attrs: {
            name: 'dr-icon-warn',
            iconClass: 'dr-icon-warn',
            className: classname || 'dr-icon-warn',
          },
        }),
        h(
          'span',
          {
            style: {
              marginLeft: '16px',
            },
          },
          title,
        ),
      ]);
    },
    formatTime(time: string): string {
      // @ts-ignore
      return this.$moment(time).format('YYYY-MM-DD HH:mm:ss');
    },
  },
};
