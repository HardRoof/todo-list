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

  getTarget(e) {
    const grandParent = e.target.parentElement.parentElement;
    const collapsedDiv = e.target.parentElement.parentElement.nextSibling;
    const DetailBtn = e.target.parentElement.firstElementChild;
    return {grandParent, collapsedDiv, DetailBtn};
  };

  removeToDoDiv(e) {
    this.getTarget(e).grandParent.remove();
  };

  checkBox(e) {
    e.target.classList.toggle("checked");
  };

  clickDetails(e) {
    if (this.getTarget(e).DetailBtn.classList.contains('showingDetails')) this.getTarget(e).DetailBtn.click()
  };

  dynamicDetails(e, array) {
    e.target.classList.toggle("showingDetails");
    if (e.target.classList.contains('showingDetails')) {
      const detailsContainer = this.detailsView.createDetailsDiv(this.getTarget(e).grandParent);
      this.detailsView.collapse(this.getTarget(e).collapsedDiv);
      this.detailsView.createContent(detailsContainer);
      this.detailsView.getInputs(this.getTarget(e).grandParent, array);
    }
    else this.getTarget(e).collapsedDiv.remove();
  };
};

export {View}