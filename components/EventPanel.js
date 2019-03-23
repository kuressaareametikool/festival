import { titleCase } from '../utils.js'

export default {
  props: ["event", "activeCounty"],
  data: () => ({
    img:
      "https://2019.laulupidu.ee/wp-content/uploads/2014-peo-galeriid/XXVI-Laulupeo-II-kontsert/Aivar-Pihelgas/Pildid/D4R1066-255x190.jpg",
    img2:
      "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Oya-Festival-2016-foto-Didrick-Stenersen.jpg?t=ScaleToFill%7c725x360&ts=iXZP7SIL7vNV0z15N6vgU3PqbaM%3d&pr=2"
  }),
  methods: {
    titleCase
  },
  template: `
    <div class="EventPanel">
        <div class="EventPanel__toolbar">
        <div style="opacity: 0.6" @click="$emit('back')">← Tagasi</div>
          <div @click="$emit('back')">{{ titleCase(activeCounty) }}</div>
          <div style="opacity: 0.3">⟨ ⟩</div>
        </div>
        <div
        :style="{
          height: '200px',
          position: 'relative'
        }">
          <div
          :style="{
            backgroundImage: 'url(' + img2 + ')',
            position: 'absolute',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            filter: 'grayscale(100%)',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }"></div>
          <div
          :style="{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'rgba(154,59,38,0.65)',
          }"></div>
        </div>
      <div class="EventPanel__info">
      	<div class="EventPanel__date" style="transform: scale(0.8); opacity: 0.5;">
      		<h3 class="EventPanel__number">
      		16.
       		</h3>
       		<h5 class="EventPanel__month">
      		aprill
      		</h5>
      	</div>
      	<div class="EventPanel__meta" style="transform: translateY(-7px);">
       		<p class="EventPanel__location">
      		Orjaku külamaja	19.00-02.00
      		</p>
      	</div>
        </div>
        <h3 class="EventPanel__name" style="padding: 0 20px;">
      		{{ event.name }}
       	</h3>
      	<div class="EventPanel__description" style="opacity: 0.8">
      	Jazzfestivali koduses õhkkonnas võib nautida nii mahedamat kui ka mürglimat muusikat. Esinejad nii Eestist kui mujalt.
		Sissepääs tasuta.
      </div>
      <div></div>
    </div>
  `
};
