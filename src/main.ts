import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/assets/styles/index.scss'
import { setupPlugins } from '@/plugin'
import { inject } from '@/components/inject-custom-components'

const app = createApp(App)
setupPlugins(app)
inject(app)
app.use(store).use(router).mount('#app')
