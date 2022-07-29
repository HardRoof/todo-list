import './modules/style.css';
import {modalBox} from './modules/modal.js';
import createNotes from './modules/switchForm.js';
import {listeners} from './modules/listeners.js';



modalBox();
createNotes();
listeners();




if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}


