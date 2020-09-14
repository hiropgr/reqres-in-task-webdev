<template>
    <div>
        <h4>Страница пользователя</h4>
        <div v-if="loading" class="d-flex justify-content-center">
            <b-spinner 
                style="width: 5rem; height: 5rem;" 
                label="Loading users"
            ></b-spinner>
        </div>
        <template v-else-if="user">
            <b-row>
                <b-col md="3" class="mb-3">
                    <b-img thumbnail fluid-grow :src="user.avatar" alt="user avatar"></b-img>
                </b-col>
                <b-col md="9">
                    <b-card class="mb-3">
                        <b-card-title>ID: {{ user.id }}</b-card-title>
                        <b-card-text>
                            <template v-if="!editMode">
                                <p>Name: {{ name }}</p>
                                <p>Email: {{ user.email }}</p>
                            </template>
                            <app-user-props-form 
                                v-else 
                                :loading="editLoading" 
                                formActionName="Сохранить" 
                                :user="user"
                                @submit="updateUser"
                            ></app-user-props-form>
                        </b-card-text>
                    </b-card>
                    <b-button variant="warning" class="mr-3" @click="editMode = !editMode">
                        {{ editMode ? 'Отменить' : 'Изменить' }}
                    </b-button>
                    <b-button v-if="!editMode" :disabled="loading" variant="danger" @click="deleteUser">
                        <span v-if="!editLoading">Удалить</span>
                        <b-spinner v-else small></b-spinner>
                    </b-button>
                </b-col>
            </b-row>
            
        </template>
        <b-alert v-else show variant="danger">Произошла ошибка загрузки пользователя</b-alert>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import AppUserPropsForm from './UserPropsForm'

export default {
    props: ['userId'],
    async mounted() {
        try {
            this.loading = true
            await this.$store.dispatch('fetchActiveUser', this.userId)
        } finally {
            this.loading = false
        }
    },
    data () {
        return {
            loading: false,
            editLoading: false,
            editMode: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.users.activeUser
        }),
        name() {
            return `${this.user?.first_name}  ${this.user?.last_name}`
        }
    },
    methods: {
        async updateUser(user) {
            try {
                this.editLoading = true

                let response = await this.$store.dispatch('confirmer/ask', {
                    title: 'Подтвердите действие',
                    body: `Вы действительно хотите обновить данные пользователя?`,
                })
                if(!response)
                    return

                await this.$store.dispatch('updateUser', {
                    user: {
                        first_name: user.firstName,
                        last_name: user.lastName,
                        email: user.email,
                        avatar: user.avatar
                    },
                    userId: this.userId
                })
                this.editMode = false
            } finally {
                this.editLoading = false
            }
        },
        async deleteUser() {
            try {
                this.editLoading = true
                let response = await this.$store.dispatch('confirmer/ask', {
                    title: 'Подтвердите действие',
                    body: `Вы действительно хотите удалить пользователя?`,
                })
                if(!response)
                    return
                    
                await this.$store.dispatch('deleteUser', this.userId)
                this.$router.push('/users')
            } finally {
                this.editLoading = false
            }
        }
    },
    components: {
        AppUserPropsForm
    }
}
</script>

<style>

</style>