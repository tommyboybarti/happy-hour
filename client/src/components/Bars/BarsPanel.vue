<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Happy Hours</v-toolbar-title>
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
          <v-layout row wrap>
            <v-flex xs12 sm8>
              <div class="bar-name">
                {{bar.name}}
              </div>
              <div class="bar-times">
                From {{ bar.times.af_start_time.HH  }}:{{ bar.times.af_start_time.mm  }}
                until {{ bar.times.af_end_time.HH  }}:{{ bar.times.af_end_time.mm  }}
                <br>
                and from {{ bar.times.ev_start_time.HH }}:{{ bar.times.ev_start_time.mm }}
                until {{ bar.times.ev_end_time.HH  }}:{{ bar.times.ev_end_time.mm  }}
              </div>
              <br>
              <div class="bar-address">
                {{bar.formatted_address}}
              </div>
            </v-flex>
            <v-flex xs12 sm4>
        <!-- this button is freaking sweet -->
              <v-btn
                :to="{
                  name: 'barId',
                  params: { barId: bar.id
                  }}"
                color="secondary"
                >
                View venue
              </v-btn>
              <br>
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
        console.log('barsPanel', this.bars)
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
.bar-name {
  font-size: 20px;
}
.bar-address{
  font-size: 12px;
}
.bar-times {
  font-size: 14px;
}
.button {
  margin-top: 10px;
}
</style>
