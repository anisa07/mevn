/* eslint-disable no-unused-vars,semi */
export default {
	dispatchAndCommit(store, dispatchMethod, commitMethod) {
		store.dispatch(dispatchMethod).then((data) => {
			store.commit(commitMethod, data);
		});
	},
};
