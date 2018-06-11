<template>
  <v-card class="mb-5">
    <v-layout row wrap>
      <v-flex xs11 sm5>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          :return-value.sync="time_from"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time_from"
            label="From"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="time_from" @change="$refs.menu.save(time_from)"></v-time-picker>
        </v-menu>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs11 sm5>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          :return-value.sync="time_until"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="time_until"
            label="Until"
            prepend-icon="access_time"
            readonly
          ></v-text-field>
          <v-time-picker v-model="time_until" @change="$refs.menu.save(time_until)"></v-time-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  data () {
    return {
      time_from: null,
      time_until: null,
      menu1: false,
      menu2: false
    }
  }
}

</script>

<style scoped>

</style>