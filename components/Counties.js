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
    <div class="Counties_toolbar">
      <div>Maakonnad</div>
    </div>
    <div
      v-for="(county,i) in counties"
      :key="i"
      class="Counties__county"
      :class="{Counties__county__active: localActiveCounty == county}"
      @click="localActiveCounty = county; $emit('changeCounty', county)"
      style="margin-right: 20px;"
      :style="{opacity: i >= 2 ? 1 : 0.25}"
    >
      <div 
        style="margin-right: 10px; width: 24px; height: 24px;"
      >
        <img
          v-if="i <= 2"
          style="width: 24px; height: 24px;"
          :style="{filter: i == 2 ? '' : 'grayscale(100%)'}"
          src="markers/marker-torch_brown@2x.png"
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
