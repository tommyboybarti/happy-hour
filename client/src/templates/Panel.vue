<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{title}}</v-toolbar-title>
          </v-toolbar>
          <slot class="pa-2">
          </slot>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style>

</style>
