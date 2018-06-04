<template>
  <panel title="Bars">
    <v-card-text>
      <v-btn
        :to="{name: 'addBar'}"
        class="cyan"
        medium
        absolute
        right
        fab>
        <v-icon>add</v-icon>
      </v-btn>
      <div
        class="bar"
        v-for="bar in bars"
        v-bind:key="bar.id">

        <div class="bar-title">
          {{bar.title}}
        </div>
        <div class="bar-happyhour">
          {{bar.happyhour}}
        </div>
        <div class="bar-location">
          {{bar.location}}
        </div>
        <v-btn
          :to="{name: 'barId'}"
          color="primary">
          View venue
        </v-btn>
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
.bar {
  padding: 20px;
  height: 180px;
  overflow: hidden;
}
.bar-title {
  font-size: 30px;
}
.bar-happyhour {
  font-size: 24px;
}
.bar-location {
  font-size: 18px;
}
</style>
