<template>
<v-layout row wrap>
  <v-flex d-flex sm6 md6 lg6 xl6>
    <panel title="Please enter your information">
      <v-card-text>
      <v-text-field
        label="Title"
        required
        :rules="[required]"
        v-model="bar.name">
      </v-text-field>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex sm6>
            <h4>FROM</h4>
            <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="bar.times.af_start_time" />
          </v-flex>
          <v-flex sm6>
            <h4>UNTIL</h4>
            <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="bar.times.af_end_time" />
          </v-flex>
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
          <v-layout v-show="reversed">
            <v-flex sm6>
              <h4>FROM</h4>
              <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="bar.times.ev_start_time" />
            </v-flex>
            <v-flex sm6>
              <h4>UNTIL</h4>
              <vue-timepicker :minute-interval="15" class="picker ma-2" v-model="bar.times.ev_end_time" />
            </v-flex>
          </v-layout>
        </v-layout>
      </v-container>
      <v-text-field
        label="Address"
        required
        :rules="[required]"
        v-model="bar.formatted_address">
      </v-text-field>

      </v-card-text>
    </panel>
  </v-flex>
  <v-flex d-flex sm6 md6 lg6 xl6>
    <panel title="Offering">
      <v-card-text>
        <v-text-field
          label="Offering"
          required
          multi-line
          :rules="[required]"
          v-model="bar.offering">
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-alert
            class="ml-4"
            :value="error"
            transition="scale-transition"
            error>
            {{error}}
          </v-alert>
          <v-btn
            @click="save"
            color="accent">
            Save changes
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </panel>
  </v-flex>
  <v-flex>
    <panel title="Location on Google Maps - Search and save address">
      <search-google-map />
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import BarsService from '@/services/BarsService'
import SearchGoogleMap from '@/templates/SearchGoogleMap'
import VueTimepicker from 'vue2-timepicker'

export default {
  data () {
    return {
      reversed: false,
      bar: {
        name: null,
        times: {
          af_start_time: {HH: '', mm: ''},
          af_end_time: {HH: '', mm: ''},
          ev_start_time: {HH: '', mm: ''},
          ev_end_time: {HH: '', mm: ''}
        },
        formatted_address: null,
        offering: null
      },
      error: null,
      required: (value) => !!value || 'required'
    }
  },
  methods: {
    async save () {
      // checking that every single value using a certain key (bar) is defined
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.bar)
        .every(key => !!this.bar[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }
      // const barId = this.$store.state.route.params.barId
      try {
        await BarsService.put(this.bar)
        // this works as long as the browser keeps a history
        this.$router.go(-1)
      } catch (err) {
        console.log(err)
      }
    },
    reverse () {
      this.reversed = true
      // this.venue.times = Object.assign({ev_start_time: {HH: '21', mm: '00'}, ev_end_time: {HH: '00', mm: '00'}}, this.venue.times)
      this.bar.times.ev_start_time = Object.assign({HH: '', mm: ''}, this.bar.times.ev_start_time)
      this.bar.times.ev_end_time = Object.assign({HH: '', mm: ''}, this.bar.times.ev_end_time)
    },
    remove () {
      this.reversed = false
      // delete this.venue.times.ev_start_time
      // delete this.venue.times.ev_end_time
      delete this.bar.times.ev_start_time.HH
      delete this.bar.times.ev_start_time.mm
      delete this.bar.times.ev_end_time.HH
      delete this.bar.times.ev_end_time.mm
    }
  },
  async mounted () {
    try {
      const barId = this.$store.state.route.params.barId
      this.bar = (await BarsService.show(barId)).data
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    SearchGoogleMap,
    VueTimepicker
  }
}

</script>

<style scoped>

</style>
