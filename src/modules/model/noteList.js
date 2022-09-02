class noteList {
  constructor(noteTitle, noteDescription) {
    this.noteTitle = noteTitle;
    this.noteDescription = noteDescription;
  }
  fillNote() {
    const noteTitle = document.getElementsByClassName("noteClass");
    noteTitle[noteTitle.length - 1].firstElementChild.textContent = this.noteTitle;
    noteTitle[noteTitle.length - 1].lastElementChild.textContent = this.noteDescription;
  }
}

export { noteList };
