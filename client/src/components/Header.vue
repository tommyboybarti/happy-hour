<template>
  <v-toolbar fixed dark class="primary" app>
    <v-toolbar-title class="mr-4">
      <v-btn light class="home" to="/">
        Happy Hour
      </v-btn>
    </v-toolbar-title>
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items> -->
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat dark to="login">
        Login
      </v-btn>
      <v-btn flat dark to="register">
        Sign Up
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {

}

</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color:darkgray;
}

</style>
