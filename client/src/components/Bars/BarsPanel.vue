<template>
  <v-container>
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
    </v-btn>
      <panel title="Bars">
        <div
          class="bar"
          v-for="bar in bars"
          v-bind:key="bar.id"
          >
          <v-layout>
            <v-flex>
              <div class="bar-title">
                {{bar.title}}
              </div>
              <div class="bar-happyhour">
                {{bar.happyhour}}
              </div>
              <div class="bar-location">
                {{bar.location}}
              </div>
            </v-flex>
            <v-flex>
        <!-- this button is freaking sweet -->
                <v-btn
                :to="{
                  name: 'barId',
                  params: { barId: bar.id
                  }}"
                color="secondary">
                View venue
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
      </panel>
  </v-container>
</template>

<script>
import Panel from '@/templates/Panel'
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
