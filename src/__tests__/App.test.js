import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { mount } from 'enzyme';
import App from '../App';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const appHeader = getByTestId("App-header");
  expect(appHeader).toBeInTheDocument();
});

test('onSelect called', () => {
  const spy = jest.spyOn(App.prototype, 'onSelect');
  const { getByTestId } = render(<App />);
  const numbercard = getByTestId("numbercard1");
  fireEvent.click(numbercard)
  expect(spy).toHaveBeenCalledTimes(1);
});

test('disables the proper numbers after selecting a number', () => {
  const wrapper = mount(<App />);
  const state = wrapper.state();

  let roll = state.die1Value + state.die2Value;
  
  const number = wrapper.find({'data-testid': `numbercard${roll}`});
  number.simulate('click');
  const numberAfter = wrapper.find({'data-testid': `numbercard${roll}`});

  expect(numberAfter.hasClass('chosen')).toBe(true);

  let i;

  for (i = 1; i < roll; i++) {
    const unusablenumber = wrapper.find({'data-testid': `numbercard${i}`});
    expect(unusablenumber.hasClass('unusable')).toBe(true);
  }

  number.simulate('click');

  const after = wrapper.find({'data-testid': `numbercard${roll}`});
  
  expect(after.hasClass('chosen')).toBe(false);
});

test('renders score history if option selected', () => {
  const { getByTestId } = render(<App />);
  const scores = getByTestId("App-scores");

  expect(scores).toBeInTheDocument();
});

test('renders scores in the score history section', () => {
  const wrapper = mount(<App />);

  wrapper.setState({scoreHistory: [ 73, 34, 13 ]});
  expect(wrapper.find({'data-testid': 'App-scores'}).text()).toEqual("Previous Scores:733413");
});

test('does not render scores when option disabled', () => {
  const wrapper = mount(<App />);

  wrapper.setState({showScoreHistory: false});
  expect(wrapper.find({'data-testid': 'App-scores'}).exists()).toBe(false);
});
