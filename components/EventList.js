export default {
  props: ['events'],
  template: `
    <div class="EventList">
      <h3>Events</h3>
      <div class="EventList__event" v-for="(event,i) in events" :key="i">
        <div>{{ event.name }}</div>
      </div>
    </div>
  `
}