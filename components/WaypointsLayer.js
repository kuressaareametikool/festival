import { shorten, iconSizes } from "../utils.js";

export default {
  props: ["waypoints", "zoom", "activeCounty", "activeEventId"],
  methods: { shorten, iconSizes },
  template: `
  <div>

    <l-circle-marker
      v-if="waypoints.length && zoom < 9"
      v-for="(w,i) in waypoints.filter(w => w.county !== activeCounty)"
      :key="i"
      :lat-lng="[w.lat,w.lng]"
      @clickk="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 10; center = [w.lat,w.lng]"
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

    <l-marker
      v-if="waypoints.length && zoom >= 9"
      v-for="(w,i) in waypoints"
      :key="'l6' + i"
      :lat-lng="[w.lat,w.lng]"
      @clickk="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 12; center = [w.lat,w.lng]"
    >
      <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
      <l-icon
        :icon-url="
          w.stage_id == 1297
          ? 'markers/event_' + (w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? 'brown' : 'gray') + '.png'
          : 'markers/torch_' + (w.county !== 'hiiumaa' && w.county !== 'saaremaa' ? 'blue' : 'gray') + '.png'
        "
        :icon-size="[ iconSizes(zoom) * 18 * (activeEventId == w.ID ? 1.5 : 1), iconSizes(zoom) * 18 * (activeEventId == w.ID ? 1.5 : 1) ]"
        :icon-anchor="[ iconSizes(zoom) * 18/2, iconSizes(zoom) * 18/2 ]"
      />
    </l-marker>

  </div>
  `
};
