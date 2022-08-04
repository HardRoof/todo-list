class detailsView {
  constructor() {}

  static createElement() {
    const div = document.createElement('div');
    const p = document.createElement('p');
    return {div,p}
  }
  
  static createDetailsDiv(grandParent) {
    const detailsContainer = this.createElement().div
    detailsContainer.classList.add('detailsContent');
    grandParent.insertAdjacentElement("afterend", detailsContainer);

    return detailsContainer
  }

  static collapse(collapsedDiv) {
    collapsedDiv.style.maxHeight = collapsedDiv.scrollHeight + "rem";
  }

  static getInputs(grandParent, array) {
    let increment = grandParent.id
    console.log(array);

    return {increment}
  }

  static createContent(detailsContainer) {
    const detailsLeft = this.createElement().div
    detailsLeft.classList.add('detailsLeft');
    detailsContainer.append(detailsLeft);
    const title = this.createElement().p
    detailsLeft.append(title);
    title.textContent = `Title: `
    const dueDate = this.createElement().p
    detailsLeft.append(dueDate);
    dueDate.textContent = `Due date: `

    const detailsRight = this.createElement().div
    detailsRight.classList.add('detailsRight');
    detailsContainer.append(detailsRight);
    const description = this.createElement().p
    detailsRight.append(description);
    description.textContent = `Description: `
    const priority = this.createElement().p
    detailsRight.append(priority);
    priority.textContent = `Priority: `
  }
}

export default detailsView