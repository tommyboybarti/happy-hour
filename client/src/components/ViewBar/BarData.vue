<template>
  <panel title="Happy Hour Info">
    <v-card-title>
      <h2>{{this.bar.name}}</h2>
    </v-card-title>
    <v-card-text>
      <h3>Happyhour</h3>
      <div class="bar-happyhour">
        Afternoon from
        {{ bar.times.af_start_time.HH  }}:{{ bar.times.af_start_time.mm  }}
        Until
        {{ bar.times.af_end_time.HH  }}:{{ bar.times.af_end_time.mm  }}
      </div>
      <div>
        Evening from
        {{ bar.times.ev_start_time.HH }}:{{ bar.times.ev_start_time.mm }}
        Until
        {{ bar.times.ev_end_time.HH  }}:{{ bar.times.ev_end_time.mm  }}
      </div>
    </v-card-text>
    <v-card-text>
      <h3>Offering</h3>
      {{this.bar.offering}}
    </v-card-text>
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
