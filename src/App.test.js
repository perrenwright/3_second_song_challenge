import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
test('renders learn react link', () => {
  const { getByText } = render(<Router><App /></Router>);
  const linkElement = getByText(/3 Second Song Challenge/i);
  expect(linkElement).toBeInTheDocument();
});
