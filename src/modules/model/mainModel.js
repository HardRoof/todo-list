import {ToDoList} from './toDoList.js';
import {noteList} from './noteList.js';
import {projectList} from './projectList.js';
import {format, parseISO} from "date-fns";

class Model {
  constructor() {
    this.toDos = [
    // {id: 0, title: "Marathon", description: 'Run', dueDate: "2022-08-04", project: "Inbox", priority: "Low", completed: false},
    ];
    this.notes = [];
    this.projects = {Inbox: []};
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
    const projectTitle = document.getElementById('projectTitle');
    return {title,description, dueDate, project, priority, completed, noteTitle, noteDescription, projectTitle}
  };

  formatDate() {
    const formattedData = format(parseISO(this.getFormElements().dueDate.value), 'MMM do');  // parse ISO string before formatting it
    return formattedData
  }

  generatesToDoItem(increment) {
    let toDoItem = new ToDoList(this.getFormElements().title.value, this.getFormElements().description.value, this.formatDate(), this.getFormElements().project.value, this.getFormElements().priority.value, this.getFormElements().completed);
    toDoItem.id = increment;
    return toDoItem
  };

  storeItem(toDoItem){
    this.toDos.push(toDoItem);
    this.projects.Inbox.push(toDoItem);
    if (toDoItem.project != "Inbox") this.projects[toDoItem.project].push(toDoItem);
  };

  counter = (function(n) {
    return function() {
      n += 1;
      return n;
    };
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
    let item = e.target.parentElement.parentElement
    let id = item.id; 
    this.toDos = this.toDos.filter(todo => todo.id != id);
    // Or toBeDeleted = this.toDos.findIndex(todo => todo.id == id); // this.toDos.splice(toBeDeleted, 1);
    this.projects.Inbox = this.toDos.filter(todo => todo.id != id);
    this.projects[item.dataset.project] = this.projects[item.dataset.project].filter(todo => todo.id != id);
  };

  clearForm() {
    this.getFormElements().title.value = "";
    this.getFormElements().description.value = "";
    this.getFormElements().dueDate.value = "";
    this.getFormElements().project.value = "Inbox";
    this.getFormElements().priority.value = "Low";
    this.getFormElements().noteTitle.value = "";
    this.getFormElements().noteDescription.value = "";
    this.getFormElements().projectTitle.value = "";
    document.getElementById("myModal").style.display = "none";
  };

  generatesNote(increment) {
    let noteItem = new noteList(this.getFormElements().noteTitle.value, this.getFormElements().noteDescription.value);
    noteItem.id = increment;
    this.notes.push(noteItem);
    return noteItem
  };

  noteCounter = (function(n) {
    return function() {
      n += 1;
      return `note-${n}`;
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

  generatesProject() {
    let projectName = new projectList(this.getFormElements().projectTitle.value);
    this.projects[projectName.projectTitle] = [];
    return projectName.projectTitle
  };

  fillOptions(projectTitle, selectBox) {
    let newOption = new Option(projectTitle, projectTitle);
    selectBox.add(newOption,undefined);
  }

  removeOptions(selectBox, deletedProject) {
    const options = selectBox.getElementsByTagName('OPTION');
    for(let i = 0; i < options.length; i++) {
      if (options[i].innerText == deletedProject) selectBox.removeChild(options[i]);
      };
    };

  removeProjectItem(deletedProject) {
    delete this.projects[deletedProject];
  };
};

export {Model}