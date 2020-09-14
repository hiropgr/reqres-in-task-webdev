import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGruard'


import Home from '../components/Home'
import Reg from '../components/auth/Reg'
import Login from '../components/auth/Login'
import UsersList from '../components/users/UsersList'
import CreateUser from '../components/users/CreateUser'
import UserPage from '../components/users/UserPage'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Home,
        },
        {
            path: '/users',
            name: 'usersList',
            component: UsersList,
            beforeEnter: authGuard
        },
        {
            path: '/users/create',
            name: 'createUser',
            component: CreateUser,
            beforeEnter: authGuard
        },
        {
            path: '/users/:userId',
            props: true,
            name: 'userPage',
            component: UserPage,
            beforeEnter: authGuard
        },
        {
            path: '/signup',
            name: 'registration',
            component: Reg,
        },
        {
            path: '/signin',
            name: 'login',
            component: Login,
        }
    ]
})