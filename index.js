Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-polyline', Vue2Leaflet.LPolyline)

Vue.config.devtools = true;

new Vue({
  el: "#app",
  data: {
    url2: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
    zoom: 9,
    center: [59, 24],
    markers: [[59, 24],[59.2,24.2]]
  },
  methods: {
    onClick(i) {
      console.log(i)
    }
  },
  template: `
  <div style="display: flex">
    <l-map style="height: 100vh; width: 80vw" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"/>
      <l-marker v-for="(m,i) in markers" :lat-lng="m" @click="onClick(i)" />
      <l-polyline
        :lat-lngs="markers"
      />
    </l-map>
    <div style="padding: 20px">
      <div v-for="(m,i) in markers" style="display: flex;">
        <h3>Marker {{ i }}</h3>
      </div>
    </div>
  `
});
