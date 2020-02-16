import React from 'react';
import './App.css';
import Dice from './dice';
import Board from './board';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      die1Value: this.generateRandomNumber(),
      die2Value: this.generateRandomNumber(),
      rollState: false,
      usedNumbers: [],
      scoreHistory: [],
      selectedNumbers: [],
      showHelp: false,
      showConfiguration: false,
      showScoreHistory: true,
    };

    this.onSelect = this.onSelect.bind(this);
    this.reRoll = this.reRoll.bind(this);
    this.dropDownClick = this.dropDownClick.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.showConfiguration = this.showConfiguration.bind(this);
    this.setShowScores = this.setShowScores.bind(this);
    
    this.combinationSum(this.getUnusedNumbers(), (this.state.die1Value + this.state.die2Value) - this.getSelectedSum(this.state.selectedNumbers));
  }

  onSelect(value) {
    let selectedNumbers = [...this.state.selectedNumbers];
    
    let index = selectedNumbers.findIndex(v => v === value);

    if (index === -1) {
      selectedNumbers.push(value);
      this.setState({
	selectedNumbers: selectedNumbers,
      });
    } else {
      selectedNumbers.splice(index, 1);
      this.setState({
	selectedNumbers: selectedNumbers,
      });
    }
  }
  
  reRoll() {
    const die1 = this.generateRandomNumber();
    const die2 = this.generateRandomNumber();
    
    if (this.gameOver) {
      this.gameOver = false;
      this.setState((prevState) => ({
	die1Value: die1,
	die2Value: die2,
	rollState: false,
	usedNumbers: [],
	selectedNumbers: [],
	scoreHistory: prevState.scoreHistory.concat([this.getSelectedSum(this.getUnusedNumbers())]),
      }));
    } else {
      this.setState((prevState) => ({
	die1Value: die1,
	die2Value: die2,
	rollState: false,
	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
	selectedNumbers: [],
      }));
    }
  }

  getUnusedNumbers() {
    var ret = [];
    var i;

    for(i = 1; i <= 12; i++) {
      if (!this.state.usedNumbers.includes(i) && !this.state.selectedNumbers.includes(i)) {
	ret.push(i);
      }
    }
    return ret;
  }

  getSelectedSum(nums) {
    let sum = 0;

    nums.forEach(v => sum = sum + v);

    return sum;
  }

  removeUsedNumbers() {
    this.result.forEach((arr) => {
      this.state.selectedNumbers.forEach((v) => {
	if (arr.includes(v)) {
	  arr.splice();
	}
      });
    });
  }

  combinationSum(num, target) {
    this.result = [];
    if(num === null || num.length === 0)
      return this.result;

    num.sort();

    var temp = [];
    this.getCombination(num, 0, target, temp);

    this.removeUsedNumbers();
  }

  getCombination(num, start, target, temp){
    if(target === 0){
      var t = JSON.parse(JSON.stringify(temp));
      if(this.indexOf(this.result, t, this.arraysIdentical) === -1) {
	this.result.push(t);
      }
      return;
    }

    for(var i=start; i<num.length; i++){
      if(target < num[i])
	continue;

      temp.push(num[i]);
      this.getCombination(num, i+1, target-num[i], temp, this.result);
      temp.pop();
    }
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

  indexOf(arr, val, comparer) {
    for (var i = 0, len = arr.length; i < len; ++i) {
      if ( i in arr && comparer(arr[i], val) ) {
	return i;
      }
    }
    return -1;
  }

  getButtonText() {
    if (this.gameOver) {
      return "New Game";
    } else {
      return "Roll";
    }
  }

  canRoll() {
    const { die1Value, die2Value, selectedNumbers } = this.state;
    
    if (this.getSelectedSum(selectedNumbers) === die1Value + die2Value || this.gameOver) {
      return true;
    }

    return false;
  }

  renderRules() {
    if (this.state.showHelp) {
      return("When the game starts, 2 dice are rolled.  You must select numbers from the board that add up to the total of the 2 dice.  Numbers outlined in red are not selectable.  Numbers in smaller black squares have already been used and are no longer selectable.  Numbers outlined in green are available.  Numbers outlined in blue are numbers you have already selected this round.  If you have selected a number and decide you do not want to use that number this round, click on it again to un-select it.  Once you have selected enough numbers to add up to the dice roll, the Roll button will appear, and you can roll the dice again, repeating the process.  If you are unable to select numbers to add up to the dice roll, your game is over and you score is the total of the unused numbers you have left.  If you are able to use all the nubers on the board, you have 'Shut the Box' - congratulations!");
    } else {
      return null;
    }
  }

  dropDownClick() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  showHelp() {
    this.setState((prevState) => ({
      showHelp: !prevState.showHelp
    }));
    this.dropDownClick();
  }

  getHelpText() {
    if (this.state.showHelp) {
      return "Hide Help";
    } else {
      return "Show Help";
    }
  }

  showConfiguration() {
    this.setState((prevState) => ({
      showConfiguration: !prevState.showConfiguration,
    }));
    this.dropDownClick();
  }
  
  getConfigurationText() {
    if (this.state.showConfiguration) {
      return "Hide Configuration";
    } else {
      return "Show Configuration";
    }
  }
  
  renderMenu() {
    return (
	<div className="dropdown">
    	  <button onClick={this.dropDownClick} className="dropbtn">Menu</button>
	  <div id="myDropdown" className="dropdown-content">
	    <span onClick={this.showHelp}>{this.getHelpText()}</span>
	    <span onClick={this.showConfiguration}>{this.getConfigurationText()}</span>
	  </div>
	</div>
    );
  }

  setShowScores(event) {
    this.setState({ showScoreHistory: event.target.checked });
  }
  
  renderConfig() {
    const showScores = this.state.showScoreHistory ? '1' : '0';
    const checked = this.state.showScoreHistory ? 'yes' : 'no';

    return(
	<div>
	  <h3>Configuration</h3>
      	  <input name='showScores' defaultChecked={checked} type='checkbox' onClick={this.setShowScores} value={showScores} />
  	  <label htmlFor='showScores'>Show score history</label>
	</div>
    )
  }

  renderScoreHistory() {
    return(
      <div>
	<h3>Previous Scores:</h3>
	{this.state.scoreHistory.map((x, i) => {
	  return(
	      <div key={i}>{x}<br/></div>
	  )})}
      </div>
    );
  }
  
  render() {
    this.combinationSum(this.getUnusedNumbers(), (this.state.die1Value + this.state.die2Value) - this.getSelectedSum(this.state.selectedNumbers));

    if (this.result.flat().length === 0 && this.state.selectedNumbers.length === 0)
      this.gameOver = true;
    
    return(
	<div className="App">
  	  <div className="App-menu">
  	    {this.renderMenu()}
          </div>
          <div className="App-content">
    	    <Board
              currentRoll={this.state.die1Value + this.state.die2Value}
              usedNumbers={this.state.usedNumbers}
              availableNumbers={this.result.flat()}
              selectedNumbers={this.state.selectedNumbers}
              onSelect={this.onSelect}
            />
	    {this.state.showScoreHistory &&
	     <div data-testid="App-scores" className="App-scores">
  	       {this.renderScoreHistory()}
             </div>
	    }
	  </div>
	  <div data-testid="App-header" className="App-header">
  	    <Dice
              die1Value={this.state.die1Value}
              die2Value={this.state.die2Value}
            />
	    <button
              className="reroll_button"
              data-testid="reroll_button"
              onClick={this.reRoll}
              disabled={!this.canRoll()}
	    >
  	      { this.getButtonText() }
            </button>
	  </div>
  	  <div data-testid="App-rules" className="App-rules">
  	    {this.renderRules()}
	  </div>
  	  {this.state.showConfiguration && (
	    <div data-testid="App-config" className="App-config">
	      {this.renderConfig()}
            </div>
	  )}
	</div>
    );
  }

  generateRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }
}
