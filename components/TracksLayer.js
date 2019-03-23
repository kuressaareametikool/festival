export default {
  props: ['tracks','zoom'],
  template: `
  <div>
    <l-geo-json
      v-if="tracks.length"
      v-for="(t,i) in tracks"
      :key="'t' + i"
      :geojson="t.data"
      :optionsStyle="{
        color: t.county !== 'hiiumaa' && t.county !== 'saaremaa' ? 'var(--fourth)' : '#777',
        opacity: t.county !== 'hiiumaa' && t.county !== 'saaremaa' ? 0.8 : 0.4
      }"
    />
  </div>
  `
}