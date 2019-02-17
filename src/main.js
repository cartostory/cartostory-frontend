// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import Vuetify from 'vuetify';
import VueSanitize from 'vue-sanitize';
import App from './App';

require('../node_modules/vuetify/dist/vuetify.min.css');

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
