const state = () => ({
  alert: {
    message: 'this is a test',
    type: 'info'
  },
  snackbar: {}
})

const actions = {
  alert ({ commit }, payload) {
    commit('alert', payload)
  },
  snackbar ({ commit }, payload) {
    commit('snackbar', payload)
  }
}

const mutations = {
  alert (state, payload) {
    state.alert = payload
  },
  snackbar (state, payload) {
    payload.showing = true
    payload.timeout = payload.timeout || 6000
    state.snackbar = payload
  }
}

export default {
  state,
  actions,
  mutations
}
