/* eslint-disable prefer-template */
import axios from 'axios';
import Vue from 'vue';
// import VueLocalStorage from 'vue-ls';
import Vuex from 'vuex';

Vue.use(Vuex);
// Vue.use(VueLocalStorage);

const axiosClient = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.DATA_PATH,
});

export default axiosClient;
