import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders div for dice', () => {
  const { getByTestId } = render(<App />);
  const divElement = getByTestId("dice");
  expect(divElement).toBeInTheDocument();
});

test('renders 2 dice', () => {
  const { getByTestId } = render(<App />);
  const dice1 = getByTestId("dice0");
  expect(dice1).toBeInTheDocument();
  const dice2 = getByTestId("dice1");
  expect(dice2).toBeInTheDocument();
});


