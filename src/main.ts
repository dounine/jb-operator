import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element.js'
import axios from './plugins/axios'
import './plugins/public-path.js'

let app: any = null
const render = (props) => {
    app = createApp(App).use(store).use(router).use(axios)
    installElementPlus(app)
    app.mount('#app')
}
declare const window: any;
if (!window.__POWERED_BY_QIANKUN__) {
    render({})
}

export async function bootstrap() {
    console.log('react app bootstraped');
}
export async function mount(props) {
    render(props)
}
export async function unmount(props) {
    if (app) {
        app.unmount();
        app._container.innerHTML = '';
        // app.$destroy()
        app = null
    }
}