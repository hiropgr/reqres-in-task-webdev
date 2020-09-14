<template>
    <b-alert
        id="notificator"
        :show="alert.visible"
        dismissible
        fade
        variant="danger"
        @dismissed="clearAlert"
    >
        {{ alert.text }}
    </b-alert>
</template>

<script>
export default {
    methods: {
        clearAlert() {
            this.$store.dispatch('clearAlert')
        }
    },
    watch: {
        alert(value) {
            if(value.visible) {
                this.dismissCountDown = this.dismissSecs
            }
        }
    },
    computed: {
        alert () {
            return this.$store.state.shared.alert
        }
    }
};
</script>

<style>
    #notificator {
        position: absolute;
        right: 10px;
        top: 60px;
    }
</style>