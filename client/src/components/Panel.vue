<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-2">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{title}}</v-toolbar-title>
              </v-toolbar>
              <slot>
                No slot content defined
              </slot>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

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
