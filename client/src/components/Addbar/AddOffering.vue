<template>
  <v-stepper v-model="stepper" vertical>
    <v-stepper-step step="1">
      Choose days
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="mb-5">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex sm6>
              <v-checkbox v-model="venue.days" label="Monday" value="Monday"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Tuesday" value="Tuesday"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Wednesday" value="Wednesday"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Thursday" value="Thursday"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Friday" value="Friday"></v-checkbox>
            </v-flex>
            <v-flex sm6>
              <v-checkbox v-model="venue.days" label="Saturday" value="Saturday"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Sunday" value="Sunday"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn color="primary" @click.native="stepper = 2">Continue</v-btn>
      <v-btn flat @click.native="stepper = 1">Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2">Choose time</v-stepper-step>
    <v-stepper-content step="2">
      <v-card class="mb-5">
        <v-container fluid>
          <v-layout row wrap>
            <v-flex sm6>
              <h4>Afternoon</h4>
              <v-checkbox v-model="venue.time" label="3-5pm" value="3-5pm"></v-checkbox>
              <v-checkbox v-model="venue.time" label="3-6pm" value="3-6pm"></v-checkbox>
            </v-flex>
            <v-flex sm6>
              <h4>Late night</h4>
              <v-checkbox v-model="venue.time" label="9pm-end" value="9pm-end"></v-checkbox>
              <v-checkbox v-model="venue.time" label="10pm-end" value="10pm-end"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn color="primary" @click.native="stepper = 3">Continue</v-btn>
      <v-btn flat @click.native="stepper = 1">Cancel</v-btn>
    </v-stepper-content>
  <v-stepper-step step="3">Happyhour offering</v-stepper-step>
  <v-stepper-content step="3">
    <v-card class="mb-5" height="200px">
      <v-text-field label="Enter your information" textarea v-model="venue.offering">
      </v-text-field>
    </v-card>
      <v-btn color="primary" @click="saveInfo">Show Preview</v-btn>
      <v-btn flat @click.native="stepper = 1">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>

export default {
  data () {
    return {
      stepper: 1,
      venue: {
        days: [],
        time: [],
        offering: ''
      }
    }
  },
  methods: {
    saveInfo () {
      this.$emit('sendInfo', this.venue)
      console.log('sendinfo', this.venue)
    }
  }
}

</script>

<style scoped>

</style>
