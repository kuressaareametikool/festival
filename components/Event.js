export default {
  props: ['event'],
  data: () => ({ img: 'https://2019.laulupidu.ee/wp-content/uploads/2014-peo-galeriid/XXVI-Laulupeo-II-kontsert/Aivar-Pihelgas/Pildid/D4R1066-255x190.jpg'}),
  template: `
    <div class="Event">
	
				<div class="CloseEvent" @click="$emit('closeEvent')">&times;</div>
				<div class="Event_image">
					<img :src="img">
        </div>
        <!--div style="">
        </div-->
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
}