import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';

test('simple rendering test', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/3 SECOND CHALLENGE/i);
});
