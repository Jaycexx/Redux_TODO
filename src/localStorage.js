export const loadState = () => {
	try {
		let initialState =  localStorage.getItem('state');
		if(initialState === null) {
			return undefined;
		}
		return JSON.parse(initialState);
	} catch(err) {
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		localStorage.setItem('state', JSON.stringify(state));
	} catch(err) {

	}
}