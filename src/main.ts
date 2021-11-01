import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/assets/styles/index.scss'
import { setupPlugins } from '@/plugin'

const app = createApp(App)
setupPlugins(app)
app.use(store).use(router).mount('#app')
