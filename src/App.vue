<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      
      <router-link tag="b-navbar-brand" active-class="active" to="/">CRUD Users</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="isUserLoggedIn">
            <router-link tag="b-nav-item" active-class="active" to="/users">Список</router-link>
            <router-link tag="b-nav-item" active-class="active" to="/users/create">Создать</router-link>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <template v-if="isUserLoggedIn">
            <b-button variant="light" @click="logout">Выйти</b-button>
          </template>
          <template v-else>
            <router-link tag="b-nav-item" active-class="active" to="/signin">Войти</router-link>
            <router-link tag="b-nav-item" active-class="active" to="/signup">Зарегистрироваться</router-link>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="mt-3">
      <router-view></router-view>
    </b-container>
    
    <app-notificator></app-notificator>
    <app-confirmer></app-confirmer>
  </div>
</template>

<script>
import AppNotificator from './components/Notificator'
import AppConfirmer from './components/Confirmer'

export default {
  name: 'App',
  data () {
    return {
      usersLinks: [
        { text: '', link: '' }
      ]
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      document.location.reload(true)
    }
  },
  components: {
    AppNotificator, AppConfirmer
  }
}
</script>

