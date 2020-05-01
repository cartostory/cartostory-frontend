import Buefy from 'buefy'
import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import VueScrollTo from 'vue-scrollto';
import 'normalize.css';

import './assets/scss/index.scss';
import { domain, clientId } from '../auth_config.json';
import { Auth0Plugin } from './auth';
import App from './App.vue';
import router from './router';
import store from './store/newStore';

require('../node_modules/leaflet/dist/leaflet.css');

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VueLogger);
Vue.use(VueScrollTo);
Vue.use(Vuex);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#js-cartostory');
