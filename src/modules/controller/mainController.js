class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document.querySelector('#imageButton').addEventListener('click', this.openModalBox);
    document.getElementsByClassName("close")[0].addEventListener('click', this.closeModalBox);
    window.addEventListener("click", (e) => this.closeModalOutside(e));
    document.getElementsByTagName("li")[0].addEventListener("click", (e) => this.showLibContainer(e));
    document.getElementsByTagName("li")[1].addEventListener("click", () => this.view.showToday());
    document.getElementsByTagName("li")[2].addEventListener("click", () => this.showProjects());
    document.getElementsByTagName("li")[3].addEventListener("click", this.showNoteContainer);
    document.getElementsByTagName("li")[4].addEventListener("click", () => this.showMainForm()); //inside showMainForm() this = Controller
    document.getElementsByTagName("li")[5].addEventListener("click", () => this.showProjectForm());
    document.getElementsByTagName("li")[6].addEventListener("click", () => this.showNoteForm());
    document.getElementById('projectBtn').addEventListener("click", () => this.projectBtn());
    document.getElementById('mainForm').addEventListener("submit", (e) => this.formAction(e));
    document.getElementById('noteForm').addEventListener("submit", (e) => this.noteFormAction(e));
    document.getElementById('projectForm').addEventListener("submit", (e) => this.projectFormAction(e));
    document.getElementById('LibContainer').addEventListener("click", (e) => this.listActions(e));
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
  };

  getElements() {
    const project = document.getElementsByTagName("li")[2];
    const projectDetails = document.getElementsByClassName("projectsDetails")[0];
    const selectBox = document.getElementById('project');
    const filter = document.getElementById('searchID');

    return {project, projectDetails, selectBox, filter}
  };

  getForms() {
    const form = document.querySelector("#mainForm");
    const formNote = document.querySelector("#noteForm");
    const formProject = document.querySelector("#projectForm");
    return {form,formNote, formProject}
  };

  openModalBox() {
    document.getElementById("myModal").style.display = "block";
  };

  closeModalBox() {
    document.getElementById("myModal").style.display = "none";
  };

  closeModalOutside(e) {
    if (e.target == document.getElementById("myModal")) this.closeModalBox();
  };

  showLibContainer(e) {
    this.switchContainers()
    if (!e.currentTarget.classList.contains('selected')) e.currentTarget.classList.toggle("selected");
    document.getElementsByTagName("li")[4].click();
    document.querySelectorAll(".todo.shell").forEach(item => {
      item.style.display = "flex";
    });
  };

  switchContainers() {
    document.getElementById("NoteContainer").style.display = "none";
    document.getElementById("LibContainer").style.display = "block";
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

  projectBtn() {
    this.openModalBox();
    document.getElementsByTagName("li")[5].click();
  };

  formAction(e) {
    e.preventDefault();
    this.view.showContent();
    let increment = this.model.counter();
    let toDoItem = this.model.generatesToDoItem(increment);
    this.model.storeItem(toDoItem);
    toDoItem.fillToDo();
    this.model.addDivID(increment);
    this.model.clearForm();
  };

  noteFormAction(e) {
    e.preventDefault();
    this.view.createNoteContent();
    let increment = this.model.noteCounter();
    let noteItem = this.model.generatesNote(increment);
    noteItem.fillNote();
    this.model.addDivNoteID(increment);
    this.model.clearForm();
  };

  projectFormAction(e) {
    e.preventDefault();
    let projectTitle = this.model.generatesProject();
    this.model.fillOptions(projectTitle, this.getElements().selectBox);
    this.view.displayProjects(projectTitle);
    this.model.clearForm();
  };

  listActions(e) {
    console.log(this.model);
    if (e.target.classList.contains('unchecked')) {
      this.view.checkBox(e);
      this.model.toDoStatus(this.view.getTarget(e).grandParent.id);
    };
    if (e.target.classList.contains('trashBinSvg')) {
      this.view.clickDetails(e);
      this.view.removeToDoDiv(e);
      this.model.removeToDoItem(e);
    };
    if (e.target.classList.contains('details')) this.view.dynamicDetails(e, this.model.toDos);
  };

  deleteNote(e) {
    if (e.target.classList.contains('close')) {
      this.view.removeNoteDiv(e);
      this.model.removeNoteItem(e);
    };
  };

  deleteProject(e) {
    if (e.target.classList.contains('close')) {
      const deletedProject = e.target.previousElementSibling.textContent;
      this.view.removeNoteDiv(e);
      this.model.removeOptions(this.getElements().selectBox, deletedProject);
      this.model.removeProjectItem(deletedProject);
    };
  };

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

  filterItems(e) {
    let text = e.target.value.toLowerCase();
    let items = document.querySelectorAll(".todo.shell");
    items.forEach(function(item) {
      let itemName = item.firstElementChild.lastElementChild.innerText;
      if(itemName.toLowerCase().indexOf(text) != -1) item.style.display = "flex";
      else item.style.display = "none";
    });
  };
};

export {Controller}