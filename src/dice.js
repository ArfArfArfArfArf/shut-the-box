import React from 'react';
import { number } from 'prop-types';
import './dice.css';

export default class Dice extends React.Component {
  static propTypes = {
    die1Value: number.isRequired,
    die2Value: number.isRequired,
  };

  render() {
    let die1Class = `dice dice-${this.props.die1Value}`;
    let die2Class = `dice dice-${this.props.die2Value}`;
    return(

	<div data-testid="dice">
	  <div data-testid="dice_header">
	    Dice Roll
  	  </div>
          <span data-testid='dice1' className={die1Class}/>
          <span data-testid='dice2' className={die2Class}/>
	</div>
    );
  }
};
