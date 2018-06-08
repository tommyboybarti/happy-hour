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
      @click="bookmark"
      color="secondary"
      v-if="isUserLoggedIn && !isBookmarked">
      Bookmark
    </v-btn>
    <v-btn
      @click="unbookmark"
      color="secondary"
      v-if="isUserLoggedIn && isBookmarked">
      Unbookmark
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
      isBookmarked: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    try {
      const bookmark = (await BookmarksService.index({
        barId: this.bar.id,
        userId: this.$store.state.user.id
      })).data
      // !! cast something to true or false if its defined
      this.isBookmarked = !!bookmark
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    async bookmark () {
      try {
        await BookmarksService.post({
          barId: this.bar.id,
          userId: this.$store.state.user.id
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unbookmark () {
      try {
        await BookmarksService.delete({
          barId: this.bar.id,
          userId: this.$store.state.user.id
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>

<style scoped>

</style>
