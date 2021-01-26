<template>
	<div class="box_week">
		<div class="box_header">
			<p>Prévisions</p>
		</div>
		<div class="box_body">
			<ul v-if="!reload"  class="weekly">
				<li class="day" @click="setActive(index, item)" :class="{'active' : index === isActive }" v-for="(item, index) in weather" :key="index">
					<font-awesome-icon v-if="!reload" class="icon"  :icon="['fas', icon(item.weather[0].icon)]" />
					<div class="date">
						<p>{{dtDate(item.dt, true)}}</p>
						<p>{{dtDate(item.dt, false)}}</p>
					</div>
					<p class="temp">{{Math.round(item.temp.day)}} °C</p>
				</li>
			</ul>
		</div>
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: ['weather'],
		emits: ['daySelect'],
		data() {
			return {
				isActive: 0,
				reload: false,
			}
		},
		methods: {
			/**
             * Convertit les dt (milliseconds) donner par l'api en date locales.
             * @param {boolean} weekday - false pour retourner le mois et le jour en numeric et true pour le jour.
             */
			dtDate(date, weekday) {
				if(weekday) {
					const options = { weekday : 'short'};
					return new Date(date * 1000).toLocaleDateString("fr-FR", options);
				}
				const options = { month: 'numeric', day: 'numeric'};
				//To convert that time to human readable, you can multiple by 1000(milliseconds) and use the DateTime constructor to convert.
				return new Date(date * 1000).toLocaleDateString("fr-FR", options);
			},

			/**
			 * Ajoute un style au jour sélectionné et on émet l'index au parent.
			 * @param {number} index - Index du jour sélectionné.
			 */
			setActive(index){
				this.isActive = index;
				this.$emit('daySelect', index);
			},

			/**
			 * On attribut une icon météo personalisé celon le temps du jour.
			 * @param {string} weather - id de l'icon retourné par OpenWeatherMap.
			 */
			icon(weather) {
				switch (weather) {
					case '01d':
						return 'sun'
						break;
					case '02d':
						return 'cloud-sun'
						break;
					case '03d':
						return 'cloud'
						break;
					case '04d':
						return 'cloud'
						break;
					case '09d':
						return 'cloud-showers-heavy'
						break;
					case '10d':
						return 'cloud-sun-rain'
						break;
					case '11d':
						return 'bolt'
						break;
					case '13d':
						return 'snowflake'
						break;
					case '50d':
						return 'smog'
						break;
					default:
						break;
				}
			}
		},

		watch: {
			/**
			 * Reload les icons de la météo personalisés. 
			 */
			async weather() {
				this.reload = await true;
				this.reload = await false;
			}
		},
	}
</script>

<style lang='scss'>
	.box_week {
		position: absolute;
		height: 450px;
		width: 400px;
		background-color: rgb(23, 30, 41);
		border-radius: 10px;
		animation: slide_box_week .5s .8s ease-in-out forwards;
		visibility: hidden;
		color: #fff;
		padding: 5px 0px;

		.box_header p{
			font-size: 25px;
			font-weight: 700;
			margin-top: 10px;
		}

		.box_header, .box_body, .box_footer {
			padding: 3px 15px;
			margin-left: 4%;
		}

		.box_footer{
			display: flex;
			justify-content: center;
		}

		.btn{
			padding: 10px 35px;
			border-radius: 5px;
			outline: none;
			border: none;
			color:#fff;
			background: linear-gradient(230deg, #e66465, #9198e5);
			font-weight: 700;
			font-size: 14px;
			cursor: pointer;
			transition-duration: .3s;

			&:hover{
				box-shadow: 0px 0px 6px 1px rgba(255, 254, 254, 0.75);
				transition-duration: .3s;
			}

			.icon{
				font-size: 14px;
				margin-right: 10px;
			}
		}
	}

	.weekly {
		padding: 5px 0px;
		color: #fff;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;

		li{
			width: 50px;
			padding: 10px;
			text-align: center;
			background-color: rgb(42, 52, 65);
			margin: 0 5px 5px 0;
			border-radius: 5px;
			cursor: pointer;

			.date{
				margin: 6px 0 6px 0; 
				font-size: 13px;

				p:first-child::first-letter{
					text-transform: uppercase;
					font-size: 15px;
				}
			}

			.icon{
				font-size: 22px;
			}

			.temp{
				font-weight: 700;
			}
		}

		li, .active{
			transition-duration: .3s;
		}

		.active{
			background-color: #fff;
			color: rgb(42, 52, 65) ;
		}
	}

	@keyframes slide_box_week {
		0% {
			left: 0%;
		}

		100% {
			left: 98%;
			visibility: visible;
		}
	}
</style>