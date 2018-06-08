<template>
  <panel title="Bar Metadata">
    <v-card-title>
      {{this.bar.title}}
      <br>
      Happyhour: {{this.bar.happyhour}}
    </v-card-title>
    <v-card-text>
      {{this.bar.offering}}
    </v-card-text>
    <!-- looks broken below but acutally works fine.. -->
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
