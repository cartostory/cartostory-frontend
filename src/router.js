import Vue from 'vue';
import Router from 'vue-router';
import CsConfig from './components/CsConfig.vue';
import CsMap from './components/CsMap.vue';
import CsScreen from './components/CsScreen.vue';
import CsStory from './components/CsStory.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: CsScreen,
  },
  { path: '/config', component: CsConfig },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
