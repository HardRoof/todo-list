class detailsView {
  constructor() {}

  static createElement() {
    const div = document.createElement("div");
    const p = document.createElement("p");
    return { div, p };
  }

  static createDetailsDiv(grandParent) {
    const detailsContainer = this.createElement().div;
    detailsContainer.classList.add("detailsContent");
    grandParent.insertAdjacentElement("afterend", detailsContainer);

    return detailsContainer;
  }

  static collapse(collapsedDiv) {
    if (collapsedDiv.style.maxHeight) collapsedDiv.style.maxHeight = null;
    else collapsedDiv.style.maxHeight = collapsedDiv.scrollHeight + "rem";
  }

  static createContent(detailsContainer) {
    let temp = document.getElementsByTagName("template")[1];
    let clon = temp.content.cloneNode(true);
    let pNodeList = clon.querySelectorAll("p");
    detailsContainer.append(clon);
    let title = pNodeList[0];
    let dueDate = pNodeList[1];
    let description = pNodeList[2];
    let priority = pNodeList[3];

    return { title, dueDate, description, priority };
  }

  static getInputs(grandParent, array) {
    let increment = grandParent.id;
    return { increment, array };
  }

  static setInputs(content, inputs) {
    let position = inputs.array.findIndex((todo) => todo.id == inputs.increment);
    content.title.append(`${inputs.array[position].title}`);
    content.dueDate.append(`${inputs.array[position].dueDate}`);
    content.description.append(`${inputs.array[position].description}`);
    content.priority.append(`${inputs.array[position].priority}`);
  }
}

export default detailsView;
