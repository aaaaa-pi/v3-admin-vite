import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import router from './router'
import App from './App.vue'
import store from './store'
import registerIcons from './global/register-icons'

const app = createApp(App)
app.use(registerIcons)
app.use(store)
app.use(router)

app.mount('#app')
