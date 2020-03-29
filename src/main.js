import Vue from 'vue';
import Vuex from 'vuex';
import VueLogger from 'vuejs-logger';
import VueSanitize from 'vue-sanitize';
import VueScrollTo from 'vue-scrollto';
import {
  Button,
  Col,
  Container,
  Form,
  FormItem,
  Input,
  Main,
  Option,
  Row,
  Select,
} from 'element-ui';
import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';

import App from './App.vue';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Col);
Vue.use(Container);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Main);
Vue.use(Option);
Vue.use(Row);
Vue.use(Select);

Vue.use(VueLogger);
Vue.use(VueScrollTo);
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
}).$mount('#cartostory');
