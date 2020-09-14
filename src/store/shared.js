export default {
    state: {
        alert: {
            text: '',
            visible: false
        }
    },
    mutations: {
        setAlert (state, payload) {
            state.alert.text = payload
            state.alert.visible = true
        },
        clearAlert (state) {
            state.alert.visible = false
        }
    },
    actions: {
        setAlert ({commit}, payload) {
            commit('setAlert', payload)
        },
        clearAlert({commit}) {
            commit('clearAlert')
        },
    },
}