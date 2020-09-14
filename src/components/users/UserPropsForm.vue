<template>
    <b-form>
        <b-form-group
            label="Имя"
            label-for="input-firstName"
        >
            <b-form-input
                id="input-firstName"
                v-model="firstName"
                type="text"
                required
                placeholder="Имя"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Фамилия"
            label-for="input-lastName"
        >
            <b-form-input
                id="input-lastName"
                v-model="lastName"
                type="text"
                required
                placeholder="Фамилия"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="Почта"
            label-for="input-email"
        >
            <b-form-input
                id="input-email"
                v-model="email"
                type="email"
                required
                placeholder="Почта"
            ></b-form-input>
        </b-form-group>

        <b-form-group
            label="URL аватара"
            label-for="input-avatar"
        >
            <b-form-input
                id="input-avatar"
                v-model="avatar"
                type="url"
                required
                placeholder="URL"
            ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="loading" @click.prevent="onSubmit" style="width: 150px">
            <span v-if="!loading">{{formActionName}}</span>
            <b-spinner v-else small></b-spinner>
        </b-button>
    </b-form>
</template>

<script>
export default {
    mounted() {
        if(this.user) {
            this.firstName = this.user.first_name
            this.lastName = this.user.last_name
            this.email = this.user.email
            this.avatar = this.user.avatar
        }
    },
    props: {
        loading: Boolean,
        formActionName: String,
        user: {
            type: Object,
            required: false
        },
    },
    data () {
        return {
            firstName: '',
            lastName: '',
            email: '',
            avatar: '',
        }
    },
    methods: {
        async onSubmit() {
            this.$emit('submit', {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                avatar: this.avatar
            })
        },
    }
}
</script>
