import Buefy from 'buefy'
import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import VueScrollTo from 'vue-scrollto';
import 'normalize.css';
import './assets/scss/index.scss';

import App from './App.vue';
import router from './router';
import store from './store/newStore';

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueLogger);
Vue.use(VueScrollTo);
Vue.use(Vuex);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#js-cartostory');
