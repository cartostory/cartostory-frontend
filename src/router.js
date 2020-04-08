import Vue from 'vue';
import Router from 'vue-router';
import CsLoadStoryForm from './components/CsLoadStoryForm.vue';
import CsCreateStoryForm from './components/CsCreateStoryForm.vue';
import CsScreen from './components/CsScreen.vue';
import StoryScreen from '@/views/StoryScreen.vue';

Vue.use(Router);

export const routes = [
  { path: '/', component: StoryScreen, },
  { path: '/load', component: CsLoadStoryForm },
  { path: '/create', component: StoryScreen },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
