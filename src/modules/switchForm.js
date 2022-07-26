function createNotes() {
  const form = document.querySelector("#submitForm");
  const formNote = document.querySelector("#noteForm");
  
  document.getElementsByTagName("li")[4]
    .addEventListener("click", () => {
      form.style.display = "grid"
      formNote.style.display = "none"
      console.log( document.getElementsByTagName("li"));
  })
  
  document.getElementsByTagName("li")[5]
    .addEventListener("click", () => {
      form.style.display = "none"
      formNote.style.display = "flex"
    })
  };
  
  export default createNotes;
