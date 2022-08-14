import detailsView from './detailsView';
import {format, parseISO} from "date-fns";

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
    this.getTarget(e).grandParent.classList.toggle("opaque");
  };

  clickDetails(e) {
    if (this.getTarget(e).DetailBtn.classList.contains('showingDetails')) this.getTarget(e).DetailBtn.click();
  };

  dynamicDetails(e, array) {
    e.target.classList.toggle("showingDetails");
    if (e.target.classList.contains('showingDetails')) {
      const detailsContainer = this.detailsView.createDetailsDiv(this.getTarget(e).grandParent);
      this.detailsView.collapse(this.getTarget(e).collapsedDiv);
      let content = this.detailsView.createContent(detailsContainer);
      let inputs = this.detailsView.getInputs(this.getTarget(e).grandParent, array);
      this.detailsView.setInputs(content,inputs);
    }
    else this.getTarget(e).collapsedDiv.remove();
  };

  sidebarProject(collapsed) {
    this.detailsView.collapse(collapsed);
  };

  displayProjects(projectTitle) {
    let div = document.createElement('div');
    document.getElementsByTagName("section")[0].append(div);
    let p = document.createElement('p');
    p.classList.add('projectItem');
    p.textContent = projectTitle;
    div.append(p);
    
    let span = document.createElement('span');
    span.classList.add('close');
    div.append(span);
  };

  showToday() {
    const today = format(parseISO(new Date().toISOString()), 'MMM do'); 
    document.querySelectorAll(".todo.shell").forEach(item => {
      item.style.display = "flex";
      if (today == item.dataset.date) item.style.display = "flex";
      else item.style.display = "none";
    });
  };
};

export {View}