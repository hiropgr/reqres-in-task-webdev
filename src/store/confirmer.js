const initialState = {
    active: false,  
    title: '',
    body: '',
    resolve: null,
    reject: null,
  }
  
  const state = Object.assign({}, initialState)
  
  const mutations = {
    activate (state, payload)  {
      Object.assign(state, payload)
    },
    deactivate (st) {
      st = Object.assign(state, initialState)
      return st
    }
  }
  
  const actions = {
    ask: ({ commit }, { title, body }) => {
      return new Promise((resolve, reject) => {
        commit('activate', {
          active: true,
          title,
          body,
          resolve,
          reject
        })
      })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  }