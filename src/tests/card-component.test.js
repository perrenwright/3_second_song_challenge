// npm install fsevents@1.2.11
// https://github.com/kkatzen/firebase-codelab/blob/master/src/App.test.js

import React from 'react';
import {GAME_STATE} from '../gamestate_enum.js';
import { render, fireEvent, act, getByTestId } from '@testing-library/react';
import CardComponent from '../components/card-component.js';
import {BrowserRouter as Router} from 'react-router-dom';

test('CardComponent prints challenge name', () => {
 	let gameStateSetter = jest.fn();

	const { getByText } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE} P_gameStateSetter={gameStateSetter} searchValue=""/>);

	const linkElement = getByText("name");
	expect(linkElement).toBeInTheDocument();
});

test('CardComponent prints creator name', () => {
 	let gameStateSetter = jest.fn();

	const { getByText } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE} P_gameStateSetter={gameStateSetter} searchValue=""/>);

	const linkElement = getByText("Created by creatorName");
	expect(linkElement).toBeInTheDocument();
});

test('CardComponent prints image', () => {
 	let gameStateSetter = jest.fn();

	const { getByAltText } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE} P_gameStateSetter={gameStateSetter} searchValue=""/>);

	const linkElement = getByAltText("name");
	expect(linkElement).toBeInTheDocument();
});

test('CardComponent updates challengeID on click', () => {

 	let gameStateSetter = jest.fn();

	const { getByTestId } = render(<CardComponent key="key" name="name" image="image" creator="creatorName" challengeID="challengeID" P_gameState={GAME_STATE.BEFORE}  P_gameStateSetter={gameStateSetter} searchValue=""/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });

    expect(gameStateSetter).toHaveBeenCalledWith("challengeID");
});

