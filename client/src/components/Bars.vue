<template>
  <panel title="Bars">
    <v-card-text>
      <div
        v-for="bar in bars"
        v-bind:key="bar.id">
          {{bar.title}} -
          {{bar.happyhour}} -
          {{bar.location}}
      </div>
    </v-card-text>
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
    // response.data invokes axios to return the content.
    this.bars = (await BarsService.index()).data
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
