import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element.js'
import axios from './plugins/axios'
import './plugins/public-path.js'
import ECharts from 'vue-echarts'
import { use } from "echarts/core"

import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

let app: any = null
const render = (props) => {
    use([
        CanvasRenderer,
        BarChart,
        GridComponent,
        TooltipComponent
    ])
    app = createApp(App)
        .use(store).use(router).use(axios)
    if (props.token) {
        store.commit('setToken', props.token)
    }
    installElementPlus(app)
    app.component('v-chart', ECharts)
    app.mount('#app')
}
declare const window: any;
if (!window.__POWERED_BY_QIANKUN__) {
    render({
        token: localStorage.getItem('token') || ""
    })
}

export async function bootstrap() {
    console.log('load4s-udp bootstraped');
}
export async function mount(props) {
    render(props)
}
export async function unmount(props) {
    if (app) {
        app.unmount();
        app._container.innerHTML = '';
        app = null
    }
}