export default {
  props: ['events'],
  template: `
    <div class="EventList">
      <h3>Events</h3>
      <div
        class="EventList__event"
        v-for="(event,i) in events"
        :key="i"
        @click="$emit('changeEvent', event.ID)"
      >
        <!--<div>{{ event.name }}</div>-->
        <div class="EventInfo">
        <div class="EventInfo_date">
          <h3 class="EventInfo_date_number">
          16.
          </h3>
          <h5 class="EventInfo_date_month">
          aprill
          </h5>
        </div>
        <div class="EventInfo_meta">
          <h3 class="EventInfo_name">
          {{ event.name }}
          </h3>
          <p class="EventInfo_location">
          Orjaku külamaja 19.00-02.00
          </p>
        </div>
        </div>
      </div>
    </div>
  `
}