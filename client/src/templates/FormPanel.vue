<template>
  <v-container fluid fill-height>
    <v-layout justify-center>
      <v-flex xs10 sm8 md6>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
          <v-card>
            <slot class="pa-1">
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

<style scoped>
.toolbar-title {
  margin-top: 100px;
}
</style>
