export default {
  props: ['event'],
  template: `
    <div class="Event">
      <div @click="$emit('closeEvent')">×</div>
      <div>{{ event.name }}</div>
    </div>
  `
}