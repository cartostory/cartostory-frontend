import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import Vuetify from 'vuetify';
import VueSanitize from 'vue-sanitize';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(VueLogger);
Vue.use(VueScrollTo);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueSanitize, {
  allowedTags: ['a'],
  allowedAttributes: {
    // eslint-disable-next-line quote-props
    'a': ['data-url', 'id', 'data-cs-id'],
  },
});

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h(App),
}).$mount('#app');
