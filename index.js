import { parseSheet, waypointsToGeoJSON, shorten } from "./utils.js";

// Leaflet map components

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);
Vue.component("l-geo-json", Vue2Leaflet.LGeoJson);
Vue.component("l-icon", Vue2Leaflet.LIcon);
Vue.component('l-tooltip', Vue2Leaflet.LTooltip)

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
      "eesti",
      "saaremaa",
      "hiiumaa",
      "laanemaa",
      "raplamaa",
      "parnumaa",
      "viljandimaa",
      "valgamaa",
      "vorumaa",
      "polvamaa",
      "tartumaa",
      "jogevamaa",
      "idavirumaa",
      "laanevirumaa",
      "jarvamaa",
      "harjumaa",  
    ],
    iconSizes: [1,1,1,1,1,1,1,1,1,1.5,1.5,2,2,2,3,3,3],
    countiesData: [],
    waypoints: [],
    activeCounty: "hiiumaa",
    activeEventId: null,
    activePanel: 'counties',
  },
  methods: {
    buffer: turf.buffer,
    waypointsToGeoJSON,
    shorten
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.map.mapObject.zoom);
    })
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
    <div style="display: flex">
    <l-map
      ref="map"
      style="height: 100vh; width: 75vw"
      :zoom="zoom"
      :center="center"
      @update:zoom="z => zoom = z"
    >
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
        :optionsStyle="{ color: 'var(--fourth)', opacity: county.county == activeCounty ? 1 : 0.5 }"
      />

      <!--Waypoint data, active county -->
      
      <l-marker
        v-if="waypoints.length"
        v-for="(w,i) in waypoints.filter(w => w.county !== activeCounty)"
        :key="'l4' + i"
        :lat-lng="[w.lat,w.lng]"
      >
        <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
        <l-icon
          icon-url="markers/marker-donut_blue_light.png"
          :icon-size="[ iconSizes[zoom] * 18 / 2, iconSizes[zoom] * 18 / 2 ]"
          :icon-anchor="[ iconSizes[zoom] * 18/4, iconSizes[zoom] * 18/4 ]"
        />
      </l-marker>

      <!--Waypoint data, active county -->
      
      <l-marker
        v-if="waypoints.length"
        v-for="(w,i) in waypoints.filter(w => w.county == activeCounty)"
        :key="'l4' + i"
        :lat-lng="[w.lat,w.lng]"
      >
        <l-icon
          :icon-url="zoom > 8 ? 'markers/Marker_event2_BG@2x.png' : 'markers/marker-donut-red.png'"
          :icon-size="[ iconSizes[zoom] * 18, iconSizes[zoom] * 18 ]"
          :icon-anchor="[ iconSizes[zoom] * 18/2, iconSizes[zoom] * 18/2 ]"
        />
      </l-marker>

    </l-map>

    <div style="flex: 1;">
      <div style="display: flex">
      <Counties
        v-if="activePanel == 'counties'"
        style="flex: 1;"
        :counties="counties"
        @changeCounty="c => { activeCounty = c; activePanel = 'eventlist' }"
        :activeCounty="activeCounty"
      />
      <EventList
        v-if="activePanel == 'eventlist'"
        style="flex: 1;"
        :events="waypoints.filter(w => w.county == activeCounty)"
        :active-event="activeEventId"
        :activeCounty="activeCounty"
        @changeEvent="id => { activeEventId = id; activePanel = 'event' }"
        @back="activePanel = 'counties'"
      />
      <Event
        v-if="activePanel == 'event'"
        style="flex: 1; box-shadow: -5px 0px 10px rgba(0,0,0,.1);"
        :event="waypoints.filter(w => w.ID == activeEventId)[0]"
        @closeEvent="() => activeEventId = null"
        @back="activePanel = 'eventlist'"
      />
      </div>
    </div>

    <!-- </div> -->
  </div>
  </div>
  `
});

// #0073a5
