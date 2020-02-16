import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Board from '../board';

var defaultProps = {
  currentRoll: 10,
  usedNumbers: [1,3,5],
  availableNumbers: [2,4,6,8,10],
  selectedNumbers: [],
  onSelect: jest.fn,
};

test('renders Board div', () => {
  const { getByTestId } = render(<Board {...defaultProps} />);
  const divElement = getByTestId("board");
  expect(divElement).toBeInTheDocument();
});

test('enables proper numbers for given roll', () => {
  const { getByTestId } = render(<Board {...defaultProps} />);

  const number1 = getByTestId("numbercard1");
  expect(number1).toHaveClass('unusable');
  const number2 = getByTestId("numbercard2");
  expect(number2).not.toHaveClass('unusable');
  const number3 = getByTestId("numbercard3");
  expect(number3).toHaveClass('unusable');
  const number4 = getByTestId("numbercard4");
  expect(number4).not.toHaveClass('unusable');
  const number5 = getByTestId("numbercard5");
  expect(number5).toHaveClass('unusable');
  const number6 = getByTestId("numbercard6");
  expect(number6).not.toHaveClass('unusable');
  const number7 = getByTestId("numbercard7");
  expect(number7).toHaveClass('unusable');
  const number8 = getByTestId("numbercard8");
  expect(number8).not.toHaveClass('unusable');
  const number9 = getByTestId("numbercard9");
  expect(number9).toHaveClass('unusable');
  const number10 = getByTestId("numbercard10");
  expect(number10).not.toHaveClass('unusable');
  const number11 = getByTestId("numbercard11");
  expect(number11).toHaveClass('unusable');
  const number12 = getByTestId("numbercard12");
  expect(number12).toHaveClass('unusable');
});

test('updates parent with selected numbers when complete', () => {
  const fn = jest.fn();
  
  var props = {
    currentRoll: 10,
    usedNumbers: [1,3,5],
    availableNumbers: [2,4,6,8,10],
    selectedNumbers: [],
    onSelect: fn,
  };

  const { getByTestId } = render(<Board {...props} />);

  const number10 = getByTestId('numbercard10');
  fireEvent.click(number10);

  expect(fn).toHaveBeenCalledWith(10);
  fireEvent.click(number10);
  expect(fn).toHaveBeenCalledWith(10);
});
