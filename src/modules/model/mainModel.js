import {ToDoList} from './toDoList.js';
import {noteList} from './noteList.js';

class Model {
  constructor() {
    this.toDos = [
    // {id: 0, title: "Marathon", description: 'Run', dueDate: "2022-08-04", project: "Input", priority: "Low", completed: false},
    ]
    this.notes = []
  };

  getFormElements() {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const project = document.querySelector("#project");
    const priority = document.querySelector("#priority");
    let completed = false;
    const noteTitle = document.querySelector("#noteTitle");
    const noteDescription = document.querySelector("#noteDescription");
    return {title,description, dueDate, project, priority, completed, noteTitle, noteDescription}
  };

  generatesToDoItem(increment) {
    let toDoItem = new ToDoList(this.getFormElements().title.value, this.getFormElements().description.value, this.getFormElements().dueDate.value, this.getFormElements().project.value, this.getFormElements().priority.value, this.getFormElements().completed);
    toDoItem.id = increment;
    this.toDos.push(toDoItem);
    return toDoItem
  };

  counter = (function(n) {
    return function() {
      n += 1;
      return n;
    }
  }(-1)); 

  addDivID(increment) {
    let lastShell = document.getElementById('LibContainer').lastElementChild;
    lastShell.id = increment;
  };

  toDoStatus(targetID) {
    let position = this.toDos.findIndex(todo => todo.id == targetID);
    this.toDos[position].completed == false ? this.toDos[position].completed = true : this.toDos[position].completed = false;
  };

  removeToDoItem(e) {
    let id = e.target.parentElement.parentElement.id; 
    this.toDos = this.toDos.filter(todo => todo.id != id);
    // let toBeDeleted = this.toDos.findIndex(todo => todo.id == id); // this.toDos.splice(toBeDeleted, 1);
    };

  clearForm() {
    this.getFormElements().title.value = "";
    this.getFormElements().description.value = "";
    this.getFormElements().dueDate.value = "";
    this.getFormElements().project.value = "Input";
    this.getFormElements().priority.value = "Low";
    this.getFormElements().noteTitle.value = "";
    this.getFormElements().noteDescription.value = "";
    document.getElementById("myModal").style.display = "none";
  };

  generatesNote(increment) {
    let noteItem = new noteList(this.getFormElements().noteTitle.value, this.getFormElements().noteDescription.value);
    noteItem.id = increment;
    this.notes.push(noteItem);
    console.log(this.notes);
    return noteItem
  };

  noteCounter = (function(n) {
    return function() {
      n += 1;
      return n;
    }
  }(-1)); 

  addDivNoteID(increment) {
    let stickyNote = document.getElementById('NoteContainer').lastElementChild;
    stickyNote.id = increment;
  };

  removeNoteItem(e) {
    let id = e.target.parentElement.id; 
    this.notes = this.notes.filter(note => note.id != id);
    };
};

export {Model}