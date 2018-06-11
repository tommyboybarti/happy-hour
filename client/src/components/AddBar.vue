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
        </panel>
      </v-flex>
      <v-flex sm8 md8 lg8 xl8>
        <panel title="Happy hour offering">
          <v-card-text>
            <add-offering v-on:sendInfo="updateOffering($event)" />
          </v-card-text>
          <v-btn
            @click="createBar">Save
          </v-btn>
        </panel>
      </v-flex>
      <v-flex sm4 md4 lg4 xl4>
        <panel title="Overview">
          <v-card-text>
            <div class="headline">Days</div>
            {{ spunte.days.join(', ') }}
            <div class="headline">Time</div>
            {{ spunte.time.join(', ') }}
            <div class="headline">Offering</div>
            {{ spunte.offering }}
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
                @click="addbar"
                color="accent">Add venue
              </v-btn>
            </v-card-actions>
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

export default {
  data () {
    return {
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
      // this object is probably obsolete...
      bar: {
        name: '',
        formatted_address: '',
        formatted_phone_number: '',
        rating: '',
        website: '',
        days: [],
        time: [],
        offering: ''
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
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields'
        return
      }
      // call API
      try {
        await BarsService.post(this.bar)
        this.$router.push({
          name: 'bars'
        })
      } catch (err) {
        console.log(err)
      }
    },
    updateVenue: function (updatedTitle) {
      this.venue = updatedTitle
    },
    updateOffering: function (updatedOffering) {
      this.spunte = updatedOffering
      console.log('update', this.spunte)
    },
    createBar () {
      const bar = Object.assign(this.venue, this.spunte)
      this.bar = bar
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
