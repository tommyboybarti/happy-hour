<template>
  <v-app>
    <page-header/>
      <v-content>
        <v-container>
          <router-view/>
        </v-container>
      </v-content>
    <page-footer/>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>

</style>
