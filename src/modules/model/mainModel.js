class Model {
  constructor() {
    this.toDos = [
    // {id: 0, title: "Marathon", description: 'Run', dueDate: "2022-08-04", project: "Input", priority: "Low", completed: false},
    ]
  };

  getFormElements() {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const project = document.querySelector("#project");
    const priority = document.querySelector("#priority");
    let completed = false;
    return {title,description, dueDate, project, priority, completed}
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

  clearForm() {
    this.getFormElements().title.value = "";
    this.getFormElements().description.value = "";
    this.getFormElements().dueDate.value = "";
    this.getFormElements().project.value = "Input";
    this.getFormElements().priority.value = "Low";
    document.getElementById("myModal").style.display = "none";
  };

  removeToDoItem(e) {
    let id = e.target.parentElement.parentElement.id;
    // this.toDos = this.toDos.filter(todo => todo.id !== id)
    let toBeDeleted = this.toDos.findIndex(todo => todo.id == id);
    this.toDos.splice(toBeDeleted, 1);
    };
};

class ToDoList {
  constructor(title, description, dueDate, project, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.completed = completed;
  };

  assignFlag() {
    const toDoTitle = document.getElementsByClassName("todo title");
    toDoTitle[toDoTitle.length-1].textContent = this.title;
    document.getElementsByClassName("todo date")[toDoTitle.length-1].textContent = this.dueDate; 
    
    switch(this.priority) {
      case "High":
        document.getElementsByClassName("flagColor")[toDoTitle.length-1].classList.add('redFlag');
        break;
      case "Medium":
        document.getElementsByClassName("flagColor")[toDoTitle.length-1].classList.add('yellowFlag');
        break;
    };
  };
};

//    toDoItem.id = this.toDos.length > 0 ? this.toDos[this.toDos.length - 1].id + 1 : 0

export {Model}