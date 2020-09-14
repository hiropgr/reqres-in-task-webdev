<template>
    <b-modal v-model="confirmer.active" ref="confirmer" hide-footer :title="confirmer.title" @hide="cancel">
        <div>
            {{confirmer.body}}
        </div>
        <b-button class="mt-3" variant="danger" block @click="cancel">Нет</b-button>
        <b-button class="mt-2" variant="primary" block @click="confirm">Да</b-button>
    </b-modal>
</template>

<script>
export default {
    methods: {
        confirm () {
            if(this.confirmer.resolve) {
                this.confirmer.resolve(true)
                this.$store.commit('confirmer/deactivate')
            }
        },
        cancel () {
            if(this.confirmer.resolve) {
                this.confirmer.resolve(false)
                this.$store.commit('confirmer/deactivate')
            }
        }
    },
    computed: {
        confirmer () {
            return this.$store.state.confirmer
        },
    }
}
</script>
