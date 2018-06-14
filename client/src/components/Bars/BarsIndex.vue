<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm5 md4 lg4 xl4>
        <bars-search-panel />
        <bars-bookmarks v-if="isUserLoggedIn"/>
      </v-flex>
      <v-flex sm7 md8 lg8 xl8>
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
import {mapState} from 'vuex'

export default {
  data () {
    return {
      bars: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  // await allways goes with async
  async mounted () {
    // do a request to the backend for all the bars
    // response.data invokes axios to return the content.
    this.bars = (await BarsService.index()).data
    console.log('barsINdex', this.bars)
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
