import React from "react";
// import { create } from "react-test-renderer";
import Challenge_length from "../components/challenge_length.js"
import {GAME_STATE} from '../gamestate_enum.js';
import { render, fireEvent, act, getByTestId, cleanup } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

afterEach(cleanup)

test('Challenge_length button sets length', () => {

  let setChallenge_length = jest.fn();

  const { getByTestId } = render(<Challenge_length challenge_length={5} setChallenge_length={setChallenge_length} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });

    expect(setChallenge_length).toHaveBeenCalledWith(5);
});

test('Challenge_length button displays options', () => {

  let setChallenge_length = jest.fn();

  const { getByText, getByTestId } = render(<Challenge_length challenge_length={5} setChallenge_length={setChallenge_length} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("5 Questions");
    expect(linkElement).toBeInTheDocument();
});

test('Challenge_length button displays options', () => {

  let setChallenge_length = jest.fn();

  const { getByText, getByTestId } = render(<Challenge_length challenge_length={5} setChallenge_length={setChallenge_length} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("10 Questions");
    expect(linkElement).toBeInTheDocument();
});

test('Challenge_length button displays options', () => {

  let setChallenge_length = jest.fn();

  const { getByText, getByTestId } = render(<Challenge_length challenge_length={5} setChallenge_length={setChallenge_length} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("15 Questions");
    expect(linkElement).toBeInTheDocument();
});