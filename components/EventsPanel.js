import { shorten, titleCase } from '../utils.js'

export default {
  props: ['events', 'activeEvent', 'activeCounty'],
  methods: { shorten, titleCase },
  template: `
    <div class="EventsPanel">
      <div class="EventPanel__toolbar">
        <div style="opacity: 0.6" @click="$emit('back')">← Tagasi</div>
        <div @click="$emit('back')">{{ titleCase(activeCounty) }}</div>
        <div style="opacity: 0.3">⟨ ⟩</div>
      </div>
      <div
        class="EventsPanel__event"
        :style="{ background: activeEvent == event.ID ? 'var(--primary-light)' : ''}"
        v-for="(event,i) in events"
        :key="i"
        @click="$emit('changeEvent', event.ID)"
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