import {generatesToDoItem, clearForm} from './mainForm.js';
import {showContent} from './showContent.js';
import {dynamicDescription} from './dynamicDOM.js';

const form = document.querySelector("#submitForm");
const formNote = document.querySelector("#noteForm");

function listeners() {
  document.getElementById('submitForm').addEventListener("submit", formAction);
  document.getElementsByTagName("li")[4].addEventListener("click", showMainForm);
  document.getElementsByTagName("li")[5].addEventListener("click", showNoteForm);
  document.getElementById('LibContainer').addEventListener("click", listActions);
}

function formAction(e) {
  e.preventDefault();
  generatesToDoItem();
  showContent();
  generatesToDoItem().assignFlag();
  clearForm();
}

function showMainForm() {
  form.style.display = "grid";
  formNote.style.display = "none";
}
  
function showNoteForm() {
  form.style.display = "none";
  formNote.style.display = "flex";
}

function listActions(e) {
  // console.log(e.target);
  if (e.target.classList.contains('unchecked')) e.target.classList.toggle("checked");
  if (e.target.classList.contains('trashBinSvg')) {
    let grandParent = e.target.parentElement.parentElement;
    grandParent.remove();
  }
  if (e.target.classList.contains('details')) dynamicDescription(e);
}


export {listeners}