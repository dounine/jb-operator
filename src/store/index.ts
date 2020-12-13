import { createStore } from 'vuex'

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
  },
  modules: {
  },
  getters: {
    routerParams(state) {
      return {
        // fun: this.$route.path.split("/")[1]
      }
    }
  }
})
