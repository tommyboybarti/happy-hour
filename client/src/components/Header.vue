<template>
  <v-toolbar elevation-25 fixed dark class="primary" app>
    <v-toolbar-title class="mr-4">
      <v-btn
        round
        color="secondary"
        class="home"
        :to="{name: 'home'}">
        Home
      </v-btn>
    </v-toolbar-title>
     <v-btn
        flat
        dark
        :to="{name: 'bars'}">
        Browse Bars
      </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!-- hide navigation depending on state of login -->
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{name: 'login'}">
        Login
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        :to="{name: 'register'}">
        Sign Up
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'home'
      })
    }
  }
}

</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: darkgray;
}

</style>
