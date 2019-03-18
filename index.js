import { parseSheet } from "./utils.js";

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);
Vue.component("l-geo-json", Vue2Leaflet.LGeoJson);

import Event from "./components/Event.js";

Vue.config.devtools = true;

new Vue({
  components: { Event },
  el: "#app",
  data: {
    url2: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
    zoom: 9,
    center: [59, 24],
    markers: [],
    id: "19Xj62Df8IvP-yLDpMKEWknR-ytazmbIwAIJptxHPZgA",
    value: null,
    county: null,
    counties: [
      "harjumaa",
      "hiiumaa",
      "jogevamaa",
      "laanemaa",
      "laanevirumaa",
      "parnumaa",
      "polvamaa",
      "raplamaa",
      "saaremaa",
      "tartu",
      "valgamaa",
      "viljandimaa",
      "vorumaa"
    ],
    c: {}
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
          m.lat = parseFloat(m.lat);
          m.lng = parseFloat(m.lng);
          return m;
        });
      });

    this.counties.forEach(c => {
      fetch(`./tracks/${c}.json`)
        .then(res => res.json())
        .then(res => {
          this.c[c] = res;
        });
    });
  },
  template: `
  <div style="display: flex">
    <l-map style="height: 100vh; width: 80vw" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"/>
      <l-geo-json
        v-if="c"
        v-for="(cc,i) in c"
        :geojson="cc"
      />
      <l-marker
        v-if="markers.length"
        v-for="(m,i) in markers"
        :lat-lng="[m.lat,m.lng]"
        @click="onClick(i)"
      />
    </l-map>
    <div style="flex: 1">
      <Event title="Hello" />
    </div>
    </div>
  </div>
  `
});
