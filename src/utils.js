/* eslint-disable import/prefer-default-export,prefer-template */
export const mixins = {
	methods: {
		getImgUrl(icon) {
			const images = require.context('../../images/', false, /\.png$/);
			return images('./' + icon + '.png');
		},
	},
};
