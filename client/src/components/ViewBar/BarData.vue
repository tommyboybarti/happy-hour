<template>
  <panel title="Bar Metadata">
    <v-card-title>
      {{this.bar.title}}
    </v-card-title>
    <v-card-text>
      {{this.bar.happyhour}}
    </v-card-text>
  </panel>
</template>

<script>
import Panel from '@/templates/Panel'

export default {
  // pass down bar metadata
  props: [
    'bar'
  ],
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
