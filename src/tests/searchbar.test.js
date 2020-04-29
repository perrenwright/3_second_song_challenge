import React from "react";
import SearchBar from "../components/searchbar.js"
import {GAME_STATE} from '../gamestate_enum.js';
import { render, fireEvent, act, getByTestId, cleanup } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from '@testing-library/user-event'


afterEach(cleanup)

test('Search bar accepts input', () => {

  let wrappersetSearchValue = jest.fn();

  const { getByRole } = render(<SearchBar searchValueSetter={wrappersetSearchValue} gameState={null}/>);

    act(async() => {
      await userEvent.type(getByRole('form1'), 'Ha')
    });
    expect(getByRole('form1')).toHaveAttribute('value', 'Ha')
});

test('Search bar initializes search value', async () => {

  let wrappersetSearchValue = jest.fn();

  const { getByRole } = render(<SearchBar searchValueSetter={wrappersetSearchValue} gameState={null}/>);

    await userEvent.type(getByRole('form1'), 'a')
    expect(wrappersetSearchValue).toHaveBeenCalledWith('a')
});

test('Search bar updates search value', async () => {

  let wrappersetSearchValue = jest.fn();

  const { getByRole } = render(<SearchBar searchValueSetter={wrappersetSearchValue} gameState={null}/>);


   await userEvent.type(getByRole('form1'), 'ja')

    expect(wrappersetSearchValue).toHaveBeenCalledWith('ja')
});