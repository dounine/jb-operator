import { createStore } from 'vuex'
import position from '../api/position'
import variables from './settings.js'

export default createStore({
  state: {
    theme: variables.theme,
    loading: true,
    positions: [],
    token: null
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
    }
  },
  actions: {//async
    queryPositions({ commit }, payload) {
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
  modules: {
  },
  getters: {
  }
})
