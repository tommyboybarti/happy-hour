<template>
  <div>
    <h1>Register</h1>
      <!-- VMODEL : when vue runs go grab this input and find any property called email and bind it -->
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email" />
      <br>
      <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password" />
      <br>
      <!-- add event listener -->
      <button
        @click="register">
        Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      // call register fct on AS object. Then wait for response and store it
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      // console.log(response.data) if let response exists
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
