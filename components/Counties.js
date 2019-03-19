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
      :style="{background: localActiveCounty == county ? '#ddeeff' : ''}"
      @click="localActiveCounty = county; $emit('changeCounty', county)"
    >{{ county }}</div>
  </div>
  `
};
