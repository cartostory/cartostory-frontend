import Vue from 'vue';
import Router from 'vue-router';

import { UPDATE_EDITABLE, UPDATE_LOADING } from '@/store/mutations';
import store from '@/store/newStore';
import Landing from '@/views/Landing.vue';
import StoryScreen from '@/views/StoryScreen.vue';
import LoadStoryForm from './views/LoadStoryForm.vue';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/story/read/:title',
    component: StoryScreen,
    beforeEnter(to, from, next) {
      store.commit(UPDATE_EDITABLE, false);
      if (store.state.storyUrl) {
        next();
      } else {
        next('/story/load');
      }
    },
  },
  {
    path: '/story/load',
    component: LoadStoryForm,
  },
  {
    path: '/story/create',
    component: StoryScreen,
    beforeEnter(to, from, next) {
      store.commit(UPDATE_EDITABLE, true);
      next();
    },
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) =>  {
  store.commit(UPDATE_LOADING, true);
  next();
});

router.afterEach(() =>  {
  store.commit(UPDATE_LOADING, false);
});

export default router;
