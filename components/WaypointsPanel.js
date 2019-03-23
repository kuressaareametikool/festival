import { shorten, titleCase } from '../utils.js'

export default {
  props: ['events', 'activeEvent', 'activeCounty'],
  methods: { shorten, titleCase },
  template: `
    <div class="WaypointsPanel">
      <div class="WaypointsPanel__toolbar">
        <div style="opacity: 0.6" @click="$emit('waypointsBack')">← Tagasi</div>
        <div @click="$emit('waypointsBack')">{{ titleCase(activeCounty) }}</div>
        <div style="opacity: 0.3">⟨ ⟩</div>
      </div>
      <div
        class="WaypointsPanel__event"
        :style="{ background: activeEvent == event.ID ? 'var(--primary-light)' : ''}"
        v-for="(event,i) in events"
        :key="i"
        @clickl="$emit('changeEvent', event.ID)"
        @click="$emit('waypointClick', event)"
        style="display: flex"
      >
        <div style="width: 20px; margin: 2px 10px 0 0;">
          <img :src="event.stage_id == 1297 ? 'markers/event_brown.png' : 'markers/torch_blue.png'" />
        </div>
        <div style="flex: 1">
          <div>{{ shorten(event.name) }}</div>
          <div style="font-size: 0.8em; opacity: 0.5">1. juuli - 12. juuli</div>
        </div>
      </div>
    </div>
  `
}