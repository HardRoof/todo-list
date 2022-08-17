class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document.querySelector('#imageButton').addEventListener('click', this.openModalBox);
    document.getElementsByClassName("close")[0].addEventListener('click', this.closeModalBox);
    window.addEventListener("click", (e) => this.closeModalOutside(e));
    document.getElementsByTagName("li")[0].addEventListener("click", (e) => this.showLibContainer(e));
    document.getElementsByTagName("li")[1].addEventListener("click", () => this.filterToday());
    document.getElementsByTagName("li")[2].addEventListener("click", () => this.showProjects());
    document.getElementsByTagName("li")[3].addEventListener("click", this.showNoteContainer);
    document.getElementsByTagName("li")[4].addEventListener("click", () => this.showMainForm());
    document.getElementsByTagName("li")[5].addEventListener("click", () => this.showProjectForm());
    document.getElementsByTagName("li")[6].addEventListener("click", () => this.showNoteForm());
    document.getElementById('projectBtn').addEventListener("click", () => this.projectBtn());
    document.getElementById('mainForm').addEventListener("submit", (e) => this.toDoFormAction(e));
    document.getElementById('noteForm').addEventListener("submit", (e) => this.noteFormAction(e));
    document.getElementById('projectForm').addEventListener("submit", (e) => this.projectFormAction(e));
    document.getElementById('LibContainer').addEventListener("click", (e) => this.toDoActions(e));
    document.getElementById('NoteContainer').addEventListener('click', (e) => this.deleteNote(e));
    document.getElementsByClassName("projectList")[0].addEventListener('click', (e) => this.deleteProject(e));
    document.querySelectorAll(".menu").forEach((option) => {
      option.addEventListener('click', (e) => this.selectMenu(e));
    });
    document.querySelectorAll(".formsOptions").forEach((option) => {
      option.addEventListener('click', (e) => this.selectForm(document.querySelectorAll(".formsOptions"),e));
    });
    document.querySelector(".projectList").addEventListener('click', (e) => this.selectProject(e));
    document.getElementById('searchID').addEventListener('keyup', (e) => this.filterItems(e));
    document.getElementsByClassName("logo")[0].addEventListener('click', this.reloadPage);
    document.querySelector('#userPic').addEventListener('click', this.reloadPage);
    window.addEventListener("load", () => this.loadStorage());
  };

  // ************************************************** //
  getElements() {
    const project = document.getElementsByTagName("li")[2];
    const projectDetails = document.getElementsByClassName("projectsDetails")[0];
    const selectBox = document.getElementById('project');
    const filter = document.getElementById('searchID');
    const clickedDetails = document.querySelectorAll(".showingDetails")

    return {project, projectDetails, selectBox, filter, clickedDetails}
  };

  getForms() {
    const form = document.querySelector("#mainForm");
    const formNote = document.querySelector("#noteForm");
    const formProject = document.querySelector("#projectForm");
    return {form,formNote, formProject}
  };

  // ************************************************** //
  openModalBox() {
    document.getElementById("myModal").style.display = "block";
  };

  closeModalBox() {
    document.getElementById("myModal").style.display = "none";
  };

  closeModalOutside(e) {
    if (e.target == document.getElementById("myModal")) this.closeModalBox();
  };

  // ************************************************** //
  showLibContainer(e) {
    this.switchContainers()
    if (!e.currentTarget.classList.contains('selected')) e.currentTarget.classList.toggle("selected");
    document.getElementsByTagName("li")[4].click();
    document.querySelectorAll(".todo.shell").forEach(item => {
      item.style.display = "flex";
    });
  };

  showProjects() {
    this.getElements().project.classList.toggle("rotated");
    this.getElements().projectDetails.classList.toggle("projectsOn");
    this.view.sidebarProject(this.getElements().projectDetails);
  };

  showNoteContainer() {
    document.getElementById("NoteContainer").style.display = "grid";
    document.getElementById("LibContainer").style.display = "none";
    if (!this.classList.contains('selected')) this.classList.toggle("selected");
    document.getElementsByTagName("li")[6].click();
  };

// ************************************************** //
  showMainForm() {
    this.getForms().form.style.display = "grid";
    this.getForms().formNote.style.display = "none";
    this.getForms().formProject.style.display = "none";
  };
    
  showNoteForm() {
    this.getForms().form.style.display = "none";
    this.getForms().formNote.style.display = "flex";
    this.getForms().formProject.style.display = "none";
  };

  showProjectForm() {
    this.getForms().form.style.display = "none";
    this.getForms().formNote.style.display = "none";
    this.getForms().formProject.style.display = "flex";
  };

  // ************************************************** //
  switchContainers() {
    document.getElementById("NoteContainer").style.display = "none";
    document.getElementById("LibContainer").style.display = "block";
  };
  
  projectBtn() {
    this.openModalBox();
    document.getElementsByTagName("li")[5].click();
  };

  filterToday() {
    this.switchContainers();
    this.closeDetails();
    this.view.showToday();
  };

  // ************************************************** //
  toDoFormAction(e) {
    e.preventDefault();
    this.createDisplayTodoItem(this.model.getFormElements().title.value, this.model.getFormElements().description.value, this.model.getFormElements().dueDate.value, this.model.getFormElements().project.value, this.model.getFormElements().priority.value, this.model.getFormElements().completed);
    this.model.clearForm();
  };

  createDisplayTodoItem(title, description, project, priority, completed) {
    this.view.showContent();
    let increment = this.model.counter();
    let toDoItem = this.model.generatesToDoItem(increment, title, description, project, priority, completed);
    this.model.storeItem(toDoItem);
    toDoItem.fillToDo();
    this.model.addDivID(increment);
    this.model.toDosUpdateLocalStorage();
    this.model.projectsUpdateLocalStorage();
  };

  noteFormAction(e) {
    e.preventDefault();
    this.createDisplayNote(this.model.getFormElements().noteTitle.value, this.model.getFormElements().noteDescription.value);
    this.model.notesUpdateLocalStorage();
    this.model.clearForm();
  };

  createDisplayNote(noteTitle, noteDescription) {
    this.view.createNoteContent();
    let increment = this.model.noteCounter();
    let noteItem = this.model.generatesNote(increment, noteTitle, noteDescription);
    noteItem.fillNote();
    this.model.addDivNoteID(increment);
  }

  projectFormAction(e) {
    e.preventDefault();
    document.getElementsByTagName("li")[4].click();
    const projectTitle = this.model.generatesProject().projectTitle
    this.createDisplayProject(projectTitle);
    this.model.clearForm();
  };

  createDisplayProject(projectTitle) {
    this.model.fillOptions(projectTitle, this.getElements().selectBox);
    this.view.displayProjects(projectTitle);
    this.model.storeProject(projectTitle);
    this.model.projectsUpdateLocalStorage();
  };

  // ************************************************** //
  toDoActions(e) {
    if (e.target.classList.contains('unchecked')) {
      this.view.checkBox(e);
      this.model.toDoStatus(this.view.getTarget(e).grandParent.id);
    };
    if (e.target.classList.contains('trashBinSvg')) {
      this.view.clickDetails(e);
      this.view.removeToDoDiv(e);
      this.model.removeToDoItem(e);
      this.model.toDosUpdateLocalStorage();
      this.model.projectsUpdateLocalStorage();
    };
    if (e.target.classList.contains('details')) this.view.dynamicDetails(e, this.model.toDos);
  };

  deleteNote(e) {
    if (e.target.classList.contains('close')) {
      this.view.removeNoteDiv(e);
      this.model.removeNoteItem(e);
      this.model.notesUpdateLocalStorage();
    };
  };

  deleteProject(e) {
    if (e.target.classList.contains('close')) {
      const deletedProject = e.target.previousElementSibling.textContent;
      this.view.removeNoteDiv(e);
      this.model.removeOptions(this.getElements().selectBox, deletedProject);
      this.model.removeProjectItem(deletedProject);
      this.model.projectsUpdateLocalStorage();
      this.model.toDosUpdateLocalStorage();
    };
  };

  // ************************************************** //
  selectMenu(e) {
    this.deselect(document.querySelectorAll(".menu"), "selected");
    this.deselect(document.querySelectorAll(".projectItem"), "selectedForm");
    e.currentTarget.classList.toggle("selected");
  };

  selectForm(nodeList,e) {
    this.deselect(nodeList, "selectedForm");
    e.target.classList.toggle("selectedForm");
  };

  selectProject(e) {
    if (e.target.classList.contains('projectItem')) {
      this.switchContainers();
      this.deselect(document.querySelectorAll(".menu"), "selected");
      document.getElementsByTagName("li")[2].classList.add("selected");
      this.selectForm(document.querySelectorAll(".projectItem"), e);
      this.closeDetails();
      document.querySelectorAll(".todo.shell").forEach(item => {
        item.style.display = "flex";
        if (e.target.textContent == item.dataset.project) item.style.display = "flex";
        else item.style.display = "none";
      });
    };
  };

  deselect(array, class_) {
    array.forEach(element => {
      element.classList.remove(class_);
    });
  };

  // ************************************************** //
  filterItems(e) {
    let text = e.target.value.toLowerCase();
    let items = document.querySelectorAll(".todo.shell");
    items.forEach(function(item) {
      let itemName = item.firstElementChild.lastElementChild.innerText;
      if(itemName.toLowerCase().indexOf(text) != -1) item.style.display = "flex";
      else item.style.display = "none";
    });
  };

  closeDetails() {
    this.getElements().clickedDetails.forEach(element => {
      element.click();
    });
  };

  reloadPage() {
    window.location.reload();
    window.scrollTo(0, 0);  //To refresh at top of Page
  };

  // ************************************************** //
  loadStorage() {
    this.loadProjects();
    this.loadToDos();
    this.loadNotes();
  };

  loadProjects() {
    if (localStorage.getItem('projects')) {
      const localStorageProjects = JSON.parse(localStorage.getItem('projects'));
      Object.keys(localStorageProjects).forEach((project) => {
        if(project != "Inbox") this.createDisplayProject(project);
      });
    };
  };

  loadToDos() {
    if (localStorage.getItem('toDos')) {
      const localStorageToDos = JSON.parse(localStorage.getItem('toDos'));
      localStorageToDos.forEach((toDo) => {
        this.createDisplayTodoItem(toDo.title, toDo.description, toDo.dueDate, toDo.project, toDo.priority, toDo.completed);
      });
    };
  };

  loadNotes() {
    if (localStorage.getItem('notes')) {
      const localStorageNotes = JSON.parse(localStorage.getItem('notes'));
      localStorageNotes.forEach((note) => {
        this.createDisplayNote(note.noteTitle, note.noteDescription);
      });
    };
  };

};

export {Controller}