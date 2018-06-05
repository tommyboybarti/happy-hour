<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs-6>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
          <v-card>
            <slot>
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
