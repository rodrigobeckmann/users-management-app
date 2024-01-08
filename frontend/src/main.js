import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Login from './views/Login.vue'
import ControlPanel from './views/ControlPanel.vue'
import UserPanel from './views/UserPanel.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsers, faTrash, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faTrash, faPen, faXmark)

const routes = [
  { path: '/', component: Login},
  { path: '/control-panel', component: ControlPanel },
  { path: '/user/:id', component: UserPanel},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')
