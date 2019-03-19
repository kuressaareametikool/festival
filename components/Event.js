export default {
  props: ['event'],
  template: `
    <div class="Event">
      <div class="CloseEvent" @click="$emit('closeEvent')">x</div>
      <div class="Event_image">
      <img src="https://2019.laulupidu.ee/wp-content/uploads/1969.jpg">
      </div>
      <div class="EventInfo">
      	<div class="EventInfo_date">
      	16.04
      	</div>
      	<div class="EventInfo_description">
      	Halleluuja
      	</div>
      </div>
      <div>{{ event.name }}</div>
    </div>
  `
}