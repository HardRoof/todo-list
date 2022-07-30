import './modules/style.css';
import {modalBox} from './modules/modal.js';
import {listeners} from './modules/listeners.js';


modalBox();
listeners();


if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}


