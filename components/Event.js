export default {
  props: ['event'],
  template: `
    <div class="Event">
      <div @click="$emit('closeEvent')">× Close</div>
      <div>{{ event.name }}</div>
      <div>Siia tuleb kirjendis</div>
    </div>
  `
}