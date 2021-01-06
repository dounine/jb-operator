import {createStore} from 'vuex'
import position from '../api/position'
import variables from './settings.js'

export default createStore({
    state: {
        theme: variables.theme,
        loading: true,
        positions: [],
        token: null,
        socket: null
    },
    mutations: {//sync
        setToken(state, value) {
            state.token = value
        },
        setLoading(state, value) {
            state.loading = value
        },
        setPositions(state, value) {
            state.positions = value
        },
        setSocket(state, value) {
            state.socket = value;
        }
    },
    actions: {//async
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
                    console.log(betweenSeconds)
                    if (betweenSeconds > 3) {
                        console.log('socket 重连中', new Date())
                        createSocket(new Date())
                    } else {
                        setTimeout(function () {
                            console.log('socket 重连中', new Date())
                            createSocket(new Date())
                        }, (3 - betweenSeconds) * 1000)
                    }
                }
                socket.onmessage = function (messageEvent) {
                    console.log(JSON.parse(messageEvent.data))
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
