import { shorten, iconSizes, zooms } from "../utils.js";

export default {
  props: ["pois", "zoom"],
  data: () => ({ zooms }),
  methods: { shorten, iconSizes },
  template: `
  <div>
    <l-circle-marker
      v-if="pois.length && zoom < zooms.counties"
      v-for="(p,i) in pois"
      :key="i"
      :lat-lng="[p.lat,p.lng]"
      :fill="true"
      :radius="zoom - 4"
      color="#777"
      fillColor="#aaa"
      :fillOpacity="1"
      :weight="2"
      :opacity="0.5"
    >
      <l-tooltip>{{ shorten(p.title) }}</l-tooltip>
    </l-circle-marker>

    <l-marker
      v-if="pois.length && zoom >= zooms.counties"
      v-for="(p,i) in pois"
      :key="'pois2_' + i"
      :lat-lng="[p.lat,p.lng]"
    >
      <l-tooltip>{{ shorten(p.title) }}</l-tooltip>
      <l-icon
        :icon-url="p.type == 'poi' ? 'markers/poi_gray.png' : 'markers/photo_gray.png'"
        :icon-size="[ iconSizes(zoom) * 18, iconSizes(zoom) * 18 ]"
        :icon-anchor="[ iconSizes(zoom) * 18/2, iconSizes(zoom) * 18/2 ]"
      />
    </l-marker>
  </div>
  `
};
