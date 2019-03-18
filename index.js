import { parseSheet } from './utils.js';

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);

Vue.config.devtools = true;

new Vue({
  el: "#app",
  data: {
    url2: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
    zoom: 9,
    center: [59, 24],
    markers: [],
    id: '19Xj62Df8IvP-yLDpMKEWknR-ytazmbIwAIJptxHPZgA',
    value: null
  },
  methods: {
    onClick(i) {
      console.log(i);
    }
  },
  mounted() {
    fetch(
      `https://spreadsheets.google.com/feeds/list/${
        this.id
      }/od6/public/values?alt=json`
    )
    .then(res => res.json())
    .then(res => {
      this.markers = parseSheet(res).map(m => {
        m.lat = parseFloat(m.lat)
        m.lng = parseFloat(m.lng)
        return m
      })
    });
  },
  template: `
  <div style="display: flex">
    <l-map style="height: 100vh; width: 80vw" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"/>
      <l-marker
        v-if="markers.length"
        v-for="(m,i) in markers"
        :lat-lng="[m.lat,m.lng]"
        @click="onClick(i)"
      />
      <l-polyline
        v-if="markers"
        :lat-lngs="markers.map(m => [m.lat,m.lng])"
      />
    </l-map>
    <div style="padding: 20px">
      <div v-for="(m,i) in markers">
        <div>{{ m.title }}</div>
        <div>{{ [m.lat,m.lng] }}</div>
      </div>
    </div>
  </div>
  `
});
