<template>
  <panel title="Login">
    <v-card-text>
      <v-form>
        <v-text-field v-model="email" name="email" label="Email" type="text"></v-text-field>
        <v-text-field v-model="password" name="password" label="Password" type="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="login" color="primary">Login</v-btn>
    </v-card-actions>
  </panel>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      // call register fct on AS object. Then wait for response and store it
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        // setting tokens and users depending on responses from server
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        // axios returns error.repsonse.data and then we add .error (a message)
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red
}
</style>
