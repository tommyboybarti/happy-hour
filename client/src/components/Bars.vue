<template>
  <panel title="Bars">
    <div
      v-for="bar in bars"
      v-bind:key="bar.title">
        {{bar.title}}
        {{bar.happyhour}}
        {{bar.location}}
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import BarsService from '@/services/BarsService'

export default {
  data () {
    return {
      bars: null
    }
  },
  // await allways goes with async
  async mounted () {
    // do a request to the backend for all the bars
    this.bars = await BarsService.index()
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
