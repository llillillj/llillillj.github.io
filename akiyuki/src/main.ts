import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { Quasar } from "quasar"
import quasarUserOptions from "./quasar-user-options"

import "./styles/fonts.sass"

const vueObj = createApp(App)

vueObj.use(Quasar, quasarUserOptions)
vueObj.use(router)
vueObj.mount("#app")
