/* eslint-disable import/prefer-default-export */
// router.js
import Vue from 'vue';
import Router from 'vue-router';
import home from './components/home/Home.vue';
import blog from './components/blog/Blog.vue';
import events from './components/events/Events.vue';
import lessons from './components/lessons/Lessons.vue';

Vue.use(Router);

export function createRouter() {
	return new Router({
		mode: 'history',
		routes: [
			{ path: '/', component: home },
			{ path: '/blog', component: blog },
			{ path: '/events', component: events },
			{ path: '/lessons', component: lessons },
		],
	});
}
