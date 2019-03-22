import { parseSheet, waypointsToGeoJSON, shorten } from "./utils.js";

// Leaflet map components

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);
Vue.component("l-geo-json", Vue2Leaflet.LGeoJson);
Vue.component("l-icon", Vue2Leaflet.LIcon);
Vue.component("l-tooltip", Vue2Leaflet.LTooltip);
Vue.component('l-tooltip', Vue2Leaflet.LTooltip)
Vue.component('l-popup', Vue2Leaflet.LPopup)
Vue.component('l-circle-marker', Vue2Leaflet.LCircleMarker)
Vue.component('l-control-zoom', Vue2Leaflet.LControlZoom)

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
      //"eesti",
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
      "harjumaa"
    ],
    centers: {
      hiiumaa: [58.87, 22.67],
      saaremaa: [58.37, 22.46],
      harjumaa: [59.35, 24.93],
      valgamaa: [57.86, 26.23],
      vorumaa: [57.89, 27.01],
      parnumaa: [58.45, 24.52],
      idavirumaa: [59.23, 27.42],
      jarvamaa: [58.9, 25.63],
      laanemaa: [58.95, 23.81],
      laanevirumaa: [59.23, 26.38],
      polvamaa: [58.08, 27.12],
      raplamaa: [58.93, 24.66],
      viljandimaa: [58.33, 25.57],
      tartumaa: [58.39, 26.73],
      jogevamaa: [58.74, 26.49],
      eesti: [58.82, 25.54],
    },
    iconSizes: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1.5, 2, 2, 2, 3, 3, 3],
    countiesData: [],
    waypoints: [],
    activeCounty: "laanemaa",
    activeEventId: null,
    activePanel: "counties"
  },
  methods: {
    buffer: turf.buffer,
    waypointsToGeoJSON,
    shorten
  },
  computed: {
    activeEvent() {
      if (this.activeEventId) {
        return this.waypoints.filter(w => w.ID == this.activeEventId)[0];
      }
      return null;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs.map.mapObject.zoom);
    // });

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
          this.countiesData.push({ county: c, data: res });
        });
    });

    fetch("./waypoints/waypoints_with_counties.json")
      .then(res => res.json())
      .then(res => (this.waypoints = res));
  },
  template: `
  <div>
    <div style="position: sticky; top: 0; box-shadow: 0px 3px 5px rgba(0,0,0,0.1); z-index: 1000000000000;">
    <Top />
    </div>
    <div style="display: flex">
    <l-map
      ref="map"
      style="height: calc(100vh - 60px); width: 75vw"
      :zoom="zoom"
      :center="center"
      @update:zoom="newZoom => zoom = newZoom"
      :zoomAnimation="true"
      :fadeAnimation="true"
      :markerZoomAnimation="true"
      :options="{zoomControl: false}"
    >
      <l-control-zoom position="bottomright"></l-control-zoom>
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
      
      <!-- Data from Google Sheets -->
      
      <l-circle-marker
        v-if="markers.length && zoom < 9"
        v-for="(m,i) in markers"
        :key="'l1' + i"
        :lat-lng="[m.lat,m.lng]"
        :fill="true"
        :radius="zoom - 4"
        color="#777"
        fillColor="#aaa"
        :fillOpacity="1"
        :weight="2"
        :opacity="0.5"
      >
        <l-tooltip>{{ shorten(m.title) }}</l-tooltip>
      </l-circle-marker>

      <l-marker
        v-if="markers.length && zoom >= 9"
        v-for="(m,i) in markers"
        :key="'l2' + i"
        :lat-lng="[m.lat,m.lng]"
      >
        <l-tooltip>{{ shorten(m.title) }}</l-tooltip>
        <l-icon
          :icon-url="m.type == 'poi' ? 'markers2/poi_gray.png' : 'markers2/photo_gray.png'"
          :icon-size="[ iconSizes[zoom] * 18, iconSizes[zoom] * 18 ]"
          :icon-anchor="[ iconSizes[zoom] * 18/2, iconSizes[zoom] * 18/2 ]"
        />
      </l-marker>
      
      <!--Tracks data -->

      <l-geo-json
        v-if="countiesData.length"
        v-for="(county,i) in countiesData"
        :key="'l3' + i"
        :geojson="county.data"
        :optionsStyle="{
          color: county.county !== 'hiiumaa' && county.county !== 'saaremaa' ? 'var(--fourth)' : '#777',
          opacity: county.county !== 'hiiumaa' && county.county !== 'saaremaa' ? 0.8 : 0.4
        }"
      />

      <l-circle-marker
        v-if="waypoints.length && zoom < 9"
        v-for="(w,i) in waypoints.filter(w => w.county !== activeCounty)"
        :key="'l4' + i"
        :lat-lng="[w.lat,w.lng]"
        @click="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 10; center = [w.lat,w.lng]"
        :fill="true"
        :radius="zoom - 4"
        :color="w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? w.stage_id == 1297 ? 'var(--secondary)' : 'var(--primary)' : '#777'"
        fillColor="white"
        :fillOpacity="1"
        :weight="2"
        :opacity="0.5"
      >
        <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
      </l-circle-marker>

      <l-circle-marker
        v-if="waypoints.length && zoom < 9"
        v-for="(w,i) in waypoints.filter(w => w.county == activeCounty)"
        :key="'l5' + i"
        :lat-lng="[w.lat,w.lng]"
        @click="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 10; center = [w.lat,w.lng]"
        :fill="true"
        :radius="zoom - 3"
        :color="w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? w.stage_id == 1297 ? 'var(--secondary)' : 'var(--primary)' : '#777'"
        fillColor="white"
        :fillOpacity="1"
        :weight="2"
        :opacity="0.5"
      >
        <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
      </l-circle-marker>

      <l-marker
        v-if="waypoints.length && zoom >= 9"
        v-for="(w,i) in waypoints"
        :key="'l6' + i"
        :lat-lng="[w.lat,w.lng]"
        @click="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 12; center = [w.lat,w.lng]"
      >
        <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
        <l-icon
          :icon-url="w.stage_id == 1297 ? 'markers2/event_' + (w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? 'brown' : 'gray') + '.png' : 'markers2/torch_' + (w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? 'blue' : 'gray') + '.png'"
          :icon-size="[ iconSizes[zoom] * 18 * (activeEventId == w.ID ? 1.5 : 1), iconSizes[zoom] * 18 * (activeEventId == w.ID ? 1.5 : 1) ]"
          :icon-anchor="[ iconSizes[zoom] * 18/2, iconSizes[zoom] * 18/2 ]"
        />
      </l-marker>

      <l-marker
        v-if="waypoints.length"
        v-for="(w,i) in waypoints.filter(w => w.ID == '66131')"
        :key="'l7' + i"
        :lat-lng="[w.lat,w.lng]"
        @click="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 12; center = [w.lat,w.lng]"
      >
        <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
        <l-icon
          icon-url="markers2/torch_blue.png"
          :icon-size="[ iconSizes[zoom] * 24 * (activeEventId == w.ID ? 1.5 : 1), iconSizes[zoom] * 24 * (activeEventId == w.ID ? 1.5 : 1) ]"
          :icon-anchor="[ iconSizes[zoom] * 24/2, iconSizes[zoom] * 24/2 ]"
        />
      </l-marker>

    </l-map>

    <div style="flex: 1; box-shadow: -3px 0px 5px rgba(0,0,0,0.1); z-index: 1000000">
      <transition appear name="fade" mode="out-in">
      <Counties
        v-if="activePanel == 'counties'"
        style="flex: 1;"
        :counties="counties"
        @changeCounty="c => { activeCounty = c; activePanel = 'eventlist', zoom = 9; center = centers[activeCounty] }"
        :activeCounty="activeCounty"
      />
      <EventList
        v-if="activePanel == 'eventlist'"
        style="flex: 1;"
        :events="waypoints.filter(w => w.county == activeCounty)"
        :active-event="activeEventId"
        :activeCounty="activeCounty"
        @changeEvent="id => { activeEventId = id; activePanel = 'event'; zoom = 12; center = [activeEvent.lat,activeEvent.lng] }"
        @back="activePanel = 'counties'; zoom = 7"
      />
      <Event
        v-if="activePanel == 'event'"
        style="flex: 1; box-shadow: -5px 0px 10px rgba(0,0,0,.1);"
        :event="waypoints.filter(w => w.ID == activeEventId)[0]"
        :activeCounty="activeCounty"
        @back="activePanel = 'eventlist'; zoom = 9; center = centers[activeCounty]"
      />
      </transition>
    </div>

    <div v-if="false" style="transform: scale(1.5); transform-origin: 0 20px; position: fixed; left: 20px; bottom: 20px; z-index: 1000000;">
        <img src="assets/kihid_menu.svg" />
      </div>
    <!-- </div> -->
  </div>
  </div>
  `
});

// #0073a5
