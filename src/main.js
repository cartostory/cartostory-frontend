import Buefy from '../web_modules/buefy.js';
import Vue from '../web_modules/vue.js';
import Vuex from '../web_modules/vuex.js';
import VueScrollTo from '../web_modules/vue-scrollto.js';
//import 'normalize.css';
//import './assets/scss/index.scss';

import App from './App.vue';
import router from './router.js';
import store from './store/newStore.js';

//require('../node_modules/leaflet/dist/leaflet.css');

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueScrollTo);
Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#js-cartostory');
