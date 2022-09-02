class ToDoList {
  constructor(title, description, dueDate, project, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.completed = completed;
  }

  fillToDo() {
    const toDoTitle = document.getElementsByClassName("todo title");
    toDoTitle[toDoTitle.length - 1].textContent = this.title;
    document.getElementsByClassName("todo date")[toDoTitle.length - 1].textContent = this.dueDate;
    toDoTitle[toDoTitle.length - 1].parentElement.parentElement.setAttribute("data-project", this.project);
    toDoTitle[toDoTitle.length - 1].parentElement.parentElement.setAttribute("data-date", this.dueDate);
    if (this.completed == true) {
      const checkBox = document.getElementsByClassName("todo unchecked");
      checkBox[toDoTitle.length - 1].classList.add("checked");
      checkBox[toDoTitle.length - 1].nextElementSibling.classList.add("strikethrough");
      checkBox[toDoTitle.length - 1].parentElement.parentElement.classList.add("opaque");
    }
    switch (this.priority) {
      case "High":
        document.getElementsByClassName("flagColor")[toDoTitle.length - 1].classList.add("redFlag");
        break;
      case "Medium":
        document.getElementsByClassName("flagColor")[toDoTitle.length - 1].classList.add("yellowFlag");
        break;
    }
  }
}

export { ToDoList };
