import React from 'react';
import { arrayOf, number, func } from 'prop-types';
import NumberCard from './numbercard';
import './board.css';

export default class Board extends React.Component {
  static propTypes = {
    numberOfDice: number.isRequired,
    currentRoll: number.isRequired,
    usedNumbers: arrayOf(number).isRequired,
    availableNumbers: arrayOf(number).isRequired,
    selectedNumbers: arrayOf(number).isRequired,
    onSelect: func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(value) {
    this.props.onSelect(value);
  }

  arraysIdentical(arr1, arr2) {
    var i = arr1.length;
    if (i !== arr2.length) {
      return false;
    }
    while (i--) {
      if (arr1[i] !== arr2[i]) {
	return false;
      }
    }
    return true;
  }


  shouldNumberBeEnabled(value) {
    if (this.props.availableNumbers.includes(value)) {
      return true;
    }

    return false;
  }

  isNumberSelected(value) {
    return this.props.selectedNumbers.includes(value);
  }

  isNumberUsed(value) {
    return this.props.usedNumbers.includes(value);
  }
  
  renderNumbers() {
    let ret = []
    var i;
    for(i = 1; i <= this.props.numberOfDice * 6; i++) {
      ret.push(this.renderNumber(i));
    }

    return ret;
  }
  
  renderNumber(number) {
    const enabled = this.shouldNumberBeEnabled(number) && !this.isNumberUsed(number);

    return (
      <NumberCard
        key={number}
        value={number}
        used={this.props.usedNumbers.includes(number)}
        enabled={enabled}
        chosen={this.isNumberSelected(number)}
        onSelect={this.onSelect}
      />
    );
  }

  getSum(total, num) {
    return total + num;
  }

  getTotalAvailable() {
    const num = this.props.numberOfDice * 6;
    let i, total = 0;
    
    for(i = num; i > 0; i--) {
      total = total + i;
    }

    return total;
  }
  
  renderScore() {
    const usedNums = this.props.usedNumbers.reduce(this.getSum, 0);
    
    return(<h2>Your Score: {this.getTotalAvailable() - usedNums}</h2>);
  }
  
  render() {
    return (
	<div data-testid='board' className='board'>
  	  <div data-testid='numbers' className='board_numbers'>
   	    {this.renderNumbers()}
          </div>
	  <div data-testid='score' className='board_score'>
	    {this.renderScore()}
  	  </div>
	</div>
    );
  }
};
