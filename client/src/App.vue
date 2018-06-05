<template>
  <v-app>
    <v-header></v-header>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
    <v-footer></v-footer>/>
  </v-app>
</template>

<script>
import VHeader from '@/components/Header.vue'
import VFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    VHeader,
    VFooter
  }
}
</script>

<style>

</style>
