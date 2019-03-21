import { shorten } from '../utils.js'

export default {
  props: ['events', 'activeEvent', 'activeCounty'],
  methods: { shorten },
  template: `
    <div class="EventList">
      <div class="EventList_toolbar">
        <div @click="$emit('back')">Back</div>
        <div @click="$emit('back')">{{ activeCounty }}</div>
        <div>⟨ ⟩</div>
      </div>
      <div
        class="EventList__event"
        :style="{ background: activeEvent == event.ID ? 'var(--primary-light)' : ''}"
        v-for="(event,i) in events"
        :key="i"
        @click="$emit('changeEvent', event.ID)"
      >
        <div>{{ shorten(event.name) }}</div>
        <div style="font-size: 0.8em; opacity: 0.5">1. juuli - 12. juuli</div>
      </div>
    </div>
  `
}