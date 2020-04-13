import Vue from 'vue';
import Router from 'vue-router';

import Landing from '@/views/Landing.vue';
import CsLoadStoryForm from './components/CsLoadStoryForm.vue';
import StoryScreen from '@/views/StoryScreen.vue';

Vue.use(Router);

export const routes = [
  { path: '/', component: Landing, },
  { path: '/story/load', component: CsLoadStoryForm },
  { path: '/story/create', component: StoryScreen },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
