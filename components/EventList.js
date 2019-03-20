import { shorten } from '../utils.js'

export default {
  props: ['events'],
  methods: { shorten },
  template: `
    <div class="EventList">
      <h3>Events</h3>
      <div
        class="EventList__event"
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