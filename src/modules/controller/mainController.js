class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document.querySelector('#imageButton').addEventListener('click', () => this.openModalBox());
    document.getElementsByClassName("close")[0].addEventListener('click', () => this.closeModalBox());
    document.getElementsByTagName("li")[4].addEventListener("click", () => this.showMainForm());
    document.getElementsByTagName("li")[5].addEventListener("click", () => this.showNoteForm());
    document.getElementById('submitForm').addEventListener("submit", (e) => this.formAction(e));
    document.getElementById('LibContainer').addEventListener("click", (e) => this.listActions(e));
    window.addEventListener("click", (e) => this.closeModalOutside(e));
  };

  getForms() {
    const form = document.querySelector("#submitForm");
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
    toDoItem.assignFlag();
    this.model.addDivID(increment);
    this.model.clearForm();
  };
  
  listActions(e) {
    console.log(this.model.toDos);
    if (e.target.classList.contains('unchecked')) {
      this.view.checkBox(e);
      this.model.toDoStatus(this.view.getTarget(e).grandParent.id);
    }
    if (e.target.classList.contains('trashBinSvg')) {
      this.view.clickDetails(e);
      this.view.removeToDoDiv(e);
      this.model.removeToDoItem(e);
    };
    if (e.target.classList.contains('details')) this.view.dynamicDetails(e, this.model.toDos);
  };
};


export {Controller}