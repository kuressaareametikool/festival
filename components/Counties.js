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
      :class="{Counties__county__active: localActiveCounty == county}"
      @click="localActiveCounty = county; $emit('changeCounty', county)"
      style="margin-right: 20px;"
    >
      <div 
        style="margin-right: 10px; width: 24px; height: 24px;"
      >
        <img
          v-if="localActiveCounty == county"
          style="width: 24px; height: 24px;"
          src="markers/marker-torch__24x24@2x.png"
        />
      </div>
      <div style="
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div>{{ county }}</div>
        <div style="font-size: 0.8em; opacity: 0.5">1. juuli - 12. juuli</div>
      </div>
    </div>
  </div>
  `
};
