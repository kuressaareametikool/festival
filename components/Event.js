export default {
  props: ["event"],
  data: () => ({
    img:
      "https://2019.laulupidu.ee/wp-content/uploads/2014-peo-galeriid/XXVI-Laulupeo-II-kontsert/Aivar-Pihelgas/Pildid/D4R1066-255x190.jpg",
    img2:
      "https://www.visitoslo.com/Images/Bilder%20Oslo/Hva%20skjer/Oya-Festival-2016-foto-Didrick-Stenersen.jpg?t=ScaleToFill%7c725x360&ts=iXZP7SIL7vNV0z15N6vgU3PqbaM%3d&pr=2"
  }),
  // ⟨‹›⟩
  template: `
    <div class="Event">
        <div class="Event_toolbar">
          <div @click="$emit('back')">Back</div>
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
      		Orjaku külamaja	19.00-02.00
      		</p>
      	</div>
      	</div>
      	<div class="EventInfo_description">
      	Jazzfestivali koduses õhkkonnas võib nautida nii mahedamat kui ka mürglimat muusikat. Esinejad nii Eestist kui mujalt.
		Sissepääs tasuta.
      </div>
      <div></div>
    </div>
  `
};
