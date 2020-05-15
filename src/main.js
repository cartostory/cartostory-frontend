import Buefy from 'buefy';
import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import VueScrollTo from 'vue-scrollto';
import 'normalize.css';

import './assets/scss/index.scss';
import { UPDATE_TOKEN } from '@/store/mutations';
import { audience, domain, clientId } from '../auth_config.json';
import { Auth0Plugin, getInstance } from './auth';
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
  audience,
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

const auth0Instance = getInstance();

auth0Instance.$watch('loading', async (loading) => {
  if (!loading && auth0Instance.isAuthenticated) {
    const token = await auth0Instance.getTokenSilently();
    store.commit(UPDATE_TOKEN, token);
  }
});
