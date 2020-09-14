<template>
    <b-row align-v="center" align-h="center" style="height: 90vh">
        <b-col style="max-width: 600px">
            <b-card title="Авторизация">
                <b-card-text>
                    <b-form>
                        <b-form-group
                            id="input-group-1"
                            label="Почта:"
                            label-for="input-email"
                        >
                            <b-form-input
                                id="input-email"
                                v-model="email"
                                type="email"
                                required
                                placeholder="Почта"
                                autocomplete="email"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Пароль:" label-for="input-password">
                            <b-form-input
                                id="input-password"
                                v-model="password"
                                type="password"
                                required
                                placeholder="Пароль"
                                autocomplete="password"
                            ></b-form-input>
                        </b-form-group>

                        <b-button type="submit" variant="primary" :disabled="!formValid" @click.prevent="login">
                            <span v-if="!loading">Войти</span>
                            <b-spinner v-else small></b-spinner>
                        </b-button>
                    </b-form>
                </b-card-text>
            </b-card>

        </b-col>
    </b-row>
</template>

<script>
export default {
    created() {
        if(this.$route.query['loginError']) {
            this.$store.dispatch('setAlert', 'Пожалуйста, авторизируйтесь')
        }
    },
    data () {
        return {
            email: '',
            password: '',
            loading: false
        }
    },
    computed: {
        formValid() {
            return this.email && this.password
        }
    },
    methods: {
        async login() {
            try {
                this.loading = true
                await this.$store.dispatch('login', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/users')
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>