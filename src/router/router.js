import Vue from 'vue'
import Router from 'vue-router'
import authGuard from './authGruard'

const Home = () => import('@/components/Home')
const Reg = () => import('@/components/auth/Reg')
const Login = () => import('@/components/auth/Login')
const UsersList = () => import('@/components/users/UsersList')
const CreateUser = () => import('@/components/users/CreateUser')
const UserPage = () => import('@/components/users/UserPage')

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