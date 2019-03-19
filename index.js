import { parseSheet, waypointsToGeoJSON } from "./utils.js";

// Leaflet map components

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);
Vue.component("l-geo-json", Vue2Leaflet.LGeoJson);
Vue.component("l-icon", Vue2Leaflet.LIcon);

// Custom components

import Top from "./components/Top.js";
import Counties from "./components/Counties.js";
import EventList from "./components/EventList.js";
import Event from "./components/Event.js";

new Vue({
  el: "#app",
  components: { Top, Counties, EventList, Event },
  data: {
    url2: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
    zoom: 7,
    center: [58.75, 24],
    markers: [],
    id: "19Xj62Df8IvP-yLDpMKEWknR-ytazmbIwAIJptxHPZgA",
    value: null,
    counties: [
      "harjumaa",
      "hiiumaa",
      "idavirumaa",
      "jogevamaa",
      "jarvamaa",
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
    countiesData: [],
    waypoints: [],
    activeCounty: "hiiumaa",
    activeEventId: null
  },
  methods: {
    buffer: turf.buffer,
    waypointsToGeoJSON
  },
  mounted() {
    // fetch(
    //   `https://spreadsheets.google.com/feeds/list/${
    //     this.id
    //   }/od6/public/values?alt=json`
    // )
    //   .then(res => res.json())
    //   .then(res => {
    //     this.markers = parseSheet(res).map(m => {
    //       m.lat = parseFloat(m.lat);
    //       m.lng = parseFloat(m.lng);
    //       return m;
    //     });
    //   });

    this.counties.forEach(c => {
      fetch(`./tracks/${c}.json`)
        .then(res => res.json())
        .then(res => {
          this.countiesData.push({ county: c, data: res });
        });
    });

    fetch("./waypoints/waypoints_with_counties.json")
      .then(res => res.json())
      .then(res => (this.waypoints = res));
  },
  template: `
  <div>
    <Top />
    <Counties
      :counties="counties"
      @changeCounty="c => activeCounty = c"
      :activeCounty="activeCounty"
    />
    <div style="display: flex">
    <l-map style="height: 100vh; width: 75vw" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"/>
      
      <!-- Buffered geometry for debugging -->
      
      <!--
      <l-geo-json
        v-if="countiesData.length"
        v-for="(county,i) in countiesData"
        :key="'l1' + i"
        :geojson="buffer(county.data,1)"
        :optionsStyle="{ color: '#0084b2', opacity: county.county == activeCounty ? 1 : 0.2 }"
      />
      <l-geo-json
        v-if="waypoints"
        :geojson="buffer(waypointsToGeoJSON(waypoints),1)"
        :optionsStyle="{}"
      />
      -->
      
      <!-- Fake data from Google Sheets -->
      
      <!--l-marker
        v-if="markers.length"
        v-for="(m,i) in markers"
        :key="'l2' + i"
        :lat-lng="[m.lat,m.lng]"
        @click="onClick(i)"
      /-->
      
      <!--Tracks data -->

      <l-geo-json
        v-if="countiesData.length"
        v-for="(county,i) in countiesData"
        :key="'l3' + i"
        :geojson="county.data"
        :optionsStyle="{ color: '#0084b2', opacity: county.county == activeCounty ? 1 : 0.2 }"
      />

      <!--Waypoint data-->
      
      <l-marker
        v-if="waypoints.length"
        v-for="(w,i) in waypoints.filter(w => w.county == activeCounty)"
        :key="'l4' + i"
        :lat-lng="[w.lat,w.lng]"
      >
        <!-- <l-icon
          :icon-url="w.icon ? w.icon : ''"
          :icon-size="[44 / 2,51 / 2]"
          :icon-anchor="[44 / 2 / 2, 51 / 2]"
        /> -->
        <l-icon
          :icon-url="Math.floor(Math.random()*2) == 0 ? 'markers/marker-donut-blue.png' : 'markers/marker-donut-red.png'"
          :icon-size="[ 18, 18 ]"
          :icon-anchor="[ 18/2, 18/2 ]"
        />
      </l-marker>

    </l-map>

    <div style="flex: 1;">
      <EventList
        v-if="!activeEventId"
        :events="waypoints.filter(w => w.county == activeCounty)"
        @changeEvent="id => activeEventId = id"
      />
      <Event
        v-if="activeEventId"
        :event="waypoints.filter(w => w.ID == activeEventId)[0]"
        @closeEvent="() => activeEventId = null"
      />
    </div>
    <!-- </div> -->
  </div>
  </div>
  `
});

// #0073a5
