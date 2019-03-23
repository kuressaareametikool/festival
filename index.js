import { parseSheet, shorten, iconSizes, countyCenters } from "./utils.js";

// Register vue-leaflet map components globally

Vue.component("l-map", Vue2Leaflet.LMap);
Vue.component("l-tile-layer", Vue2Leaflet.LTileLayer);
Vue.component("l-marker", Vue2Leaflet.LMarker);
Vue.component("l-polyline", Vue2Leaflet.LPolyline);
Vue.component("l-geo-json", Vue2Leaflet.LGeoJson);
Vue.component("l-icon", Vue2Leaflet.LIcon);
Vue.component("l-tooltip", Vue2Leaflet.LTooltip);
Vue.component("l-tooltip", Vue2Leaflet.LTooltip);
Vue.component("l-popup", Vue2Leaflet.LPopup);
Vue.component("l-circle-marker", Vue2Leaflet.LCircleMarker);
Vue.component("l-control-zoom", Vue2Leaflet.LControlZoom);

// Import custom components

import Top from "./components/Top.js";
import TorchLayer from "./components/TorchLayer.js";
import WaypointsLayer from "./components/WaypointsLayer.js";
import TracksLayer from "./components/TracksLayer.js";
import PoiLayer from "./components/PoiLayer.js";
import CountiesPanel from "./components/CountiesPanel.js";
import WaypointsPanel from "./components/WaypointsPanel.js";
import WaypointPanel from "./components/WaypointPanel.js";

new Vue({
  el: "#app",
  components: {
    Top,
    TorchLayer,
    WaypointsLayer,
    TracksLayer,
    PoiLayer,
    CountiesPanel,
    WaypointsPanel,
    WaypointPanel
  },
  data: {
    url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
    // For raw OSM map tiles uncomment the row below
    //url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
    zoom: 7,
    center: countyCenters.eesti,
    counties: [
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
    countyCenters,
    tracks: [],
    waypoints: [],
    pois: [],
    activeCounty: "laanemaa",
    activeEventId: null,
    activePanel: "counties"
  },
  computed: {
    activeEvent() {
      if (this.activeEventId) {
        return this.waypoints.filter(w => w.ID == this.activeEventId)[0];
      }
      return null;
    }
  },
  methods: {
    shorten,
    iconSizes
  },
  mounted() {
    // Get tracks

    this.counties.forEach(c => {
      fetch(`./tracks/${c}.json`)
        .then(res => res.json())
        .then(res => {
          this.tracks.push({ county: c, data: res });
        });
    });

    // Get waypoints

    fetch("./waypoints/waypoints_with_counties.json")
      .then(res => res.json())
      .then(res => (this.waypoints = res));

    // Get POIs / images (temporary placeholders)

    fetch(
      `https://spreadsheets.google.com/feeds/list/19Xj62Df8IvP-yLDpMKEWknR-ytazmbIwAIJptxHPZgA/od6/public/values?alt=json`
    )
      .then(res => res.json())
      .then(res => {
        this.pois = parseSheet(res).map(m => {
          m.lat = parseFloat(m.lat);
          m.lng = parseFloat(m.lng);
          return m;
        });
      });
  },
  template: `
  <div>
    <div style="
      position: sticky;
      top: 0;
      box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
      z-index: 1000000000000;
    ">
      <Top />
    </div>
    <div style="display: flex">
    <l-map
      ref="map"
      style="height: calc(100vh - 60px); width: 75vw;"
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
      
      <PoiLayer :pois="pois" :zoom="zoom" />
      <TracksLayer :tracks="tracks" :zoom="zoom" />
      <WaypointsLayer
        :waypoints="waypoints"
        :zoom="zoom"
        :activeCounty="activeCounty"
        :activeEventId="activeEventId"
      />
      <TorchLayer
        :waypoints="waypoints"
        :zoom="zoom"
        :activeCounty="activeCounty"
        :activeEventId="activeEventId"
      />

    </l-map>

    <div style="
      flex: 1;
      box-shadow: -3px 0px 5px rgba(0,0,0,0.1);
      z-index: 1000000"
    >
      <transition appear name="fade" mode="out-in">
      <CountiesPanel
        v-if="activePanel == 'counties'"
        style="flex: 1;"
        :counties="counties"
        @changeCounty="c => { activeCounty = c; activePanel = 'eventlist', zoom = 9; center = countyCenters[activeCounty] }"
        :activeCounty="activeCounty"
      />
      <EventsPanel
        v-if="activePanel == 'eventlist'"
        style="flex: 1;"
        :events="waypoints.filter(w => w.county == activeCounty)"
        :active-event="activeEventId"
        :activeCounty="activeCounty"
        @changeEvent="id => { activeEventId = id; activePanel = 'event'; zoom = 12; center = [activeEvent.lat,activeEvent.lng] }"
        @back="activePanel = 'counties'; zoom = 7"
      />
      <EventPanel
        v-if="activePanel == 'event'"
        style="flex: 1; box-shadow: -5px 0px 10px rgba(0,0,0,.1);"
        :event="waypoints.filter(w => w.ID == activeEventId)[0]"
        :activeCounty="activeCounty"
        @back="activePanel = 'eventlist'; zoom = 9; center = countyCenters[activeCounty]"
      />
      </transition>
    </div>

  </div>
  </div>
  `
});
