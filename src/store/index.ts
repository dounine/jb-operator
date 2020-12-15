import { createStore } from 'vuex'
import position from '../api/position'

export default createStore({
  state: {
    loading: true,
    positions: [],
    token: localStorage.getItem('token') || 'hello'
  },
  mutations: {//sync
    setLoading(state, value) {
      state.loading = value
    },
    setPositions(state, value) {
      state.positions = value
    }
  },
  actions: {//async
    queryPositions({ commit }) {
      position.query('virtual')
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
