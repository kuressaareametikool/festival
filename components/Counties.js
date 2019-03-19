export default {
  props: ["counties"],
  data: () => ({
    activeCounty: null
  }),
  template: `
  <div class="Counties">
    <div
      v-for="(county,i) in counties"
      :key="i"
      class="Counties__county"
      :style="{background: county == activeCounty ? '#ddeeff' : ''}"
      @click="activeCounty = county; $emit('changeCounty', county)"
    >{{ county }}</div>
  </div>
  `
};
