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

export default {
  // pass down bar metadata
  props: [
    'bar'
  ]
}

</script>

<style scoped>

</style>
