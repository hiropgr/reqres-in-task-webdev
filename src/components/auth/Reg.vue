<template>
    <b-row align-v="center" align-h="center" style="height: 90vh">
        <b-col style="max-width: 600px">
            <b-card title="Регистрация (NOT WORKING)">
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
                                autocomplete="new-password"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group label="Пароль еще раз:" label-for="input-confirm">
                            <b-form-input
                                id="input-confirm"
                                v-model="confirmPassword"
                                type="password"
                                required
                                placeholder="Подтверждение пароля"
                                autocomplete="new-password"
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary" :disabled="!formValid" @click.prevent="register">
                            <span v-if="!loading">Зарегистрироваться</span>
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
    data () {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            loading: false
        }
    },
    computed: {
        formValid() {
            return this.email && this.password && this.password == this.confirmPassword
        }
    },
    methods: {
        async register() {
            try {
                this.loading = true
                await this.$store.dispatch('register', {
                    email: this.email,
                    password: this.password
                })
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>