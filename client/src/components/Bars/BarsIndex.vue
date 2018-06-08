<template>
  <v-container>
    <v-layout>
      <v-flex xs6>
        <bars-bookmarks />
      </v-flex>
      <v-flex xs6>
        <bars-search-panel />
        <bars-panel />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BarsPanel from './BarsPanel'
import BarsService from '@/services/BarsService'
import BarsSearchPanel from './BarsSearchPanel'
import BarsBookmarks from './BarsBookmarks'

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
    BarsPanel,
    BarsSearchPanel,
    BarsBookmarks
  }
}

</script>

<style scoped>

</style>
