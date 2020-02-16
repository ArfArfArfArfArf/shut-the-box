import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import NumberCard from '../numbercard';

var defaultProps = {
  value: 5,
  enabled: true,
  chosen: false,
  used: false,
  onSelect: jest.fn,
};

var disabledProps = {
  value: 10,
  enabled: false,
  used: false,
  chosen: false,
  onSelect: jest.fn,
};

var chosenProps = {
  value: 10,
  enabled: true,
  used: false,
  chosen: true,
  onSelect: jest.fn,
};

test('renders NumberCard div', () => {
  const { getByTestId } = render(<NumberCard {...defaultProps} />);
  const divElement = getByTestId("numbercard5");
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass('numbercard');
  expect(divElement).not.toHaveClass('unusable');
  expect(divElement).not.toHaveClass('chosen');
});

test('renders NumberCard div when disabled', () => {
  const { getByTestId } = render(<NumberCard {...disabledProps} />);
  const divElement = getByTestId("numbercard10");
  expect(divElement).toHaveClass('numbercard');
  expect(divElement).toHaveClass('unusable');
  expect(divElement).not.toHaveClass('chosen');
});

test('renders NumberCard div when chosen', () => {
  const { getByTestId } = render(<NumberCard {...chosenProps} />);
  const divElement = getByTestId("numbercard10");
  expect(divElement).toHaveClass('numbercard');
  expect(divElement).not.toHaveClass('unusable');
  expect(divElement).toHaveClass('chosen');
});

test('calls the onSelect props func when enabled and clicked', () => {
  const mockCB = jest.fn();
  
  const value = 3;
  
  var custProps = {
    value: value,
    enabled: true,
    used: false,
    chosen: false,
    onSelect: mockCB,
  };
  
  const spy = jest.spyOn(NumberCard.prototype, 'onSelect');

  const { getByTestId } = render(<NumberCard {...custProps} />);
  const divElement = getByTestId("numbercard3");
  fireEvent.click(divElement);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();

  expect(mockCB.mock.calls.length).toBe(1);
  expect(mockCB.mock.calls[0][0]).toBe(value);
});

test('does not call the onSelect props func when disbled and clicked', () => {
  const mockCB = jest.fn();
  
  var custProps = {
    value: 3,
    enabled: false,
    used: false,
    chosen: false,
    onSelect: mockCB,
  };

  const spy = jest.spyOn(NumberCard.prototype, 'onSelect');
  const { getByTestId } = render(<NumberCard {...custProps} />);
  const divElement = getByTestId("numbercard3");
  fireEvent.click(divElement);
  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();

  expect(mockCB.mock.calls.length).toBe(0);
});
