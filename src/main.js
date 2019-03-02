import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import Vuetify from 'vuetify';
import VueSanitize from 'vue-sanitize';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueLogger);
Vue.use(Vuetify);
Vue.use(VueSanitize, {
  allowedTags: ['a'],
  allowedAttributes: {
    // eslint-disable-next-line quote-props
    'a': ['data-url'],
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
