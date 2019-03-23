// Display a current location of the torch
// @TODO remove waypoints prop and ID hardcoding, pass correct waypoint instead

import { shorten, iconSizes } from "../utils.js";

export default {
  props: ["waypoints", "zoom", "activeCounty", "activeEventId"],
  methods: { shorten, iconSizes },
  template: `
  <div>
    <l-marker
      v-if="waypoints.length"
      v-for="(w,i) in waypoints.filter(w => w.ID == '66131')"
      :key="'l7' + i"
      :lat-lng="[w.lat,w.lng]"
      @clickk="activeEventId = w.ID; activeCounty = w.county; activePanel = 'event'; zoom = 12; center = [w.lat,w.lng]"
    >
      <l-tooltip>{{ shorten(w.name) }}</l-tooltip>
      <l-icon
        icon-url="markers/torch_blue.png"
        :icon-size="[ iconSizes(zoom) * 24 * (activeEventId == w.ID ? 1.5 : 1), iconSizes(zoom) * 24 * (activeEventId == w.ID ? 1.5 : 1) ]"
        :icon-anchor="[ iconSizes(zoom) * 24/2, iconSizes(zoom) * 24/2 ]"
      />
    </l-marker>
  </div>
  `
}