<template>
    <div>
        <h1>Создание пользователя</h1>
        <app-user-props-form :loading="loading" formActionName="Создать" @submit="onSubmit"></app-user-props-form>
    </div>
</template>

<script>
import AppUserPropsForm from './UserPropsForm'

export default {
    data () {
        return {
            loading: false
        }
    },
    methods: {
        async onSubmit(user) {
            try {
                console.log(user);
                this.loading = true
                const userId = await this.$store.dispatch('createUser', {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    avatar: user.avatar
                })
                this.$router.push(`/users/${userId}`)
            } finally {
                this.loading = false
            }
        },
    },
    components: {
        AppUserPropsForm
    }
}
</script>

<style>

</style>