/* eslint-disable import/prefer-default-export,import/no-extraneous-dependencies */
import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.min.css';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import VueMq from 'vue-mq';
import VueClipboard from 'vue-clipboard2';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

if (process.browser) {
	Vue.use(VueClipboard);
	Vue.use(VueMq, {
		breakpoints: {
			mobile: 450,
			tablet: 900,
			laptop: 1250,
			desktop: Infinity,
		},
	});
	Vue.use(Vuetify, {
		theme: {
			primary: colors.deepPurple.base, // #673AB7
			secondary: colors.indigo.lighten4, // #3F51B5
		},
	});

	//console.log('browser');
} else {
	//console.log('server');
}

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
export function createApp() {
	const router = createRouter();
	const store = createStore();

	sync(store, router);
	const app = new Vue({
		router,
		store,
		// корневой экземпляр просто рендерит компонент App
		render: h => h(App),
	});
	return { app, router, store };
}
