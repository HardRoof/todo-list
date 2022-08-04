class View {
  constructor() {}

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

  dynamicDetails(e) {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('detailsContent');
    e.target.classList.toggle("showingDetails"); //To add CSS style when btn is pressed

    if (e.target.classList.contains('showingDetails')) {
      this.getTarget(e).grandParent.insertAdjacentElement("afterend", detailsContainer);
      this.getTarget(e).collapsedDiv.style.maxHeight = this.getTarget(e).collapsedDiv.scrollHeight + "rem";
      detailsContainer.textContent = "Lorem";
    }
    else this.getTarget(e).collapsedDiv.remove();
  };
};

export {View}