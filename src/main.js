import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

/**
 * Font Awesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import {faMapMarkerAlt, faTint, faWind, faCloud, faCloudRain, faCloudSunRain, faSun, faCloudSun, faCloudShowersHeavy, faSnowflake, faSmog, faBolt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMapMarkerAlt, faTint ,faWind, faCloud, faCloudRain, faCloudSunRain, faSun, faCloudSun, faCloudShowersHeavy, faSnowflake, faSmog, faBolt);


const app = createApp(App);
app.use(VueAxios, axios);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
app.config.globalProperties.axios = axios;
