<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="bookmarks"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.name}}
        </td>
        <!-- <td class="text-xs-right">
          {{ props.item.times.af_start_time.HH  }}:{{ props.item.times.af_start_time.mm  }}
          -{{ props.itemtimes.af_end_time.HH  }}:{{ props.item.times.af_end_time.mm  }}
          {{ props.item.times.ev_start_time.HH }}:{{ props.item.times.ev_start_time.mm }}
          -{{props.item.times.ev_end_time.HH  }}:{{ props.item.times.ev_end_time.mm  }}
        </td> -->
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'name'
        }
        // ,
        // {
        //   text: 'Happyhour',
        //   value: 'times'
        // }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>

<style>

</style>
git 