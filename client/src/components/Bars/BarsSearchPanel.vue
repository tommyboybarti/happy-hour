<template>
  <panel title="Search">
      <v-text-field
      label="Search by name of bar, happyhours etc."
      v-model="search">
    </v-text-field>
  </panel>

</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    // watching the search value as it changes and do a routerlinkup for being able to bookmark search results
    search: _.debounce(async function (value) {
      const route = {
        name: 'bars'
      }
      if (this.search !== '') {
        // put search term into query
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    // add a watcher to search query string that changes the search box content
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style scoped>

</style>
