<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Bars</v-toolbar-title>
            <v-btn
            :to="{name: 'addBar'}"
            class="accent button"
            large
            absolute
            right
            fab
            v-if="isUserLoggedIn"
            >
            <v-icon>add</v-icon>
          </v-btn>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2 bar"
          v-for="bar in bars"
          v-bind:key="bar.id"
          >
          <v-layout>
            <v-flex xs6>
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
            <v-flex xs6>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BarsService from '@/services/BarsService'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      bars: null
    }
  },
  watch: {
    // listen to changes in query string
    '$route.query.search': {
      // as soon as comp has a value defined invoke a handler
      immediate: true,
      async handler (value) {
        // do a request to the backend for all the bars
        this.bars = (await BarsService.index(value)).data
      }
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}

</script>

<style scoped>
.bar {
  padding: 10px;
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
