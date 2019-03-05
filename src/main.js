import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import Vuetify from 'vuetify';
import VueSanitize from 'vue-sanitize';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import router from './router';
import store from './store';

String.prototype.hashCode = function() {
  let hash = 0;
  let i;
  let chr;

  if (this.length === 0) {
    return hash;
  }

  for (i = 0; i < this.length; i += 1) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

Vue.config.productionTip = false;
Vue.use(VueLogger);
Vue.use(VueScrollTo);
Vue.use(Vuetify);
Vue.use(VueSanitize, {
  allowedTags: ['a'],
  allowedAttributes: {
    // eslint-disable-next-line quote-props
    'a': ['data-url', 'id'],
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
