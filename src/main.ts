import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import filters from './filters'
import 'lib-flexible'
import { setupPlugins } from '@/plugin'
import { inject } from '@/components/inject-custom-components'
import '@/assets/styles/index.scss'

 const log = new VConsole();
 console.log(log)

const app = createApp(App)
app.config.globalProperties.$filters = filters
setupPlugins(app)
inject(app)
app.use(store).use(router).mount('#app')
