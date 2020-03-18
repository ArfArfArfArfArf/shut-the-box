import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

// get rid of the popup menu when the use clicks outside the menu
window.onclick = function(event) {
  const { target } = event;
  
  if (!target.matches('.menu-container') && !target.matches('.bar1') && !target.matches('.bar2') && !target.matches('.bar3')) {
    let menu = document.getElementById("myDropdown");
    let container = document.getElementById("menu-container");
    
    if (menu.classList.contains('open')) {
	menu.classList.toggle("open");
    }
    if (container.classList.contains('change')) {
      container.classList.toggle("change");
    }
  }
}
  
