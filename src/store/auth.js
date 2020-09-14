import {HTTP} from '../axios'

export default {
    state: {
        
    },
    getters: {
        
    },
    mutations: {
        
    },
    actions: {
        async register({commit}, user) {
            try {
                const response = await HTTP({
                    url: `register`,
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(user)
                })
                commit('setUser', response, { root: true })
            } catch (error) {
                commit('setAlert', 'Ошибка регистрации.')
                throw error
            }
        },
        async login({commit}, user) {
            try {
                const response = (await HTTP({
                    url: `login`,
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(user)
                })).data
                user.token = response.token
                commit('setUser', user, { root: true })
            } catch (error) {
                commit('setAlert', 'Ошибка авторизации.')
                throw error
            }
        },
        logout({commit}) {
            commit('setUser', null)
        }
    }
}