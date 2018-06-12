<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm8 md8 lg8 xl8>
        <panel title="Location on Google Maps - Search a venue">
          <search-google-map v-on:changeTitle="updateVenue($event)"/>
        </panel>
      </v-flex>
      <v-flex sm4 md4 lg4 xl4>
        <panel title="Contact Information" :venue="venue">
          <v-card-text v-show="preview">
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
        </panel>
      </v-flex>
      <v-flex sm8 md8 lg8 xl8>
        <panel title="Happy hour offering">
          <v-card-text>
            <add-offering v-on:sendInfo="updateOffering($event)" />
          </v-card-text>
        </panel>
      </v-flex>
      <v-flex sm4 md4 lg4 xl4>
        <panel title="Overview">
          <v-card-text v-show="preview">
            <div class="headline">Days</div>
            {{ spunte.days.join(', ') }}
            <div class="headline">Time</div>
            {{ spunte.time.join(', ') }}
            <div class="headline">Offering</div>
            {{ spunte.offering }}
            <v-card-actions>
              <v-btn
                primary
                @click="createBar">Save info
              </v-btn>
              <v-spacer></v-spacer>
              <v-alert
                class="ml-4"
                :value="error"
                transition="scale-transition"
                error
                bottom>
                {{error}}
              </v-alert>
              <v-btn
                v-show="saved"
                @click="addbar"
                color="accent">Add venue
              </v-btn>
            </v-card-actions>
            <panel titel="Thanks for adding your post" v-if="homer">
              <img id="homer" src="../assets/homer.jpg" alt="cheers Homer">
            </panel>
          </v-card-text>
        </panel>
      </v-flex>
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
        // opening_hours: {
        //   weekday_text: 'opening hours'
      },
      spunte: {
        days: [],
        time: [],
        offering: ''
      },
      bar: {
        name: null,
        formatted_address: null,
        formatted_phone_number: null,
        rating: null,
        website: null,
        days: null,
        time: null,
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
