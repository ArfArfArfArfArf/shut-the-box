import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

// get rid of the popup menu when the use clicks outside the menu
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let menu = document.getElementById("myDropdown");

    if (menu.classList.contains('show')) {
	menu.classList.toggle("show");
    }
  }
}
  
