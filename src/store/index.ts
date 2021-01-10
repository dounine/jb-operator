import {createStore} from 'vuex'
import position from '../api/position'
import variables from './settings.js'

export default createStore({
    state: {
        theme: variables.theme,
        loading: true,
        positions: [],
        token: null,
        socket: null,
        status: 'Stoped',
        socketInterval: null,
        slider: {
            open: {
                config: null,
                online: [],
                rebound: 0,
                spread: 0,
                scheduling: 0,
                timeout: 0,
                volumn: 0,
                tradeValue: null,
                entrustValue: null,
                initPrice: null,
            },
            close: {
                config: null,
                online: [],
                rebound: 0,
                spread: 0,
                scheduling: 0,
                timeout: 0,
                volumn: 0,
                tradeValue: null,
                entrustValue: null,
                initPrice: null,
            },
        }
    },
    mutations: {//sync
        setToken(state, value) {
            state.token = value
        },
        setStatus(state, value) {
            state.status = value;
        },
        setLoading(state, value) {
            state.loading = value
        },
        setSocketInterval(state, value) {
            if (state.socketInterval) {
                try {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    clearTimeout(state.socketInterval)
                } catch (e) {
                    console.log(e)
                }
            }
            state.socketInterval = value;
        },
        setPositions(state, value) {
            state.positions = value
        },
        setSocket(state, value) {
            state.socket = value;
        },
        setSlider(state, value) {
            console.log('setSlider', value)
            state.slider = value;
        }
    },
    actions: {//async
        update(store, payload) {
            console.log('update', payload)
            if (store.state.socket) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                store.state.socket.send(JSON.stringify({
                    type: 'upDown',
                    data: {
                        type: 'upDownUpdate',
                        data: {
                            platform: payload.platform,
                            symbol: payload.symbol,
                            contractType: payload.contractType,
                            direction: payload.direction,
                            name: payload.name,
                            value: payload.value
                        }
                    }
                }))
            } else {
                console.error("socket 未连接")
            }

        },
        infoChange(store, payload) {
            console.log('infoChange')
            console.log(payload)
            const sendMessage = (socket, payload) => {
                socket.send(JSON.stringify({
                    type: 'sub',
                    data: {
                        type: 'upDown',
                        channel: {
                            platform: payload.platform,
                            symbol: payload.symbol,
                            contractType: payload.contractType,
                            direction: payload.direction,
                            offset: payload.offset
                        }
                    }
                }))
            }

            const createSocket = (time) => {
                const socket = new WebSocket(`ws://localhost:40000/ws/${store.state.token}`)
                socket.onopen = function () {
                    console.log('socket onopen')
                    sendMessage(socket, payload)
                    store.commit('setSocket', socket)
                }
                socket.onclose = function (closeEvent) {
                    console.log('socket onclose', closeEvent)
                    store.commit('setSocket', null)
                    const betweenSeconds = new Date().getSeconds() - time.getSeconds()
                    if (window.location.pathname.split("/").length > 3) {
                        if (betweenSeconds > 3 || betweenSeconds < 0) {
                            console.log('socket 重连中', new Date())
                            createSocket(new Date())
                        } else {
                            store.commit('setSocketInterval', setTimeout(function () {
                                console.log('socket 重连中', new Date())
                                createSocket(new Date())
                            }, (3 - betweenSeconds) * 1000))
                        }
                    }
                }
                socket.onmessage = function (messageEvent) {
                    console.log(messageEvent.data)
                    const data = JSON.parse(messageEvent.data)
                    if (data.type === "tip") {
                        console.log(data.data)
                    } else if (data.type === "slider") {
                        if (data.data.type === "config") {
                            const sliderConfig: API.SliderConfig = data.data;
                            store.commit('setSlider', {
                                ...store.state.slider,
                                [sliderConfig.data.offset]: {
                                    ...store.state.slider[sliderConfig.data.offset],
                                    config: sliderConfig.data
                                }
                            })
                        } else if (data.data.type === "online") {
                            const online: API.SliderOnline = data.data;
                            store.commit('setSlider', {
                                ...store.state.slider,
                                [online.data.offset]: {
                                    ...store.state.slider[online.data.offset],
                                    tradeValue: Number(online.data.tradeValue) || store.state.slider[online.data.offset].tradeValue,
                                    initPrice: Number(online.data.initPrice) || store.state.slider[online.data.offset].initPrice,
                                    online: [
                                        Number(online.data.tradeValue) || store.state.slider[online.data.offset].tradeValue || Number(online.data.entrustValue),
                                        Number(online.data.entrustValue) || store.state.slider[online.data.offset].entrustValue || Number(online.data.tradeValue)
                                    ],
                                    entrustValue: Number(online.data.entrustValue) || store.state.slider[online.data.offset].entrustValue,
                                }
                            })
                        }
                    } else if (data.type === "upDownInfo") {
                        if (data.data.status) {
                            store.commit('setStatus', data.data.status);
                            if (data.data.status == 'Closed') {
                                store.commit('setSlider', {
                                    ...store.state.slider,
                                    open: {
                                        ...store.state.slider.open,
                                        entrustValue: null,
                                        online: [
                                            store.state.slider.open.tradeValue,
                                            store.state.slider.open.tradeValue
                                        ],
                                    },
                                    close: {
                                        ...store.state.slider.close,
                                        entrustValue: null,
                                        online: [
                                            store.state.slider.close.tradeValue,
                                            store.state.slider.close.tradeValue
                                        ],
                                    }

                                })
                            }
                            store.commit('setSlider', {
                                ...store.state.slider,
                                open: {
                                    ...store.state.slider.open,
                                    ...data.data.open
                                },
                                close: {
                                    ...store.state.slider.close,
                                    ...data.data.close
                                }
                            })
                        }
                    }
                }
            }

            if (!store.state.socket) {
                createSocket(new Date())
            } else {
                sendMessage(store.state.socket, payload)
            }
        },
        queryPositions({commit}, payload) {
            position.query(payload.platform)
                .then(response => {
                    const convertPositions = response.data.data.map(item => {
                        return {
                            ...item,
                            icon: require(`../assets/images/${item.name}.svg`),
                        };
                    });
                    commit('setPositions', convertPositions)
                    commit('setLoading', false)
                })
        }
    },
    modules: {},
    getters: {}
})
