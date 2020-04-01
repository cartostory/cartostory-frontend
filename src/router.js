import Vue from 'vue';
import Router from 'vue-router';
import CsLoadStoryForm from './components/CsLoadStoryForm.vue';
import CsScreen from './components/CsScreen.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: CsScreen,
  },
  { path: '/load', component: CsLoadStoryForm },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
