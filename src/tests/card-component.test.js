// npm install fsevents@1.2.11
// https://github.com/kkatzen/firebase-codelab/blob/master/src/App.test.js

import React from 'react';
import {GAME_STATE} from '../gamestate_enum.js';
import { render, fireEvent, act } from '@testing-library/react';
import CardComponent from '../components/card-component.js';
import {BrowserRouter as Router} from 'react-router-dom';

test('CardComponent prints creator name', () => {
 	let gameStateSetter = jest.fn();

	const { getByText } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE} P_gameStateSetter={gameStateSetter} searchValue=""/>);

	const linkElement = getByText("name");
	expect(linkElement).toBeInTheDocument();
});

test('CardComponent updates game state on click', () => {

 	let gameStateSetter = jest.fn();

	const { getByTestId } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE}  P_gameStateSetter={gameStateSetter} searchValue=""/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });

    expect(gameStateSetter).toHaveBeenCalledWith(GAME_STATE.IN_PROGRESS);
});