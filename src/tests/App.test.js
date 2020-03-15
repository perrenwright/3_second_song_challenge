import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('simple rendering test', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/3 SECOND CHALLENGE/i);

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});