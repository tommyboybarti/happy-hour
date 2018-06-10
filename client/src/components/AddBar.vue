<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12 md12 lg12 xl12>
        <panel title="Location on Google Maps - Search a venue">
          <search-google-map v-on:changeTitle="updateVenue($event)"/>
        </panel>
      </v-flex>
      <v-flex d-flex>
        <panel title="Contact Information" :venue="venue">
          <v-card-text>
             {{ venue.name }}
             <br>
             {{ venue.formatted_address }}
             <br>
             {{ venue.formatted_phone_number }}
             <br>
             {{ venue.rating }}
             <br>
             {{ venue.website }}
          </v-card-text>
        </panel>
        <panel title="Offering">
          <v-card-text>
            <v-text-field
              label="Offering"
              required
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

export default {
  data () {
    return {
      venue: {
        name: 'Name of bar',
        formatted_address: 'Address of bar',
        formatted_phone_number: 'Phone number',
        rating: 'Rating:',
        website: 'Website'
        // opening_hours: {
        //   weekday_text: 'opening hours'
      },
      bar: {
        title: null,
        happyhour: null,
        location: null,
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
    }
  },
  components: {
    SearchGoogleMap
  }
}

</script>

<style scoped>

</style>
