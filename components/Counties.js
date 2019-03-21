export default {
  props: ["counties", "activeCounty"],
  data: () => ({
    localActiveCounty: null
  }),
  mounted() {
    this.localActiveCounty = this.activeCounty
  },
  template: `
  <div class="Counties">
    <div
      v-for="(county,i) in counties"
      :key="i"
      class="Counties__county"
      :style="{background: localActiveCounty == county ? '#fff' : ''}"
      @click="localActiveCounty = county; $emit('changeCounty', county)"
    >
      <div>{{ county }}</div>
      <div style="font-size: 0.8em; opacity: 0.5">1. juuli - 12. juuli</div>
    </div>
  </div>
  `
};
