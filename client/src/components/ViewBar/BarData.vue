<template>
  <panel :title="bar.name">
<v-layout row wrap>
  <v-flex xs12 sm6>
    <v-card-text>
      <p>Phone number: {{ bar.formatted_phone_number}}</p>
      <p>Google rating: {{ bar.rating }}</p>
      <p><a :href="bar.website">Website</a></p>
      <v-btn
        :to="{
          name: 'editBar',
          params: { editBar: bar.id
          }}"
        color="secondary"
        v-if="isUserLoggedIn">
        Edit Info
      </v-btn>
      <v-btn
        @click="setAsBookmark"
        color="secondary"
        v-if="isUserLoggedIn && !bookmark">
        Set as bookmark
      </v-btn>
      <v-btn
        @click="unsetAsBookmark"
        color="secondary"
        v-if="isUserLoggedIn && bookmark">
        Unset as bookmark
      </v-btn>
    </v-card-text>
  </v-flex>
  <v-flex xs12 sm6>
    <v-card-text>
      <h3>Happy hours</h3>
        <p>Afternoon from
        {{ bar.times.af_start_time.HH  }}:{{ bar.times.af_start_time.mm  }}
        Until
        {{ bar.times.af_end_time.HH  }}:{{ bar.times.af_end_time.mm  }}
        <br>
        Evening from
        {{ bar.times.ev_start_time.HH }}:{{ bar.times.ev_start_time.mm }}
        Until
        {{ bar.times.ev_end_time.HH  }}:{{ bar.times.ev_end_time.mm  }}</p>
      <h3>Offering</h3>
      {{this.bar.offering}}
    </v-card-text>
  </v-flex>
</v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  // pass down bar metadata
  props: [
    'bar'
  ],
  data () {
    return {
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async bar () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        const bookmarks = (await BookmarksService.index({
          barId: this.bar.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          barId: this.bar.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>

<style scoped>

</style>
