import React from "react";
import Song_timer from "../components/song_timer.js"
import {GAME_STATE} from '../gamestate_enum.js';
import { render, fireEvent, act, getByTestId, cleanup } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

afterEach(cleanup)

test('Song_timer button sets length', () => {

  let setgameTime = jest.fn();

  const { getByTestId } = render(<Song_timer gameTime={3000} setgameTime={setgameTime} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });

    expect(setgameTime).toHaveBeenCalledWith(3000);
});

test('Song_timer button displays options', () => {

  let setgameTime = jest.fn();

  const { getByText, getByTestId } = render(<Song_timer gameTime={3000} setgameTime={setgameTime} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("3 Seconds");
    expect(linkElement).toBeInTheDocument();
});

test('Song_timer button displays options', () => {

  let setgameTime = jest.fn();

  const { getByText, getByTestId } = render(<Song_timer gameTime={3000} setgameTime={setgameTime} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("5 Seconds");
    expect(linkElement).toBeInTheDocument();
});

test('Song_timer button displays options', () => {

  let setgameTime = jest.fn();

  const { getByText, getByTestId } = render(<Song_timer gameTime={3000} setgameTime={setgameTime} gameState={null}/>);

    act(() => {
      fireEvent.click(getByTestId("button1"));
    });
    const linkElement = getByText("10 Seconds");
    expect(linkElement).toBeInTheDocument();
});