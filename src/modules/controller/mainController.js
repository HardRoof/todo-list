class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    document.getElementById('submitForm').addEventListener("submit", (e) => this.formAction(e));
    document.getElementsByTagName("li")[4].addEventListener("click", () => this.showMainForm());
    document.getElementsByTagName("li")[5].addEventListener("click", () => this.showNoteForm());
    document.getElementById('LibContainer').addEventListener("click", (e) => this.listActions(e));
    document.querySelector('#imageButton').addEventListener('click', () => this.openModalBox());
    document.getElementsByClassName("close")[0].addEventListener('click', () => this.closeModalBox());
    window.addEventListener("click", (e) => this.closeModalOutside(e))  
  }

  getForms() {
    const form = document.querySelector("#submitForm");
    const formNote = document.querySelector("#noteForm");
    return {form,formNote}
  }

  formAction(e) {
    e.preventDefault();
    this.model.generatesToDoItem();
    this.view.showContent();
    this.model.generatesToDoItem().assignFlag();
    this.model.clearForm();
  }

  showMainForm() {
    this.getForms().form.style.display = "grid";
    this.getForms().formNote.style.display = "none";
  }
    
  showNoteForm() {
    this.getForms().form.style.display = "none";
    this.getForms().formNote.style.display = "flex";
  }
  
  listActions(e) {
    if (e.target.classList.contains('unchecked')) e.target.classList.toggle("checked");
    if (e.target.classList.contains('trashBinSvg')) {
      let grandParent = e.target.parentElement.parentElement;
      grandParent.remove();
    }
    if (e.target.classList.contains('details')) this.view.dynamicDescription(e);
  }

  closeModalOutside(e) {
    if (e.target == document.getElementById("myModal")) {
      this.closeModalBox()
    }
  }

  openModalBox() {
    document.getElementById("myModal").style.display = "block";
  }

  closeModalBox() {
    document.getElementById("myModal").style.display = "none";
  }
}


export {Controller}