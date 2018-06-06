<template>
<v-container>
  <v-layout>
    <v-flex xs6>
      <bar-data :bar="bar" />
    </v-flex>
    <!--
      <v-flex xs6>
      <google-map />
      </v-flex>
      <v-flex xs6>
      <panel title="Offering">
        <v-card-text>
          {{this.bar.offering}}
        </v-card-text>
      </panel>
    </v-flex>
  </v-layout>
    <v-layout>
    <v-flex xs6>
    <panel title="Location">
      <v-card-title>
        {{this.bar.title}}
      </v-card-title>
      <v-card-text>
        {{this.bar.happyhour}}
      </v-card-text>
    </panel>
    </v-flex>
    <v-flex xs6>
      <panel title="Offering">
        <v-card-text>
          {{this.bar.offering}}
        </v-card-text>
      </panel>
    </v-flex> -->
  </v-layout>
</v-container>
</template>

<script>
import BarsService from '@/services/BarsService'
import Panel from '@/templates/Panel'
import BarData from './BarData'

export default {
  data () {
    return {
      bar: {}
    }
  },
  async mounted () {
    // grab the bar id thru params
    const barId = this.$store.state.route.params.barId
    // we get the barid back and attach it to the bar
    this.bar = (await BarsService.show(barId)).data
    console.log(this.bar)
  },
  components: {
    Panel,
    BarData
  }
}

</script>

<style scoped>

</style>
