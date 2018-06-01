<template>
  <v-layout>
    <v-flex>
      <panel title="Bar Metadata">
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
      </panel>
    </v-flex>
    <v-flex>
      <panel title="What are they offering?">
        <v-text-field
          label="Offering"
          required
          :rules="[required]"
          v-model="bar.offering">
        </v-text-field>
      </panel>
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
          color="primary">Add venue
        </v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import BarsService from '@/services/BarsService'

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
    Panel
  }
}

</script>

<style scoped>

</style>
