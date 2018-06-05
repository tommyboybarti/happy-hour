<template>
  <panel title="Bar Metadata">
    <div>
      {{this.bar.title}}
    </div>
  </panel>
</template>

<script>
import BarsService from '@/services/BarsService'
import Panel from '@/templates/Panel'

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
    Panel
  }
}

</script>

<style scoped>

</style>
