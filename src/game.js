import { useEffect, useState } from 'react';
import { GameLayout } from './game-layout';
import { handleCellClick, handleRestart } from './handlers';
import store from './store';

export const Game = () => {
	const [, setForceUpdate] = useState();
	const { status, currentPlayer, field } = store.getState();

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setForceUpdate({});
		});
		return () => unsubscribe();
	}, []);

	const state = {
		status,
		currentPlayer,
		field,
		dispatch: store.dispath,
	};

	return (
		<GameLayout
			status={status}
			currentPlayer={currentPlayer}
			field={field}
			handleCellClick={(cellIndex) => handleCellClick(state, cellIndex)}
			handleRestart={() => handleRestart(state)}
		/>
	);
};
