import { titleCase } from '../utils.js'

export default {
  props: ["counties", "activeCounty"],
  data: () => ({
    localActiveCounty: null
  }),
  mounted() {
    this.localActiveCounty = this.activeCounty
  },
  methods: {
    titleCase
  },
  template: `
  <div class="CountiesPanel">
    <div class="CountiesPanel__toolbar">
      <div>Maakonnad</div>
    </div>
    <div
      v-for="(county,i) in counties"
      :key="i"
      class="CountiesPanel__county"
      :class="{CountiesPanel__county__active: localActiveCounty == county}"
      @click="localActiveCounty = county; $emit('countyClick', county)"
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
          src="../markers/torch_blue.png"
        />
      </div>
      <div style="
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div>{{ titleCase(county) }}</div>
        <div style="font-size: 0.8em; opacity: 0.5">1. juuli - 12. juuli</div>
      </div>
    </div>
  </div>
  `
};
