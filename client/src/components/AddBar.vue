<template>
<v-layout row wrap>
  <v-flex d-flex sm6 md6 lg6 xl6>
    <panel title="Please enter your information">
      <v-card-text>
      <v-text-field
        label="Title"
        required
        :rules="[required]"
        v-model="bar.title">
      </v-text-field>
      <v-text-field
        label="Happy Hour Times"
        required
        :rules="[required]"
        v-model="bar.happyhour">
      </v-text-field>
      <v-text-field
        label="Address"
        required
        :rules="[required]"
        v-model="bar.location">
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
  <v-flex>
    <panel title="Location on Google Maps - Search and save address">
      <search-google-map />
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import Panel from '@/templates/Panel'
import BarsService from '@/services/BarsService'
import SearchGoogleMap from '@/templates/SearchGoogleMap'

export default {
  data () {
    return {
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
    }
  },
  components: {
    Panel,
    SearchGoogleMap
  }
}

</script>

<style scoped>

</style>
