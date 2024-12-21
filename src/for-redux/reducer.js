import { STATUS, PLAYER } from '../constants';
import { createEmptyField } from '../utils';

const initialState = {
	status: STATUS.TURN,
	currentPlayer: PLAYER.CROSS,
	field: createEmptyField(),
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_STATUS':
			return { ...state, status: action.payload };
		case 'SET_CURRENT_PLAYER':
			return { ...state, currentPlayer: action.payload };
		case 'SET_FIELD':
			return { ...state, field: action.payload };
		case 'RESET_GAME':
			return initialState;
		default:
			return state;
	}
};
