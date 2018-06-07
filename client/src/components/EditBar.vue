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
        // ({
        //   name: 'bar',
        //   params: {
        //     barId: barId
        //   }
        // })
      } catch (err) {
        console.log(err)
      }
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
    SearchGoogleMap
  }
}

</script>

<style scoped>

</style>
