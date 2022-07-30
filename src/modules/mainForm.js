const title = document.querySelector("#title")
const description = document.querySelector("#description")
const dueDate = document.querySelector("#dueDate")
const project = document.querySelector("#project")
const priority = document.querySelector("#priority")
const toDoTitle = document.getElementsByClassName("todo title")

function generatesToDoItem() {
  let toDoItem = new ToDoList(title.value, description.value, dueDate.value, project.value, priority.value);

  return toDoItem
}

class ToDoList {
  constructor(title, description, dueDate, project, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
  }
  assignFlag () {
    toDoTitle[toDoTitle.length-1].textContent = this.title;
    document.getElementsByClassName("todo date")[toDoTitle.length-1].textContent = this.dueDate; 
    
    switch (this.priority) {
      case "High":
        document.getElementsByClassName("flagColor")[toDoTitle.length-1].classList.add('redFlag');
        break;
      case "Medium":
        document.getElementsByClassName("flagColor")[toDoTitle.length-1].classList.add('yellowFlag');
        break;
    }
  }
};

function clearForm() {
  title.value = ""
  description.value = ""
  dueDate.value = ""
  project.value = "Input"
  priority.value = "Low"
  document.getElementById("myModal").style.display = "none";
}

export {generatesToDoItem, clearForm};