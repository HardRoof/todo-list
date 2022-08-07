class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document.querySelector('#imageButton').addEventListener('click', this.openModalBox);
    document.getElementsByClassName("close")[0].addEventListener('click', this.closeModalBox);
    document.getElementsByTagName("li")[0].addEventListener("click", this.showLibContainer);
    document.getElementsByTagName("li")[3].addEventListener("click", this.showNoteContainer);
    document.getElementsByTagName("li")[4].addEventListener("click", () => this.showMainForm()); //this = Controller, inside showMainForm()
    document.getElementsByTagName("li")[5].addEventListener("click", () => this.showNoteForm());
    document.getElementById('mainForm').addEventListener("submit", (e) => this.formAction(e));
    document.getElementById('noteForm').addEventListener("submit", (e) => this.noteFormAction(e));
    document.getElementById('LibContainer').addEventListener("click", (e) => this.listActions(e));
    document.getElementById('NoteContainer').addEventListener('click', (e) => this.deleteNote(e));
    window.addEventListener("click", (e) => this.closeModalOutside(e));
    document.querySelectorAll(".menu").forEach((option) => {
      option.addEventListener('click', this.select);
    });
  };

  getForms() {
    const form = document.querySelector("#mainForm");
    const formNote = document.querySelector("#noteForm");
    return {form,formNote}
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

  showLibContainer(){
    document.getElementById("NoteContainer").style.display = "none";
    document.getElementById("LibContainer").style.display = "block";
    if (!this.classList.contains('selected')) this.classList.toggle("selected");
  };

  showMainForm() {
    this.getForms().form.style.display = "grid";
    this.getForms().formNote.style.display = "none";
  };
    
  showNoteForm() {
    this.getForms().form.style.display = "none";
    this.getForms().formNote.style.display = "flex";
  };

  formAction(e) {
    e.preventDefault();
    this.view.showContent();
    let increment = this.model.counter()
    let toDoItem = this.model.generatesToDoItem(increment);
    toDoItem.fillToDo();
    this.model.addDivID(increment);
    this.model.clearForm();
  };
  
  listActions(e) {
    console.log(this.model.toDos);
    console.log(document.getElementsByClassName("close"));
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

  showNoteContainer() {
    document.getElementById("NoteContainer").style.display = "grid";
    document.getElementById("LibContainer").style.display = "none";
    if (!this.classList.contains('selected')) this.classList.toggle("selected");
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

  deleteNote(e) {
    if (e.target.classList.contains('close')) {
      this.view.removeNoteDiv(e);
      this.model.removeNoteItem(e);
    }
  };

  select() {
    document.querySelectorAll(".menu").forEach(element => {
      element.classList.remove("selected");
    });
    this.classList.toggle("selected");
  };
};


export {Controller}