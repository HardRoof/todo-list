class Model {
  constructor() {}

  getFormElements() {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const project = document.querySelector("#project");
    const priority = document.querySelector("#priority");
    return {title,description, dueDate, project, priority}
  }

  generatesToDoItem() {
    let toDoItem = new ToDoList(this.getFormElements().title.value, this.getFormElements().description.value, this.getFormElements().dueDate.value, this.getFormElements().project.value, this.getFormElements().priority.value);
    return toDoItem
  }

  clearForm() {
    this.getFormElements().title.value = "";
    this.getFormElements().description.value = "";
    this.getFormElements().dueDate.value = "";
    this.getFormElements().project.value = "Input";
    this.getFormElements().priority.value = "Low";
    document.getElementById("myModal").style.display = "none";
  }
}

class ToDoList {
  constructor(title, description, dueDate, project, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
  }

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
    }
  }
};


export {Model}