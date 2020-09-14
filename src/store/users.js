import {HTTP} from '../axios'

export default {
    state: {
        list: [],
        perPage: 0,
        total: 0,
        totalPages: 0,
        activeUser: null
    },
    getters: {
        
    },
    mutations: {
        setupUsersListProps(state, params) {
            state.list.length = 0
            for (const user of params.data) {
                state.list.push(user)
            }
            state.perPage = params.per_page
            state.total = params.total
            state.totalPages = params.total_pages
        },
        setActiveUser(state, user) {
            state.activeUser = user
        },
        updateUser(state, user) {
            console.log(user);
            const idx = state.list.findIndex(u => u.id == user.id)
            if(idx >= 0) {
                state.list[idx] = user
            }
        },
        deleteUser(state, userId) {
            const idx = state.list.findIndex(u => u.id == userId)
            if(idx >= 0) {
                state.list.splice(idx, 1)
            }
        }
    },
    actions: {
        async fetchUsersFromPage({commit}, pageNum = 1) {
            try {
                const params = (await HTTP.get(`users?page=${pageNum}`)).data
                commit('setupUsersListProps', params)
            } catch (error) {
                commit('setAlert', 'Ошибка загрузки списка пользователей')     
                throw error          
            }
        },
        async fetchActiveUser({commit}, userId) {
            try {
                const user = (await HTTP.get(`users/${userId}`)).data
                commit('setActiveUser', user.data)
            } catch (error) {
                commit('setAlert', 'Ошибка загрузки данных пользователя.')
                throw error
            }
        },
        async createUser({commit}, user) {
            try {
                const response = (await HTTP({
                    url: 'users',
                    headers: { 'content-type': 'application/json' },
                    method: 'POST',
                    data: JSON.stringify(user)
                })).data
                commit('setActiveUser', response)
                return response.id
            } catch (error) {
                commit('setAlert', 'Ошибка cоздания нового пользователя.')
                throw error
            }
        },
        async updateUser({commit}, { user, userId }) {
            try {
                const response = (await HTTP({
                    url: `users/${userId}`,
                    headers: { 'content-type': 'application/json' },
                    method: 'PUT',
                    data: JSON.stringify(user)
                })).data
                response.id = userId
                commit('updateUser', response)
                commit('setActiveUser', response)
            } catch (error) {
                commit('setAlert', 'Ошибка обновления пользователя.')
                throw error
            }
        },
        async deleteUser({commit}, userId) {
            try {
                await HTTP({
                    url: `users/${userId}`,
                    method: 'DELETE'
                })
                commit('setActiveUser', null)
                commit('deleteUser', userId)
            } catch (error) {
                commit('setAlert', 'Ошибка удаления пользователя.')
                throw error
            }
        }
    }
}