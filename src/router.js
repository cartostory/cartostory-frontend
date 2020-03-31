import Vue from 'vue';
import Router from 'vue-router';
import CsLoadStoryForm from './components/CsLoadStoryForm.vue';
import CsCreateStoryForm from './components/CsCreateStoryForm.vue';
import CsScreen from './components/CsScreen.vue';

Vue.use(Router);

export const routes = [
  { path: '/', component: CsScreen, },
  { path: '/load', component: CsLoadStoryForm },
  { path: '/create', component: CsCreateStoryForm },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
