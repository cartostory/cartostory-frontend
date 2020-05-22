import Vue from 'vue';
import Router from 'vue-router';

import { UPDATE_EDITABLE, UPDATE_LOADING, UPDATE_STORY_NAME, UPDATE_STORY_TEXT, UPDATE_TRACK } from '@/store/mutations';
import authGuard from '@/auth/authGuard';
import store from '@/store/newStore';
import Login from '@/views/Login.vue';
import LoginCallback from '@/views/LoginCallback.vue';
import Landing from '@/views/Landing.vue';
import StoryList from '@/views/StoryList.vue';
import StoryScreen from '@/views/StoryScreen.vue';
import LoadStoryForm from './views/LoadStoryForm.vue';

Vue.use(Router);

let editorKey = 0; // force editor rerendering

export const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/login-callback',
    component: LoginCallback,
  },
  {
    path: '/stories',
    component: StoryList,
    beforeEnter: authGuard,
  },
  {
    path: '/story/read/:id',
    component: StoryScreen,
    props: {
      editorKey: editorKey += 1,
    },
    beforeEnter(to, from, next) {
      authGuard(to, from, next);
      store.commit(UPDATE_EDITABLE, false);
    },
  },
  {
    path: '/story/load',
    component: LoadStoryForm,
  },
  {
    path: '/story/create',
    component: StoryScreen,
    props: {
      editorKey: editorKey += 1,
    },
    beforeEnter(to, from, next) {
      authGuard(to, from, next);
      store.commit(UPDATE_EDITABLE, true);
      store.commit(UPDATE_STORY_NAME, undefined);
      store.commit(UPDATE_STORY_TEXT, undefined);
      store.commit(UPDATE_TRACK, undefined);
    },
  },
];

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit(UPDATE_LOADING, true);
  next();
});

router.afterEach(() => {
  store.commit(UPDATE_LOADING, false);
});

export default router;
