import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AggregateDisplay from './views/AggregateDisplay.vue'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')


// const app = createApp(AggregateDisplay)

// app.use(router)

// app.mount('#app')