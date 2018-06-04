<template>
  <div>

  </div>
</template>

<script>
import BarsService from '@/services/BarsService'
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      bar: null
    }
  },
  async mounted () {
    const barId = this.$store.state.route.params.barId
    const bar = await BarsService.show(barId)
    console.log(bar)
  },
  components: {
    Panel
  }
}

</script>

<style scoped>

</style>
