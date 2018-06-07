<template>
<v-container class="pa-2">
  <v-layout row wrap>
    <v-flex class="gmap-auto" d-flex xs12 sm12 align-center light>
      <gmap-autocomplete
        @place_changed="setPlace">
      </gmap-autocomplete>
      <v-btn
      @click="addMarker"
      color="primary"
      >Search and save address
      </v-btn>
    </v-flex>
    <v-flex d-flex xs12 sm12>
    <gmap-map
      :center="center"
      :zoom="15"
      style="width:80%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'SearchGoogleMap',
  data () {
    return {
      // default to Calgary to keep it simple
      // change this to whatever makes sense
      center: { lat: 51.0486, lng: -114.0708 },
      markers: [],
      places: [],
      currentPlace: null
    }
  },

  mounted () {
    this.geolocate()
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>

<style scoped>
.gmap-auto {
  padding: 10px;
}
</style>
