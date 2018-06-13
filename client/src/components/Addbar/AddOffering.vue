<template>
<v-container>
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
              <br>
              <v-checkbox v-model="venue.days" label="Weekdays" value="Weekdays"></v-checkbox>
              <v-checkbox v-model="venue.days" label="Weekend" value="Weekend"></v-checkbox>
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
              <v-layout row>
                <v-flex sm6>
              <h4>FROM</h4>
              <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="venue.times.af_start_time" />
            </v-flex>
            <v-flex sm6>
              <h4>UNTIL</h4>
             <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="venue.times.af_end_time" />
            </v-flex>
              </v-layout>
            </v-flex>
            <v-layout v-show="reversed">
              <v-flex sm6>
                <h4>FROM</h4>
                <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="venue.times.ev_start_time" />
              </v-flex>
              <v-flex sm6>
                <h4>UNTIL</h4>
                <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="venue.times.ev_end_time" />
              </v-flex>
            </v-layout>
            <v-btn
              v-show="!reversed"
              @click="reverse"
              color="primary"
              >Add reverse happy hour
            </v-btn>
            <v-btn
              v-show="reversed"
              @click="remove"
              color="primary"
              >Remove reverse happy hour
            </v-btn>
          </v-layout>
        </v-container>
      </v-card>
      <br>
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
</v-container>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'

export default {
  data () {
    return {
      reversed: true,
      stepper: 1,
      venue: {
        days: [],
        times: {
          af_start_time: {HH: '15', mm: '00'},
          af_end_time: {HH: '18', mm: '00'},
          ev_start_time: {HH: '21', mm: '00'},
          ev_end_time: {HH: '00', mm: '00'}
        },
        offering: ''
      }
    }
  },
  methods: {
    saveInfo () {
      this.$emit('sendInfo', this.venue)
      console.log('sendinfo', this.venue)
    },
    reverse () {
      this.reversed = true
      // this.venue.times = Object.assign({ev_start_time: {HH: '21', mm: '00'}, ev_end_time: {HH: '00', mm: '00'}}, this.venue.times)
      this.venue.times.ev_start_time = Object.assign({HH: '', mm: ''}, this.venue.times.ev_start_time)
      this.venue.times.ev_end_time = Object.assign({HH: '', mm: ''}, this.venue.times.ev_end_time)
    },
    remove () {
      this.reversed = false
      // delete this.venue.times.ev_start_time
      // delete this.venue.times.ev_end_time
      delete this.venue.times.ev_start_time.HH
      delete this.venue.times.ev_start_time.mm
      delete this.venue.times.ev_end_time.HH
      delete this.venue.times.ev_end_time.mm
    }
  },
  components: {
    VueTimepicker
  }
}

</script>

<style scoped>
.picker {
  border: solid 1px;
  border-color: #1E88E5;
}
</style>
