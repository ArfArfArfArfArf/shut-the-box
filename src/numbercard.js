import React from 'react';
import { bool, func, number } from 'prop-types';
import classNames from 'classnames';
import './numbercard.css';

export default class Number extends React.Component {
  static propTypes = {
    enabled: bool.isRequired,
    chosen: bool.isRequired,
    value: number.isRequired,
    used: bool.isRequired,
    onSelect: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }
  
  onSelect() {
    if (this.props.enabled || this.props.chosen) {
      this.props.onSelect(this.props.value);
    }
  }
  
  render() {
    
    var className = classNames(
      "numbercard",
      {
	"used": this.props.used,
        "unusable": !this.props.enabled,
	"chosen": this.props.chosen,
      }
    );
      
    return(
      <div data-testid={`numbercard${this.props.value}`} className={className} onClick={this.onSelect}>
	{this.props.value}
      </div>
    );
  }
};
