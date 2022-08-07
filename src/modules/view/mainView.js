import detailsView from './detailsView'

class View {
  constructor() {
    this.detailsView = detailsView;
  };

  showContent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    document.getElementById("LibContainer").append(clon);
  };

  createNoteContent() {
    let temp = document.getElementsByTagName("template")[2];
    let clon = temp.content.cloneNode(true);
    document.getElementById("NoteContainer").append(clon);
  }

  getTarget(e) {
    const parent = e.target.parentElement
    const grandParent = e.target.parentElement.parentElement;
    const collapsedDiv = e.target.parentElement.parentElement.nextSibling;
    const DetailBtn = e.target.parentElement.firstElementChild;
    return {parent, grandParent, collapsedDiv, DetailBtn};
  };

  removeToDoDiv(e) {
    this.getTarget(e).grandParent.remove();
  };

  removeNoteDiv(e) {
    this.getTarget(e).parent.remove();
  }

  checkBox(e) {
    e.target.classList.toggle("checked");
    e.target.nextElementSibling.classList.toggle("strikethrough");
  };

  clickDetails(e) {
    if (this.getTarget(e).DetailBtn.classList.contains('showingDetails')) this.getTarget(e).DetailBtn.click()
  };

  dynamicDetails(e, array) {
    e.target.classList.toggle("showingDetails"); //test
    if (e.target.classList.contains('showingDetails')) {
      const detailsContainer = this.detailsView.createDetailsDiv(this.getTarget(e).grandParent);
      this.detailsView.collapse(this.getTarget(e).collapsedDiv);
      let content = this.detailsView.createContent(detailsContainer);
      let inputs = this.detailsView.getInputs(this.getTarget(e).grandParent, array);
      this.detailsView.setInputs(content,inputs)

    }
    else this.getTarget(e).collapsedDiv.remove();
  };
};

export {View}