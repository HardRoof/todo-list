import {generatesToDoItem, clearForm, toDoItem} from './mainForm.js';
import {showContent, showCheck} from './showContent.js';


function listeners() {
  document.getElementById('submitForm').addEventListener("submit", formAction);
  document.getElementById('LibContainer').addEventListener("click", showCheck);
}

function formAction(e) {
  e.preventDefault();
  generatesToDoItem();
  showContent();
  
  clearForm(generatesToDoItem())
}


// function listeners() {
//   document.getElementById('submitForm').addEventListener("submit", generatesToDoItem)
//   document.getElementById('submitForm').addEventListener("submit", showContent)
// }

export {listeners}