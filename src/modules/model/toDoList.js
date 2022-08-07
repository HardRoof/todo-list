class ToDoList {
  constructor(title, description, dueDate, project, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
    this.priority = priority;
    this.completed = completed;
  };

  fillToDo() {
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

export {ToDoList}