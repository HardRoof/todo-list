export function modalBox() {
  var modal = document.getElementById("myModal");
  document.querySelector('#imageButton')
    .addEventListener('click', () => {
      modal.style.display = "block";
    });
  document.getElementsByClassName("close")[0]
    .addEventListener('click', () => {
      modal.style.display = "none";
    })
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}