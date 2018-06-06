<template>
  <!-- <v-container>
    <v-btn
      :to="{name: 'addBar'}"
      class="accent button"
      medium
      fixed
      right
      fab
      v-if="$store.state.isUserLoggedIn"
      >
      <v-icon>add</v-icon>
    </v-btn> -->
    <v-layout column>
      <v-flex xs6>
        <bars-panel />
      </v-flex>
    </v-layout>
  <!-- </v-container> -->
</template>

<script>
import BarsPanel from './BarsPanel'
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
    BarsPanel
  }
}

</script>

<style scoped>
.bar {
  padding: 10px;
  height: 180px;
  overflow: hidden;
}
.bar-title {
  font-size: 20px;
}
.bar-happyhour {
  font-size: 18px;
}
.bar-location {
  font-size: 14px;
}
.button {
  margin-top: 10px;
}
</style>
