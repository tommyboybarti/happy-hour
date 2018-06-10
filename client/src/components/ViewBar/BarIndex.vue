<template>
<v-container>
  <v-layout>
    <v-flex xs6>
      <bar-data :bar="bar" />
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import BarsService from '@/services/BarsService'
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
    BarData
  }
}

</script>

<style scoped>

</style>
