/* eslint-disable import/prefer-default-export */
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './integration/actions';
import getters from './integration/getters';
import mutations from './integration/mutations';

Vue.use(Vuex);

// Предположим, что у нас есть универсальный API,
// который возвращает Promises и опустим детали реализации
// import { fetchItem } from './api'

export function createStore() {
	return new Vuex.Store({
		state: {
			aboutMe: [],
			experience: {
				experiencePersonal: [],
				experienceCompany: [],
				skills: [],
			},
			contacts: [],
			projects: [],
			awards: [],
		},
		actions,
		getters,
		mutations,
		// actions: {
		// 	// fetchItem ({ commit }, id) {
		// 	// 	// возвращаем Promise через `store.dispatch()`
		// 	// 	// чтобы мы могли понять когда данные будут загружены
		// 	// 	return fetchItem(id).then(item => {
		// 	// 		commit('setItem', { id, item })
		// 	// 	})
		// 	// }
		// },
		// mutations: {
		// 	setItem(state, { id, item }) {
		// 		Vue.set(state.items, id, item);
		// 	},
		// },
	});
}
