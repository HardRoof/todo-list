function createNotes() {
const form = document.querySelector("#submitForm")

document.getElementsByTagName("li")[1]
  .addEventListener("click", () => {
    form.style.display = "none"

    const noteForm = document.createElement('form');
    noteForm.id = "noteForm"
    document.getElementsByClassName("modal-content")[0].append(noteForm);

    const title = document.createElement('div');
    noteForm.append(title);

    const labelTitle = document.createElement('label');
    const inputTitle = document.createElement('input');

    title.append(labelTitle)
    labelTitle.setAttribute('for', "noteTitle");
    labelTitle.textContent = "Title";

    title.append(inputTitle)
    inputTitle.id = "noteTitle"
    inputTitle.required = true;
    inputTitle.setAttribute('type', "text");
    
    const description = document.createElement('div');
    noteForm.append(description);

    const labelDescription = document.createElement('label');
    const textAreaDescription = document.createElement('textarea');

    description.append(labelDescription)
    labelDescription.setAttribute('for', "noteDescription");
    labelDescription.textContent = "Description";

    description.append(textAreaDescription)
    textAreaDescription.id = "noteDescription"
    textAreaDescription.required = true;
    textAreaDescription.autocomplete = "off";
    textAreaDescription.spellcheck = true;

    const noteBtns = document.createElement('div');
    noteForm.append(noteBtns);
    noteBtns.classList.add('btns');

    const noteFormButton = document.createElement('button');
    noteBtns.append(noteFormButton);
    noteFormButton.classList.add('formButton');
    noteFormButton.type = "submit";
    noteFormButton.setAttribute('form', "noteForm");
    noteFormButton.innerText = "Add note";

    const resetButton = document.createElement('button');
    noteBtns.append(resetButton);
    resetButton.classList.add('resetButton');
    resetButton.type = "reset";
    resetButton.innerText = "Clear";
  })

document.getElementsByTagName("li")[0]
.addEventListener("click", () => {
  form.style.display = "grid"
  noteForm.remove()
})

};

export default createNotes;
