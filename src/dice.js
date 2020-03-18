import React from 'react';
import { number, arrayOf } from 'prop-types';
import './dice.css';

export default class Dice extends React.Component {
  static propTypes = {
    dieValues: arrayOf(number).isRequired,
  };

  renderDice() {
    const { dieValues } = this.props;
    
    return(
	<div>
	  {dieValues.map((name, index) => {
	    return(
		<span key={`dice${index}`} data-testid={`dice${index}`} className={`dice dice-${name}`} />
	    );
	  })}
      </div>
    );
  }
  
  render() {
    return(
	<div data-testid="dice">
	  <div data-testid="dice_header">
	    Dice Roll
  	  </div>
	  {this.renderDice()}
	</div>
    );
  }
};
