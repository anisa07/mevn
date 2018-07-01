// import Vue from 'vue';
import AxiosClient from './httpClient';

const config = {
	headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET',
		'Access-Control-Allow-Headers': 'X-Requested-With'}
};

export default {
	// get home
	// get about
	// get experience
	getPersonalExperienceAsync () {
		return AxiosClient.get('/pages/experience-personal').then(results =>
			results.data)
			.catch((e) => {
				console.error('GetPersonalExperienceError', e);
			});
	},
	getCompanyExperienceAsync () {
		return AxiosClient.get('/pages/experience-company').then(results =>
			results.data)
			.catch((e) => {
				console.error('GetCompanyExperienceError', e);
			});
	},
	getSkillsAsync () {
		return AxiosClient.get('/pages/skills').then(results =>
			results.data)
			.catch((e) => {
				console.error('GetSkillsError', e);
			});
	},
	getAboutMeAsync () {
		return AxiosClient.get('/pages/about-me', config).then(results =>
			results.data)
			.catch((e) => {
				console.error('GetSkillsError', e);
			});
	},
	getProjectsAsync () {
		return AxiosClient.get('/pages/projects').then(results =>
			results.data)
			.catch((e) => {
				console.error('GetProjectsError', e);
			});
	},
	getAwardsAsync () {
		return AxiosClient.get('/pages/awards').then(results =>
			results.data)
			.catch((e) => {
				console.error('GetAwardsError', e);
			});
	},
};

// import router from '../router/index';
// import convertSteps from '../utils/convert';
//
// export default {
//   loginAsync({ commit }, entity) {
//     const query = router.history.current.query;
//     AxiosClient.post('/login', entity)
//       .then((resp) => {
//         if (resp.data.token) {
//           console.log(resp.data);
//           commit('setToken', { token: resp.data.token });
//           Vue.ls.set('token', resp.data.token);
//           Vue.ls.set('isAuth', 'true');
//           AxiosClient.defaults.headers.authorization = resp.data.token;
//         }
//         if (query && query.redirect) {
//           router.push(
//             {
//               path: query.redirect,
//             });
//         }
//       })
//       .catch(() => { });
//   },
//   //* *************PROJECTS*******************/
//   getProjectsAsync({ commit }) {
//     return new Promise((resolve) => {
//       AxiosClient.get('/projects')
//         .then((response) => {
//           commit('setProjects', { data: response.data });
//           resolve();
//         })
//         .catch(() => {
//         });
//     });
//   },
//   getProjectByIdAsync({ commit }, projectId) {
//     return new Promise((resolve) => {
//       AxiosClient.get(`/projects/${projectId}`)
//         .then((response) => {
//           this.entity = response.data;
//           commit('setActiveProject', { data: response.data });
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   //* ************SUITS***********************/
//   getSuitsAsync({ commit, state }, { projectId }) {
//     if (router.history.current.name === 'Login') return;
//     AxiosClient.get(`/projects/${projectId}/suits/`)
//       .then((response) => {
//         commit('setSuits', { data: response.data });
//       })
//       .then(() => {
//         commit('changeLoadingStatus', { isLoad: true });
//       })
//       .catch(() => { });
//   },
//   addSuitAsync({ commit }, { projectId, data }) {
//     return new Promise((resolve) => {
//       AxiosClient.post(`/projects/${projectId}/suits/`, data)
//         .then((response) => {
//           const sendData = data;
//           sendData.id = response.data.id;
//           commit('addSuit', sendData);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   deleteSuitAsync({ commit }, { suitId, projectId }) {
//     return new Promise((resolve) => {
//       AxiosClient.delete(`/projects/${projectId}/suits/${suitId}`)
//         .then(() => {
//           commit('removeSuit', { suitId });
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   editSuitAsync({ commit }, { projectId, suitId, updateData }) {
//     return new Promise((resolve) => {
//       AxiosClient.put(`/projects/${projectId}/suits/${suitId}`, updateData)
//         .then(() => {
//           commit('updateSuit', updateData);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   //* *************HISTORY******************** */
//   getCaseHistoryAsync({ state, commit }, { projectId, suitId, caseId }) {
//     return new Promise((resolve) => {
//       AxiosClient.get(`/projects/${projectId}/suits/${suitId}/cases/${caseId}/versions`, { headers: { authorization: state.auth.token } })
//         .then(resp => resp.data.map(item => convertSteps(item)))
//         .then((data) => {
//           commit('setHistory', data);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   //* *************CASES******************** */
//   addCaseAsync({ commit }, { projectId, suitId, data }) {
//     const sendData = Object.assign({}, data);
//     sendData.creationDate = Date.now();
//     sendData.updateDate = Date.now();
//     return new Promise((resolve) => {
//       AxiosClient.post(`/projects/${projectId}/suits/${suitId}/cases/`, data)
//         .then((response) => {
//           sendData.id = response.data.id;
//           commit('addCase', { suitId, data: sendData });
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   updateCaseAsync({ commit }, { projectId, suitId, caseId, updateData }) {
//     const sendData = Object.assign({}, updateData);
//     sendData.action = 'UPDATE';
//     return new Promise((resolve) => {
//       AxiosClient.put(`/projects/${projectId}/suits/${suitId}/cases/${caseId}`, sendData)
//         .then(() => {
//           commit('updateCase', { suitId, caseId, updateData: sendData });
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   deleteCaseAsync({ commit }, { projectId, suitId, caseId }) {
//     return new Promise((resolve) => {
//       AxiosClient.delete(`/projects/${projectId}/suits/${suitId}/cases/${caseId}`)
//         .then(() => {
//           commit('removeCase', { suitId, caseId });
//           commit('setHistory', []);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   //* *************SUGGESTIONS******************** */
//   getSuggestionsAsync({ state, commit }) {
//     return new Promise((resolve) => {
//       AxiosClient.get('/stepSuggestions', { headers: { authorization: state.auth.token } })
//         .then((response) => {
//           const first = response.data.length - 7;
//           const last = response.data.length;
//           const res = response.data.slice(first, last);
//           commit('setSuggestions', res);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   getSuggestionsByStepTypeAsync({ state, commit }, type) {
//     return AxiosClient.get(`/stepSuggestions/${type}`, { headers: { authorization: state.auth.token } })
//       .then((response) => {
//         const first = response.data.length >= 7 ? response.data.length - 7 : 0;
//         const last = response.data.length;
//         const res = response.data.slice(first, last);
//         commit('setSuggestions', res);
//       }).catch(() => { });
//   },
//   addSuggestionAsync({ state, commit }, data) {
//     return new Promise((resolve) => {
//       AxiosClient.post('/stepSuggestions', data)
//         .then((response) => {
//           const sendData = Object.assign({}, data);
//           sendData.id = response.data;
//           commit('addSuggestion', sendData);
//           resolve();
//         })
//         .catch(() => { });
//     });
//   },
//   deleteSuggestionAsync({ state, commit }, suggestionId) {
//     AxiosClient.delete(`/stepSuggestions/${suggestionId}`, suggestionId)
//       .then(() => {
//         commit('deleteSuggestion', suggestionId);
//       })
//       .catch(() => { });
//   },
//   updateSuggestionAsync({ commit }, data) {
//     AxiosClient.put(`/stepSuggestions/${data.id}`, data)
//       .then(() => {
//         commit('updateSuggestion', data);
//       })
//       .catch(() => { });
//   },
//   //* *************REGISTRATION******************** */
//   registerAsync(state, entity) {
//     return AxiosClient.post('/registration', entity);
//   },
//   //* *************PASSWORD_FORGOT******************** */
//   passwordForgotAsync(state, entity) {
//     return AxiosClient.post('/passwordForgot', entity);
//   },
// };
