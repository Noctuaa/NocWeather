<template>
    <div class="weather" v-if="loading">
        <WeatherSelect :index="index" :daily="daily" :city="city"/>
        <WeatherWeek @daySelect="getIndex" :weather="daily">
            <div class="box_footer">            
                <button class="btn" @click="geolocation">
                    <font-awesome-icon class="icon" title="icon localization" :icon="['fas', 'map-marker-alt']" />
                    Me localiser
                </button>
            </div>
        </WeatherWeek>
    </div>
</template>

<script>
    import WeatherSelect from './WeatherSelect';
    import WeatherWeek from './WeatherWeek';

    export default {
        components: {
            WeatherSelect,
            WeatherWeek
        },
        data() {
            return {
                daily: '',
                index: 0,
                city: {}, 
                coord: {
                    lat: '',
                    lon: ''
                },
                loading: false
            }
        },

        methods: {
            /**
             * On utilise l'api geocoding de OpenWeatherMap.
             * On récupére la longitude et latitude avec le nom de la ville et du pays.
             */
            async getCoord() {
                const response = await this.axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${this.city.name},${this.city.country}&appid=${process.env.VUE_APP_WEATHEY_KEY}`
                );
                this.coord.lat = await response.data[0].lat;
                this.coord.lon = await response.data[0].lon;
            },

            /**
             * On utilise l'api One Call de OpenWeatherMap.
             * On récupère la météo depuis la latitude et la longitude.
             */
            async getWeather() {
                try {
                    if(this.coord.lat === "" && this.coord.lon === ""){
                        await this.getCoord();
                    }
                    const response = await this.axios.get(
                        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.coord.lat}&lon=-${this.coord.lon}&exclude=hourly,minutely,alerts&units=metric&lang=fr&appid=${process.env.VUE_APP_WEATHEY_KEY}`
                    );
                    this.daily = await response.data.daily;
                    this.loading = true;
                } catch (error) {
                    console.log(error.data);
                }
            },
            
            /**
             * On utilise l'api geocoding de OpenWeatherMap avec reverse.
             * On récupère le nom de la ville avec la latitude et la longitude.
             */
            async cityName() {
                try {
                    const response = await this.axios.get(
                        `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.coord.lat}&lon=${this.coord.lon}&limit=5&appid=${process.env.VUE_APP_WEATHEY_KEY}`
                    )
                    this.city = response.data[0]
                } catch (error) {
                    console.log(error.response);
                }
            },

            /**
             * On récupère l'index du jour sélectionné depuis le WeatherWeek
             * @param {number} payload - Index jour sélectionné
             */
            getIndex(payload){
                this.index = payload;
            },

            /**
             * Permet de se géolocaliser.
             * On récupére la latidute et la longitude pour obtenir la météo et le nom de la ville.
             */
            async geolocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.coord.lat = position.coords.latitude;
                        this.coord.lon = position.coords.longitude
                        this.getWeather();
                        this.cityName();
                    });
                }
            },
        },
        mounted() {
            /*Par défault on récupère les informations locale et on demande la méteo */
            const country = Intl.DateTimeFormat().resolvedOptions();
            this.city.country = country.locale.split('-')[0];
            this.city.name = country.timeZone.split('/')[1];
            this.getWeather();        
        },
    }
</script>

<style lang='scss'>
	.weather{
        display: flex;
        align-items: center;
        position: relative;
        animation: slideLeft .8s ease-in-out forwards;
    }

    @keyframes slideLeft {
        0%{left: 0px}
        100%{left: -200px}
    }
</style>