import { App } from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\.(vue|ts|tsx)$/
)

export const inject = (app: App):void => {
  requireComponent.keys().forEach((fileName = '') => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
      // 获取组件的 PascalCase 命名
      camelCase(
        // 获取和目录深度无关的文件名
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    // 全局注册组件
    app.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
}
