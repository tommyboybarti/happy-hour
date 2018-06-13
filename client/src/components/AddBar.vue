<template>
  <v-container>
    <v-layout row wrap>
      <v-flex>
        <panel title="Location on Google Maps - Search a venue">
          <search-google-map v-on:changeTitle="updateVenue($event)"/>
        </panel>
      </v-flex>
      <v-flex>
        <panel title="Happy hour offering">
          <v-card-text>
            <add-offering v-on:sendInfo="updateOffering($event)" />
          </v-card-text>
        </panel>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="preview" max-width="800">
        <panel title="Preview">
          <v-layout row>
            <v-flex xs12 sm6>
              <v-card-text>
                <div class="headline">Name</div>
                {{ venue.name }}
                <div class="headline">Address</div>
                {{ venue.formatted_address }}
                <div class="headline">Phone number</div>
                {{ venue.formatted_phone_number }}
                <div class="headline">Google rating</div>
                {{ venue.rating }}
                <div class="headline">Website</div>
                {{ venue.website }}
              </v-card-text>
            </v-flex>
            <v-flex xs12 sm6>
              <v-card-text>
                <div class="headline">Days</div>
                {{ spunte.days.join(', ') }}
                <div class="headline">Happy Hours</div>
                <div>
                  Afternoon from
                  {{ spunte.times.af_start_time.HH  }}:{{  spunte.times.af_start_time.mm  }}
                  Until
                  {{ spunte.times.af_end_time.HH  }}:{{ spunte.times.af_end_time.mm  }}
                </div>
                <div>
                  Evening from
                  {{ spunte.times.ev_start_time.HH }}:{{ spunte.times.ev_start_time.mm }}
                  Until
                  {{ spunte.times.ev_end_time.HH  }}:{{ spunte.times.ev_end_time.mm  }}
                </div>
                <div class="headline">Offering</div>
                {{ spunte.offering }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat="flat" @click.native="preview = false">Cancel</v-btn>
                <v-alert
                  class="ml-4"
                  :value="error"
                  transition="scale-transition"
                  error
                  bottom>
                  {{error}}
                </v-alert>
                <v-btn color="primary" @click.native="createBar">Save</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </panel>
      </v-dialog>
      <v-dialog v-model="saved" max-width="240">
        <v-card>
          <v-card-text><h2>Thanks for sharing your information!</h2></v-card-text>
          <img class="pa-2" src="@/assets/homer.jpg" />
          <v-spacer></v-spacer>
          <v-btn
            @click="addbar"
            color="accent">Move on
          </v-btn>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import BarsService from '@/services/BarsService'
import SearchGoogleMap from '@/templates/SearchGoogleMap'
import AddOffering from './Addbar/AddOffering'
// import _ from 'lodash'

export default {
  data () {
    return {
      preview: false,
      saved: false,
      venue: {
        name: '',
        formatted_address: '',
        formatted_phone_number: '',
        rating: '',
        website: ''
      },
      spunte: {
        days: [],
        times: {
          af_start_time: {HH: '15', mm: '00'},
          af_end_time: {HH: '18', mm: '00'},
          ev_start_time: {HH: '21', mm: '00'},
          ev_end_time: {HH: '00', mm: '00'}
        },
        offering: ''
      },
      bar: {
        name: null,
        formatted_address: null,
        formatted_phone_number: null,
        rating: null,
        website: null,
        days: null,
        times: null,
        offering: null
      },
      error: null,
      required: (value) => !!value || 'required'
    }
  },
  methods: {
    async addbar () {
      // checking that every single value using a certain key (bar) is defined
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.bar)
        .every(key => !!this.bar[key])
      console.log('before sending object bar', this.bar)
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }
      // call API
      try {
        this.homer = true
        await BarsService.post(this.bar)
        this.$router.push({
          name: 'bars'
        })
      } catch (err) {
        console.log('error', err)
      }
    },
    updateVenue: function (updatedTitle) {
      this.venue = updatedTitle
    },
    updateOffering: function (updatedOffering) {
      this.spunte = updatedOffering
      this.preview = true
      console.log('update', this.spunte)
    },
    createBar () {
      delete this.venue.address_components
      delete this.venue.adr_address
      delete this.venue.geometry
      delete this.venue.html_attributions
      delete this.venue.icon
      delete this.venue.id
      delete this.venue.international_phone_number
      delete this.venue.opening_hours
      delete this.venue.photos
      delete this.venue.place_id
      delete this.venue.reference
      delete this.venue.reviews
      delete this.venue.scope
      delete this.venue.types
      delete this.venue.url
      delete this.venue.utc_offset
      delete this.venue.vicinity
      const bar = Object.assign(this.venue, this.spunte)
      this.bar = bar
      this.saved = true
      console.log('createBar', this.bar)
    }
  },
  components: {
    SearchGoogleMap,
    AddOffering
  }
}

</script>

<style scoped>
.headline {
  color: gray;
}
</style>
